import React from "react";

const ScanlineEffect = () => {
  return (
    <div className="scanline-container fixed inset-0 overflow-hidden pointer-events-none z-[999]">
      <div 
        className="fixed w-full h-[1px] bg-[#0088FF] opacity-30 pointer-events-none"
        style={{
          animation: 'scanning-line 4s linear infinite',
          boxShadow: '0 0 8px #0088FF'
        }}
      />
    </div>
  );
};

export default ScanlineEffect;
