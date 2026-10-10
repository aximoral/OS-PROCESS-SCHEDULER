import { GlassCard } from './ui/GlassCard';

export const GanttChartVisualizer = ({ gantt }) => {
  if (!gantt || gantt.length === 0) return null;

  return (
    <GlassCard>
      <h3 className="text-lg font-display font-medium text-slate-200 mb-6">Execution Timeline</h3>
      <div className="flex overflow-x-auto pb-4 gap-1 snap-x no-scrollbar">
        {gantt.map((block, index) => {
          const isIdle = block.processId === 'IDLE';
          const duration = block.endTime - block.startTime;
          
          return (
            <div 
              key={index} 
              className={`flex-shrink-0 flex flex-col snap-center transition-transform hover:-translate-y-1`}
              style={{ minWidth: `${Math.max(60, duration * 25)}px` }}
            >
              <div 
                className={`h-16 flex items-center justify-center font-mono font-bold rounded-t-lg border border-b-0 border-white/10 ${
                  isIdle 
                    ? 'bg-slateBase/50 text-slate-500' 
                    : 'bg-amberAccent/10 text-amberAccent shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]'
                }`}
              >
                {block.processId}
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-500 mt-1 px-1">
                <span>{block.startTime}</span>
                <span>{block.endTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
