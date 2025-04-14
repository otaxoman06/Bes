import { useState, useEffect, useRef } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import AudioVisualizer from "./AudioVisualizer";

interface LinkItem {
  title: string;
  subtitle: string;
  url: string;
  icon: string;
}

interface DropdownLinkProps {
  title: string;
  subtitle: string;
  links: LinkItem[];
  icon: string;
  color: string;
}

const DropdownLink = ({ title, subtitle, links, icon, color }: DropdownLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [animatingClose, setAnimatingClose] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playClickSound } = useSoundEffects();
  
  const handleToggle = () => {
    if (isOpen) {
      setAnimatingClose(true);
      setTimeout(() => {
        setIsOpen(false);
        setAnimatingClose(false);
      }, 200);
    } else {
      setIsOpen(true);
    }
    playClickSound();
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
  
  const handleLinkClick = (url: string) => {
    playClickSound();
    window.open(url, "_blank");
  };
  
  // Effect for click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAnimatingClose(true);
        setTimeout(() => {
          setIsOpen(false);
          setAnimatingClose(false);
        }, 200);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-container relative" ref={dropdownRef}>
      <div
        className="link-button display-panel p-4 rounded-lg hud-element group cursor-pointer transition-all duration-300 relative overflow-hidden"
        onClick={handleToggle}
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
          <i 
            className={`fas fa-chevron-down ml-2 transition-all duration-300 ${isHovered ? 'text-cyan-400' : 'text-blue-400'}`}
            style={{ 
              transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
              textShadow: isHovered ? '0 0 5px rgba(0, 200, 255, 0.8)' : 'none'
            }}
          />
        </div>
      </div>
      
      {(isOpen || animatingClose) && (
        <div 
          className="dropdown-content absolute left-0 w-full z-30 mt-2 display-panel p-4 rounded-lg transition-all duration-300 overflow-hidden border border-blue-500/20"
          style={{ 
            opacity: animatingClose ? 0 : 1,
            transform: `translateY(${animatingClose ? '-10px' : '0'}) scaleY(${animatingClose ? 0.8 : 1})`,
            transformOrigin: "top center",
            clipPath: "polygon(0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px))",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(0, 136, 255, 0.3)"
          }}
        >
          {/* Hologram scanner line for dropdown */}
          <div className="absolute left-0 right-0 h-px bg-blue-500/50 top-0" 
            style={{animation: 'scanning-line 3s ease-in-out infinite'}}></div>
          
          {/* Tech corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/50"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/50"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/50"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/50"></div>
          
          {links.map((link, index) => (
            <div 
              key={index}
              className="link-button hud-element p-3 rounded group transition-all duration-200 hover:bg-blue-500/10 relative overflow-hidden"
              onClick={() => handleLinkClick(link.url)}
              style={{ 
                marginBottom: index < links.length - 1 ? "0.5rem" : 0,
                opacity: 1,
                transform: 'translateX(0)',
                animationName: 'fadeInRight',
                animationDuration: '0.3s',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
                borderLeft: '1px solid rgba(0, 136, 255, 0.2)',
                borderBottom: '1px solid rgba(0, 136, 255, 0.2)'
              }}
              onMouseEnter={() => playHoverSound()}
            >
              {/* Diagonal scanning effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                <div className="absolute h-[200%] w-[3px] bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"
                  style={{
                    top: '-50%',
                    left: '-20%',
                    transform: 'rotate(45deg)',
                    transition: 'all 0.3s ease-out',
                    animation: 'scanning-line 1.5s ease-in-out infinite'
                  }}></div>
              </div>
              
              <div className="flex items-center relative z-10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 60, 120, 0.8), rgba(0, 20, 40, 0.8))',
                    boxShadow: '0 0 10px rgba(0, 136, 255, 0.3) inset, 0 0 5px rgba(0, 136, 255, 0.2)'
                  }}>
                  <div className="absolute inset-1 rounded-full border border-dashed border-blue-400/30 group-hover:animate-spin-slow"></div>
                  <i className={`${link.icon} text-lg text-neon-blue relative z-10 group-hover:text-cyan-400 transition-colors group-hover:animate-pulse-slow`}></i>
                </div>
                <div>
                  <h4 className="font-rajdhani text-neon-blue group-hover:text-cyan-400 transition-colors">{link.title}</h4>
                  <p className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors">{link.subtitle}</p>
                  
                  {/* Tech measurement line animation */}
                  <div className="h-px bg-blue-500/30 w-0 group-hover:w-full transition-all duration-700 mt-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownLink;
