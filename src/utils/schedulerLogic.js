export const calculateFCFS = (processes) => {
  if (!processes || processes.length === 0) return { metrics: [], gantt: [] };

  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
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
  if (!processes || processes.length === 0) return { metrics: [], gantt: [] };

  const remaining = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }));
  const gantt = [];
  const metrics = [];
  let currentTime = 0;
  let completedCount = 0;
  const n = processes.length;

  while (completedCount < n) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);
    
    if (available.length === 0) {
      const nextArrival = Math.min(...remaining.filter(p => p.remainingTime > 0).map(p => p.arrivalTime));
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
      ...processes.find(orig => orig.id === p.id),
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
  if (!processes || processes.length === 0) return { metrics: [], gantt: [] };
  // Ensure quantum is a valid number, default to 1 if invalid to prevent infinite loops
  const q = (typeof quantum === 'number' && quantum > 0) ? quantum : 1;

  const procs = [...processes].map(p => ({ ...p, remainingTime: p.burstTime })).sort((a, b) => a.arrivalTime - b.arrivalTime);
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

  while (completedCount < n) {
    if (readyQueue.length === 0) {
      const nextProc = procs.find(p => !inQueueOrCompleted.has(p.id));
      if (nextProc) {
        gantt.push({ processId: "IDLE", startTime: currentTime, endTime: nextProc.arrivalTime });
        currentTime = nextProc.arrivalTime;
        addNewArrivals(currentTime);
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

    // CRITICAL RR RULE: Push newly arrived processes to queue BEFORE pushing current process back
    addNewArrivals(currentTime);

    if (currentProcess.remainingTime > 0) {
      readyQueue.push(currentProcess);
    } else {
      completedCount++;
      metrics.push({
        ...processes.find(orig => orig.id === currentProcess.id),
        completionTime: currentTime,
        turnaroundTime: currentTime - currentProcess.arrivalTime,
        waitingTime: (currentTime - currentProcess.arrivalTime) - currentProcess.burstTime,
      });
    }
  }

  return { metrics, gantt };
};
