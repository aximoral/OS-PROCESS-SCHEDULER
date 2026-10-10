import { useState, useMemo } from 'react';
import { Plus, Cpu } from 'lucide-react';
import { AmbientBackground } from './components/ui/AmbientBackground';
import { GlassCard } from './components/ui/GlassCard';
import { GlowButton } from './components/ui/GlowButton';
import { ProcessInputRow } from './components/ProcessInputRow';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { MetricsTable } from './components/MetricsTable';
import { GanttChartVisualizer } from './components/GanttChartVisualizer';
import { calculateFCFS, calculateSJF, calculateRR } from './utils/schedulerLogic';

function App() {
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5 },
    { id: 'P2', arrivalTime: 1, burstTime: 3 },
    { id: 'P3', arrivalTime: 2, burstTime: 8 },
  ]);
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);

  const handleAddProcess = () => {
    const nextId = processes.length > 0 
      ? `P${Math.max(...processes.map(p => parseInt(p.id.substring(1)))) + 1}`
      : 'P1';
    setProcesses([...processes, { id: nextId, arrivalTime: 0, burstTime: 1 }]);
  };

  const handleRemoveProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const handleProcessChange = (id, field, value) => {
    setProcesses(processes.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const { metrics, gantt } = useMemo(() => {
    const procs = processes.map(p => ({
      ...p,
      arrivalTime: p.arrivalTime === '' || isNaN(p.arrivalTime) ? 0 : p.arrivalTime,
      burstTime: p.burstTime === '' || isNaN(p.burstTime) ? 0 : p.burstTime
    }));
    
    switch (algorithm) {
      case 'FCFS': return calculateFCFS(procs);
      case 'SJF': return calculateSJF(procs);
      case 'RR': return calculateRR(procs, quantum === '' || isNaN(quantum) ? 1 : quantum);
      default: return { metrics: [], gantt: [] };
    }
  }, [processes, algorithm, quantum]);

  return (
    <>
      <AmbientBackground />
      <div className="min-h-screen max-w-5xl mx-auto py-16 px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amberAccent/10 flex items-center justify-center border border-amberAccent/20">
            <Cpu className="text-amberAccent" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-100 tracking-tight">OS Scheduler</h1>
            <p className="text-slate-400 text-sm mt-1">High-performance process simulation</p>
          </div>
        </header>

        {/* Controls & Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-slate-200">Processes</h2>
                <GlowButton variant="ghost" onClick={handleAddProcess}>
                  <Plus size={18} strokeWidth={2} />
                  <span>Add Process</span>
                </GlowButton>
              </div>
              
              <div className="space-y-4">
                {processes.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-medium">
                    No processes. Add one to begin.
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 px-1 pb-2 border-b border-white/5 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      <div className="w-16 text-center">ID</div>
                      <div className="flex-1 pl-1">Arrival Time</div>
                      <div className="flex-1 pl-1">Burst Time</div>
                      <div className="w-11"></div>
                    </div>
                    {processes.map(p => (
                      <ProcessInputRow 
                        key={p.id} 
                        process={p} 
                        onChange={handleProcessChange}
                        onRemove={handleRemoveProcess}
                      />
                    ))}
                  </>
                )}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <GlassCard>
              <h2 className="text-xl font-display font-semibold text-slate-200 mb-6">Configuration</h2>
              <AlgorithmSelector 
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                quantum={quantum}
                setQuantum={setQuantum}
              />
            </GlassCard>
          </div>
          
        </div>

        {/* Visualizations */}
        {processes.length > 0 && gantt && gantt.length > 0 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <GanttChartVisualizer gantt={gantt} />
            <MetricsTable metrics={metrics} />
          </div>
        )}
        
      </div>
    </>
  );
}

export default App;
