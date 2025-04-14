import React from "react";
import { maLogo } from "@/assets/logos";

const OpeningAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <img 
        src={maLogo} 
        alt="MA Logo" 
        className="w-32 h-32 mx-auto mb-4 animate-pulse" 
      />
      
      <div className="text-[#0088FF] font-orbitron text-lg mb-6">
        SISTEM INISIALISASI... 
      </div>
      
      <div className="w-64 h-2 bg-gray-800 rounded-full relative overflow-hidden">
        <div 
          className="h-full bg-[#0088FF] rounded-full animate-pulse"
          style={{ width: '60%' }}
        />
      </div>
      
      <div className="mt-4 text-sm text-[#00FFFF]">
        Memuat antarmuka...
      </div>
    </div>
  );
};

export default OpeningAnimation;
