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
        className="link-button display-panel p-4 rounded-lg hud-element group cursor-pointer transition-all duration-300"
        onClick={handleToggle}
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
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-300"
            style={{ backgroundColor: isHovered ? color : "#1E1E1E" }}
          >
            <i className={`${icon} text-2xl text-neon-blue`}></i>
          </div>
          <div className="flex-1">
            <h3 className="font-orbitron text-lg text-neon-blue">{title}</h3>
            <p className="text-sm text-gray-300">{subtitle}</p>
          </div>
          <AudioVisualizer isActive={isHovered} />
          <i 
            className="fas fa-chevron-down ml-2 transition-transform duration-300" 
            style={{ transform: `rotate(${isOpen ? '180deg' : '0deg'})` }}
          />
        </div>
      </div>
      
      {(isOpen || animatingClose) && (
        <div 
          className="dropdown-content absolute left-0 w-full z-30 mt-2 display-panel p-4 rounded-lg transition-all duration-200 overflow-hidden"
          style={{ 
            opacity: animatingClose ? 0 : 1,
            transform: `translateY(${animatingClose ? '-10px' : '0'}) scaleY(${animatingClose ? 0.8 : 1})`,
            transformOrigin: "top center",
            clipPath: "polygon(0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px))"
          }}
        >
          {links.map((link, index) => (
            <div 
              key={index}
              className="link-button hud-element p-3 rounded group transition-all duration-200 hover:bg-neon-blue/10"
              onClick={() => handleLinkClick(link.url)}
              style={{ 
                marginBottom: index < links.length - 1 ? "0.5rem" : 0,
                opacity: 1,
                transform: 'translateX(0)',
                animationName: 'fadeInRight',
                animationDuration: '0.3s',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-center">
                <i className={`${link.icon} text-xl text-neon-blue mr-3`}></i>
                <div>
                  <h4 className="font-rajdhani text-neon-blue">{link.title}</h4>
                  <p className="text-xs text-gray-300">{link.subtitle}</p>
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
