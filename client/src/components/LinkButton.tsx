import { useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import AudioVisualizer from "./AudioVisualizer";

interface LinkButtonProps {
  title: string;
  url: string;
  icon: string;
  subtitle: string;
  color: string;
  className?: string;
}

const LinkButton = ({ title, url, icon, subtitle, color, className = "" }: LinkButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { playHoverSound, playClickSound } = useSoundEffects();
  
  const handleClick = () => {
    playClickSound();
    window.open(url, "_blank");
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverSound();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };
  
  const handleMouseDown = () => {
    setIsActive(true);
  };
  
  const handleMouseUp = () => {
    setIsActive(false);
  };

  return (
    <div
      className={`link-button display-panel p-4 rounded-lg hud-element group cursor-pointer transition-all duration-300 relative overflow-hidden ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        opacity: 1,
        transform: `translateY(${isHovered ? '-2px' : '0'}) scale(${isActive ? '0.98' : isHovered ? '1.02' : '1'})`,
        transition: 'transform 0.3s, opacity 0.3s',
        boxShadow: isHovered ? `0 0 15px rgba(0, 136, 255, 0.4), 0 0 30px rgba(0, 136, 255, 0.2) inset` : 'none',
      }}
    >
      {/* Holographic horizontal scanning line */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        style={{ 
          top: isHovered ? '0%' : '100%', 
          opacity: isHovered ? 0.7 : 0,
          transition: 'top 1.5s ease-in-out, opacity 0.5s',
          filter: 'blur(1px)'
        }}
      ></div>

      {/* Tech grid lines */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-5 right-5 h-px bg-blue-500/50"></div>
        <div className="absolute bottom-0 left-5 right-5 h-px bg-blue-500/50"></div>
        <div className="absolute left-0 top-5 bottom-5 w-px bg-blue-500/50"></div>
        <div className="absolute right-0 top-5 bottom-5 w-px bg-blue-500/50"></div>
        
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/50"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/50"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/50"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/50"></div>
      </div>

      {/* Diagonal scanning line */}
      <div 
        className="absolute h-[200%] w-px bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
        style={{ 
          top: '-50%', 
          left: '0%',
          transform: 'rotate(-45deg)',
          animation: isHovered ? 'scanning-line 2s ease-in-out infinite alternate' : 'none'
        }}
      ></div>
      
      <div className="flex items-center relative z-10">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 relative overflow-hidden`}
          style={{ 
            backgroundColor: isHovered ? color : "#1E1E1E",
            boxShadow: isHovered ? `0 0 10px ${color}90` : 'none'
          }}
        >
          {/* Icon circular track */}
          <div className={`absolute inset-1 rounded-full border border-dashed border-blue-500/30 ${isHovered ? 'animate-spin-slow' : ''}`}></div>
          <i className={`${icon} text-2xl text-neon-blue relative z-10 ${isHovered ? 'animate-pulse-slow' : ''}`}></i>
        </div>
        <div className="flex-1">
          <h3 className="font-orbitron text-lg text-neon-blue group-hover:text-cyan-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-300 truncate">{subtitle}</p>
          
          {/* Tech measurement lines */}
          <div className={`h-px bg-blue-500/50 w-0 group-hover:w-full transition-all duration-700 mt-1 opacity-50`}></div>
        </div>
        <AudioVisualizer isActive={isHovered} />
      </div>
    </div>
  );
};

export default LinkButton;
