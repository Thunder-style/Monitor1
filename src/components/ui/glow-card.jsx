import { cn } from "@/lib/utils";
import React from "react";

const GlowCard = ({ 
  children, 
  className, 
  glowColor = "#47dae8",
  title,
  icon,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-700/50",
        "bg-gradient-to-br from-slate-900/80 to-slate-800/60",
        "backdrop-blur-sm transition-all duration-300",
        "hover:border-cyan-400/50 hover:shadow-lg",
        className
      )}
      style={{
        boxShadow: `0 0 20px rgba(71, 218, 232, 0.1)`,
        background: 'rgba(19, 25, 47, 0.6)',
      }}
      {...props}
    >
      {/* 发光边框效果 */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}20, transparent)`,
          filter: 'blur(1px)',
        }}
      />
      
      {/* 标题栏 */}
      {(title || icon) && (
        <div className="flex items-center p-4 pb-2">
          {icon && (
            <span className="mr-2 text-cyan-300 text-lg">
              {icon}
            </span>
          )}
          {title && (
            <h3 className="text-lg font-bold text-cyan-100">
              {title}
            </h3>
          )}
        </div>
      )}
      
      {/* 内容区域 */}
      <div className="relative z-10 p-4">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
