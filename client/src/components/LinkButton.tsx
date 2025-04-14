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
      className={`link-button display-panel p-4 rounded-lg hud-element group cursor-pointer transition-all duration-300 ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        opacity: 1,
        transform: `translateY(${isHovered ? '-2px' : '0'}) scale(${isActive ? '0.98' : isHovered ? '1.02' : '1'})`,
        transition: 'transform 0.3s, opacity 0.3s'
      }}
    >
      <div className="flex items-center">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-300`}
          style={{ backgroundColor: isHovered ? color : "#1E1E1E" }}
        >
          <i className={`${icon} text-2xl text-neon-blue`}></i>
        </div>
        <div className="flex-1">
          <h3 className="font-orbitron text-lg text-neon-blue">{title}</h3>
          <p className="text-sm text-gray-300 truncate">{subtitle}</p>
        </div>
        <AudioVisualizer isActive={isHovered} />
      </div>
    </div>
  );
};

export default LinkButton;
