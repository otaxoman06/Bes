import React from 'react';

const HudCorners = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Sudut kiri atas */}
      <div className="absolute left-0 top-0 w-16 h-16">
        <div className="absolute left-0 top-0 w-12 h-1 bg-[#0088FF]/60"></div>
        <div className="absolute left-0 top-0 w-1 h-12 bg-[#0088FF]/60"></div>
        <div className="absolute left-6 top-6 text-xs text-[#00FFFF]/80 font-mono">0,0</div>
      </div>
      
      {/* Sudut kanan atas */}
      <div className="absolute right-0 top-0 w-16 h-16">
        <div className="absolute right-0 top-0 w-12 h-1 bg-[#0088FF]/60"></div>
        <div className="absolute right-0 top-0 w-1 h-12 bg-[#0088FF]/60"></div>
        <div className="absolute right-6 top-6 text-xs text-[#00FFFF]/80 font-mono">100,0</div>
      </div>
      
      {/* Sudut kiri bawah */}
      <div className="absolute left-0 bottom-0 w-16 h-16">
        <div className="absolute left-0 bottom-0 w-12 h-1 bg-[#0088FF]/60"></div>
        <div className="absolute left-0 bottom-0 w-1 h-12 bg-[#0088FF]/60"></div>
        <div className="absolute left-6 bottom-6 text-xs text-[#00FFFF]/80 font-mono">0,100</div>
      </div>
      
      {/* Sudut kanan bawah */}
      <div className="absolute right-0 bottom-0 w-16 h-16">
        <div className="absolute right-0 bottom-0 w-12 h-1 bg-[#0088FF]/60"></div>
        <div className="absolute right-0 bottom-0 w-1 h-12 bg-[#0088FF]/60"></div>
        <div className="absolute right-6 bottom-6 text-xs text-[#00FFFF]/80 font-mono">100,100</div>
      </div>
    </div>
  );
};

export default HudCorners;
