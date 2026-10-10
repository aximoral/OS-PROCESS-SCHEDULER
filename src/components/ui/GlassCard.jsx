export const GlassCard = ({ children, className = "", noPadding = false }) => {
  return (
    <div className={`bg-slateCard/60 backdrop-blur-md border border-white/10 rounded-lg ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
};
