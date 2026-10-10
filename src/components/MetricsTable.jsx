import { GlassCard } from './ui/GlassCard';

export const MetricsTable = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  const avgTAT = (metrics.reduce((acc, curr) => acc + curr.turnaroundTime, 0) / metrics.length).toFixed(2);
  const avgWT = (metrics.reduce((acc, curr) => acc + curr.waitingTime, 0) / metrics.length).toFixed(2);

  return (
    <GlassCard className="overflow-hidden" noPadding>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 align-top">
              <th className="p-4 font-medium text-slate-300 align-middle">Process</th>
              <th className="p-4 font-medium text-slate-300">
                <div className="flex flex-col">
                  <span>AT</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Arrival Time</span>
                </div>
              </th>
              <th className="p-4 font-medium text-slate-300">
                <div className="flex flex-col">
                  <span>BT</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Burst Time</span>
                </div>
              </th>
              <th className="p-4 font-medium text-amberAccent">
                <div className="flex flex-col">
                  <span>CT</span>
                  <span className="text-[10px] text-amberAccent/50 uppercase tracking-wider mt-0.5">Completion</span>
                </div>
              </th>
              <th className="p-4 font-medium text-amberAccent">
                <div className="flex flex-col">
                  <span>TAT</span>
                  <span className="text-[10px] text-amberAccent/50 uppercase tracking-wider mt-0.5">Turnaround</span>
                </div>
              </th>
              <th className="p-4 font-medium text-amberAccent">
                <div className="flex flex-col">
                  <span>WT</span>
                  <span className="text-[10px] text-amberAccent/50 uppercase tracking-wider mt-0.5">Waiting Time</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {metrics.map((m) => (
              <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-slate-200 font-bold">{m.id}</td>
                <td className="p-4 text-slate-400">{m.arrivalTime}</td>
                <td className="p-4 text-slate-400">{m.burstTime}</td>
                <td className="p-4 text-slate-200">{m.completionTime}</td>
                <td className="p-4 text-slate-200">{m.turnaroundTime}</td>
                <td className="p-4 text-slate-200">{m.waitingTime}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slateBase/30">
            <tr>
              <td colSpan="4" className="p-4 text-right font-medium text-slate-400">Averages</td>
              <td className="p-4 font-mono text-amberAccent font-bold">{avgTAT}</td>
              <td className="p-4 font-mono text-amberAccent font-bold">{avgWT}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </GlassCard>
  );
};
