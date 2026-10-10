import { X } from 'lucide-react';
import { GhostInput } from './ui/GhostInput';
import { GlowButton } from './ui/GlowButton';

export const ProcessInputRow = ({ process, onChange, onRemove }) => {
  return (
    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="w-16 font-mono text-amberAccent font-bold text-lg text-center bg-slateBase/50 py-2 rounded-lg border border-white/5">
        {process.id}
      </div>
      <div className="flex-1">
        <GhostInput 
          type="number" 
          min="0"
          value={process.arrivalTime} 
          onChange={(e) => onChange(process.id, 'arrivalTime', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
          placeholder="Arrival Time"
        />
      </div>
      <div className="flex-1">
        <GhostInput 
          type="number" 
          min="1"
          value={process.burstTime} 
          onChange={(e) => onChange(process.id, 'burstTime', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
          placeholder="Burst Time"
        />
      </div>
      <GlowButton variant="danger" onClick={() => onRemove(process.id)} className="px-3" title="Remove Process">
        <X size={20} strokeWidth={1.5} />
      </GlowButton>
    </div>
  );
};
