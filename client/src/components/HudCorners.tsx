import { useState, useEffect } from 'react';

const HudCorners = () => {
  const [cornerData, setCornerData] = useState({
    topLeft: { x: 0, y: 0 },
    topRight: { x: 100, y: 0 },
    bottomLeft: { x: 0, y: 100 },
    bottomRight: { x: 100, y: 100 }
  });
  
  // Animasi koordinat sudut
  useEffect(() => {
    const updateCoordinates = () => {
      setCornerData({
        topLeft: { 
          x: (Math.sin(Date.now() / 5000) * 2 + 2).toFixed(1), 
          y: (Math.cos(Date.now() / 6000) * 2 + 2).toFixed(1) 
        },
        topRight: { 
          x: (98 - Math.sin(Date.now() / 5500) * 2).toFixed(1), 
          y: (Math.cos(Date.now() / 6500) * 2 + 2).toFixed(1) 
        },
        bottomLeft: { 
          x: (Math.sin(Date.now() / 5200) * 2 + 2).toFixed(1), 
          y: (98 - Math.cos(Date.now() / 6200) * 2).toFixed(1) 
        },
        bottomRight: { 
          x: (98 - Math.sin(Date.now() / 5700) * 2).toFixed(1), 
          y: (98 - Math.cos(Date.now() / 6700) * 2).toFixed(1)
        }
      });
    };
    
    const intervalId = setInterval(updateCoordinates, 100);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* HUD Corners with animated brackets */}
        <div className="hud-corner hud-corner-top-left">
          <div className="absolute left-0 top-0 w-16 h-16">
            <div className="absolute left-0 top-0 w-12 h-1 bg-blue-500/60"></div>
            <div className="absolute left-0 top-0 w-1 h-12 bg-blue-500/60"></div>
            <div className="absolute left-3 top-3 w-8 h-px bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="absolute left-3 top-3 w-px h-8 bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="coordinate-label text-xs text-cyan-400/80 absolute left-6 top-6 font-mono">
              {cornerData.topLeft.x},{cornerData.topLeft.y}
            </div>
          </div>
        </div>
        
        <div className="hud-corner hud-corner-top-right">
          <div className="absolute right-0 top-0 w-16 h-16">
            <div className="absolute right-0 top-0 w-12 h-1 bg-blue-500/60"></div>
            <div className="absolute right-0 top-0 w-1 h-12 bg-blue-500/60"></div>
            <div className="absolute right-3 top-3 w-8 h-px bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="absolute right-3 top-3 w-px h-8 bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="coordinate-label text-xs text-cyan-400/80 absolute right-6 top-6 font-mono">
              {cornerData.topRight.x},{cornerData.topRight.y}
            </div>
          </div>
        </div>
        
        <div className="hud-corner hud-corner-bottom-left">
          <div className="absolute left-0 bottom-0 w-16 h-16">
            <div className="absolute left-0 bottom-0 w-12 h-1 bg-blue-500/60"></div>
            <div className="absolute left-0 bottom-0 w-1 h-12 bg-blue-500/60"></div>
            <div className="absolute left-3 bottom-3 w-8 h-px bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="absolute left-3 bottom-3 w-px h-8 bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="coordinate-label text-xs text-cyan-400/80 absolute left-6 bottom-6 font-mono">
              {cornerData.bottomLeft.x},{cornerData.bottomLeft.y}
            </div>
          </div>
        </div>
        
        <div className="hud-corner hud-corner-bottom-right">
          <div className="absolute right-0 bottom-0 w-16 h-16">
            <div className="absolute right-0 bottom-0 w-12 h-1 bg-blue-500/60"></div>
            <div className="absolute right-0 bottom-0 w-1 h-12 bg-blue-500/60"></div>
            <div className="absolute right-3 bottom-3 w-8 h-px bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="absolute right-3 bottom-3 w-px h-8 bg-cyan-400/40 animate-pulse-slow"></div>
            <div className="coordinate-label text-xs text-cyan-400/80 absolute right-6 bottom-6 font-mono">
              {cornerData.bottomRight.x},{cornerData.bottomRight.y}
            </div>
          </div>
        </div>
        
        {/* Optional measurement lines */}
        <div className="absolute left-4 top-1/2 h-px w-2 bg-blue-500/30"></div>
        <div className="absolute right-4 top-1/2 h-px w-2 bg-blue-500/30"></div>
        <div className="absolute top-4 left-1/2 w-px h-2 bg-blue-500/30"></div>
        <div className="absolute bottom-4 left-1/2 w-px h-2 bg-blue-500/30"></div>
      </div>
    </>
  );
};

export default HudCorners;
