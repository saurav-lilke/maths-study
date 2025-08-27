import React from "react";

export const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl shadow-lg p-6 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 shadow-cyan-500/20 shadow-[0_0_20px_rgba(0,245,255,0.15)] ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
}) => {
  const base =
    "px-5 py-2.5 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300";
  const variants = {
    default:
      "bg-cyan-500 text-white hover:bg-cyan-400 focus:ring-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.5),0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_15px_rgba(0,245,255,0.7),0_0_30px_rgba(0,245,255,0.5)]",
    destructive:
      "bg-pink-600 text-white hover:bg-pink-500 focus:ring-pink-500 shadow-[0_0_10px_rgba(255,0,255,0.5),0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_15px_rgba(255,0,255,0.7),0_0_30px_rgba(255,0,255,0.5)]",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
