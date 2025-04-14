import { useEffect, useState } from "react";

const ReactorSpinner = () => {
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    setAnimating(true);
  }, []);

  return (
    <div className="relative mb-12 mt-4">
      <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
        <div 
          className={`absolute inset-0 reactor-ring rounded-full ${animating ? 'animate-spin-slow' : ''}`}
        />
        
        <div 
          className={`absolute inset-6 reactor-ring rounded-full ${animating ? 'animate-spin-reverse' : ''}`}
        />
        
        <div 
          className={`absolute inset-12 reactor-ring rounded-full ${animating ? 'animate-spin-medium' : ''}`}
        />
        
        <div className="absolute inset-20 rounded-full bg-black overflow-hidden">
          <div className="absolute inset-2 rounded-full reactor-core animate-pulse-slow" />
        </div>
        
        <div className="z-10 font-orbitron text-white text-center absolute">
          <div className="text-sm opacity-70">SISTEM</div>
          <div className="text-3xl font-bold">MA-2025</div>
          <div className="text-xs opacity-70 mt-2">ALMANSHURIYAH</div>
        </div>
      </div>
    </div>
  );
};

export default ReactorSpinner;
