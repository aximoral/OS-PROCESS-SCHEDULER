export const GlowButton = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  disabled, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg outline-none gap-2";
  
  const variants = {
    primary: "bg-amberAccent text-slateBase hover:shadow-amber-glow hover:brightness-110 focus:ring-2 focus:ring-amberAccent focus:ring-offset-2 focus:ring-offset-slateBase",
    ghost: "text-slate-300 hover:text-amberAccent hover:bg-white/5",
    danger: "text-red-400 hover:bg-red-400/10 hover:text-red-300",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:shadow-none hover:brightness-100" : "active:scale-95";

  return (
    <button 
      className={`${baseStyles} px-4 py-2 ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
