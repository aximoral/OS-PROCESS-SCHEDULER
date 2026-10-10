import { forwardRef } from 'react';

export const GhostInput = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full bg-slateCard/40 border border-white/10 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent transition-all ${className}`}
      {...props}
    />
  );
});

GhostInput.displayName = 'GhostInput';
