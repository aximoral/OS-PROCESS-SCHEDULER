import { GhostInput } from './ui/GhostInput';

export const AlgorithmSelector = ({ algorithm, setAlgorithm, quantum, setQuantum }) => {
  const algos = ['FCFS', 'SJF', 'RR'];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-slateBase/50 p-1 rounded-lg border border-white/5 w-fit">
        {algos.map(a => (
          <button
            key={a}
            onClick={() => setAlgorithm(a)}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              algorithm === a 
                ? 'bg-amberAccent text-slateBase shadow-amber-glow' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {a}
          </button>
        ))}
      </div>
      {algorithm === 'RR' && (
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 bg-slateBase/30 p-4 rounded-lg border border-white/5">
          <span className="text-slate-300 font-medium">Time Quantum:</span>
          <GhostInput 
            type="number" 
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
            className="w-24 text-center text-lg"
          />
        </div>
      )}
    </div>
  );
};
