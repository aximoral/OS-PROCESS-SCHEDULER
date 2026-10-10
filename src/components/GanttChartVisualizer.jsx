import { GlassCard } from './ui/GlassCard';

export const GanttChartVisualizer = ({ gantt }) => {
  if (!gantt || gantt.length === 0) return null;

  const totalTime = gantt[gantt.length - 1].endTime;

  return (
    <GlassCard>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-display font-medium text-slate-200">Execution Timeline</h3>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-amberAccent/20 border border-amberAccent/50"></div>
            <span>Executing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-slateBase/50 border border-white/10"></div>
            <span>Idle</span>
          </div>
          <div className="px-2 py-1 bg-white/5 rounded-md text-slate-300 border border-white/5 ml-2">
            Total Time: <span className="text-amberAccent font-mono font-bold">{totalTime}</span>
          </div>
        </div>
      </div>
      
      <div className="relative bg-slateBase/30 rounded-xl p-4 border border-white/5">
        <div className="flex overflow-x-auto gap-1 snap-x sleek-scrollbar relative z-10 pb-4">
          {gantt.map((block, index) => {
            const isIdle = block.processId === 'IDLE';
            const duration = block.endTime - block.startTime;
            
            return (
              <div 
                key={index} 
                className="flex-shrink flex flex-col snap-center"
                style={{ 
                  width: `${Math.max(64, duration * 25)}px`,
                  minWidth: '56px' 
                }}
              >
                <div 
                  className={`h-20 flex flex-col items-center justify-center font-mono font-bold rounded-lg border border-white/10 overflow-hidden ${
                    isIdle 
                      ? 'bg-slateBase/50 text-slate-500' 
                      : 'bg-amberAccent/10 text-amberAccent shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]'
                  }`}
                >
                  <span className="text-lg">{block.processId}</span>
                  <span className="text-[10px] font-sans font-normal opacity-60 uppercase tracking-wider mt-1 whitespace-nowrap">
                    {duration} unit{duration !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
                  <span>{block.startTime}</span>
                  {index === gantt.length - 1 && <span>{block.endTime}</span>}
                </div>
              </div>
            );
          })}
        </div>
        {/* Subtle grid line connecting timestamps */}
        <div className="absolute bottom-[34px] left-4 right-4 h-px bg-white/5 z-0"></div>
      </div>
    </GlassCard>
  );
};
