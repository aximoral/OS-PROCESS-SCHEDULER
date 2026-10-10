export const calculateFCFS = (processes) => {
  const validProcs = processes?.filter(p => p.burstTime > 0) || [];
  if (validProcs.length === 0) return { metrics: [], gantt: [] };

  const sorted = [...validProcs].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const gantt = [];
  const metrics = [];
  let currentTime = 0;

  for (const p of sorted) {
    if (currentTime < p.arrivalTime) {
      gantt.push({ processId: "IDLE", startTime: currentTime, endTime: p.arrivalTime });
      currentTime = p.arrivalTime;
    }
    
    const startTime = currentTime;
    const endTime = currentTime + p.burstTime;
    gantt.push({ processId: p.id, startTime, endTime });
    
    metrics.push({
      ...p,
      completionTime: endTime,
      turnaroundTime: endTime - p.arrivalTime,
      waitingTime: (endTime - p.arrivalTime) - p.burstTime,
    });
    
    currentTime = endTime;
  }

  return { metrics, gantt };
};

export const calculateSJF = (processes) => {
  const validProcs = processes?.filter(p => p.burstTime > 0) || [];
  if (validProcs.length === 0) return { metrics: [], gantt: [] };

  const remaining = [...validProcs].map(p => ({ ...p, remainingTime: p.burstTime }));
  const gantt = [];
  const metrics = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = validProcs.length;

  while (completedCount < n) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);
    
    if (available.length === 0) {
      const nextArrival = Math.min(...remaining.filter(p => p.remainingTime > 0).map(p => p.arrivalTime));
      if (!isFinite(nextArrival)) break; // Failsafe
      gantt.push({ processId: "IDLE", startTime: currentTime, endTime: nextArrival });
      currentTime = nextArrival;
      continue;
    }

    // Tie-breaker: arrival time if burst times are equal
    available.sort((a, b) => {
      if (a.burstTime === b.burstTime) {
         return a.arrivalTime - b.arrivalTime; 
      }
      return a.burstTime - b.burstTime;
    });

    const p = available[0];
    const startTime = currentTime;
    const endTime = currentTime + p.burstTime;
    
    gantt.push({ processId: p.id, startTime, endTime });
    p.remainingTime = 0;
    
    metrics.push({
      ...validProcs.find(orig => orig.id === p.id),
      completionTime: endTime,
      turnaroundTime: endTime - p.arrivalTime,
      waitingTime: (endTime - p.arrivalTime) - p.burstTime,
    });

    currentTime = endTime;
    completedCount++;
  }

  return { metrics, gantt };
};

export const calculateRR = (processes, quantum) => {
  const validProcs = processes?.filter(p => p.burstTime > 0) || [];
  if (validProcs.length === 0) return { metrics: [], gantt: [] };

  const q = (typeof quantum === 'number' && quantum > 0) ? quantum : 1;

  const procs = [...validProcs].map(p => ({ ...p, remainingTime: p.burstTime })).sort((a, b) => a.arrivalTime - b.arrivalTime);
  const gantt = [];
  const metrics = [];
  
  let currentTime = 0;
  const readyQueue = [];
  let completedCount = 0;
  const n = procs.length;
  
  const inQueueOrCompleted = new Set();
  
  const addNewArrivals = (time) => {
    for (const p of procs) {
      if (p.arrivalTime <= time && !inQueueOrCompleted.has(p.id) && p.remainingTime > 0) {
        readyQueue.push(p);
        inQueueOrCompleted.add(p.id);
      }
    }
  };

  addNewArrivals(currentTime);

  // Failsafe iteration limit to strictly prevent infinite loops on the client
  let maxIterations = 10000;

  while (completedCount < n && maxIterations-- > 0) {
    if (readyQueue.length === 0) {
      const nextProc = procs.find(p => !inQueueOrCompleted.has(p.id));
      if (nextProc) {
        gantt.push({ processId: "IDLE", startTime: currentTime, endTime: nextProc.arrivalTime });
        currentTime = nextProc.arrivalTime;
        addNewArrivals(currentTime);
      } else {
        // Failsafe: if queue is empty and no new processes, just exit
        break; 
      }
      continue;
    }

    const currentProcess = readyQueue.shift();
    const startTime = currentTime;
    const timeExecuted = Math.min(currentProcess.remainingTime, q);
    const endTime = currentTime + timeExecuted;
    
    gantt.push({ processId: currentProcess.id, startTime, endTime });
    currentTime = endTime;
    currentProcess.remainingTime -= timeExecuted;

    addNewArrivals(currentTime);

    if (currentProcess.remainingTime > 0) {
      readyQueue.push(currentProcess);
    } else {
      completedCount++;
      metrics.push({
        ...validProcs.find(orig => orig.id === currentProcess.id),
        completionTime: currentTime,
        turnaroundTime: currentTime - currentProcess.arrivalTime,
        waitingTime: (currentTime - currentProcess.arrivalTime) - currentProcess.burstTime,
      });
    }
  }

  return { metrics, gantt };
};
