import { useEffect, useState, useRef } from "react";

const ReactorSpinner = () => {
  const [animating, setAnimating] = useState(false);
  const [energy, setEnergy] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setAnimating(true);
    
    // Meningkatkan level energi secara bertahap
    const energyInterval = setInterval(() => {
      setEnergy(prev => {
        if (prev < 100) return prev + 5;
        clearInterval(energyInterval);
        return 100;
      });
    }, 200);
    
    // Membuat efek partikel
    const createParticle = () => {
      if (!particlesRef.current || !animating) return;
      
      const particle = document.createElement('div');
      particle.className = 'reactor-particle';
      
      // Ukuran random
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posisi awal random pada lingkaran
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      
      // Arah dan kecepatan random
      const velocityX = (Math.random() - 0.5) * 2;
      const velocityY = (Math.random() - 0.5) * 2;
      
      particlesRef.current.appendChild(particle);
      
      // Animasi partikel
      let opacity = 1;
      let posX = x;
      let posY = y;
      
      const animateParticle = () => {
        if (opacity <= 0) {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
          return;
        }
        
        posX += velocityX;
        posY += velocityY;
        opacity -= 0.02;
        
        particle.style.left = `calc(50% + ${posX}px)`;
        particle.style.top = `calc(50% + ${posY}px)`;
        particle.style.opacity = opacity.toString();
        
        requestAnimationFrame(animateParticle);
      };
      
      requestAnimationFrame(animateParticle);
    };
    
    // Create particles at intervals
    const particleInterval = setInterval(() => {
      if (energy >= 80) {
        for (let i = 0; i < 3; i++) {
          createParticle();
        }
      }
    }, 100);
    
    return () => {
      clearInterval(energyInterval);
      clearInterval(particleInterval);
    };
  }, [animating]);

  // Menghitung kecepatan rotasi berdasarkan energi
  const getSpinClass = (base: string) => {
    if (!animating) return '';
    if (energy < 50) return `${base}-slow`;
    if (energy < 80) return base;
    return `${base}-fast`;
  };

  return (
    <div className="relative mb-12 mt-4">
      <div className="hud-element-glow absolute -inset-8 opacity-10 rounded-full animate-glow"></div>
      
      {/* Outer measurement lines */}
      <div className="absolute inset-0 w-72 h-72 -left-4 -top-4 measurement-lines-outer rounded-full"></div>
      
      <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
        {/* Outer ring with energy indicators */}
        <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 energy-ring">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-2 h-8 bg-blue-500 opacity-70 energy-indicator"
                style={{ 
                  transform: `rotate(${i * 30}deg) translateY(-32px)`,
                  opacity: energy > (i * 8) ? 0.9 : 0.2,
                  boxShadow: energy > (i * 8) ? '0 0 10px #0088ff, 0 0 5px #00eeff' : 'none'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Spinning rings - improved with multiple layers and designs */}
        <div 
          className={`absolute inset-0 reactor-ring rounded-full animate-${getSpinClass('spin')}`}
          style={{
            boxShadow: '0 0 20px rgba(0, 150, 255, 0.3), 0 0 10px rgba(0, 200, 255, 0.2) inset',
            opacity: energy > 50 ? 0.9 : 0.7
          }}
        />
        
        <div 
          className={`absolute inset-6 reactor-ring-inner rounded-full animate-${getSpinClass('spin-reverse')}`}
          style={{
            boxShadow: '0 0 15px rgba(0, 150, 255, 0.3) inset',
            opacity: energy > 30 ? 0.9 : 0.7
          }}
        />
        
        <div 
          className={`absolute inset-12 reactor-ring-core rounded-full animate-${getSpinClass('spin-medium')}`}
          style={{
            boxShadow: '0 0 10px rgba(0, 150, 255, 0.3)',
            opacity: energy > 20 ? 0.9 : 0.7
          }}
        />
        
        {/* Additional rotating geometric elements */}
        <div 
          className={`absolute inset-3 rounded-full overflow-hidden animate-${getSpinClass('spin-slow')}`}
        >
          <div className="w-full h-full border-2 border-dashed border-blue-500/40"
               style={{
                 clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
                 transform: 'rotate(45deg)'
               }}></div>
        </div>
        
        <div 
          className={`absolute inset-9 rounded-full overflow-hidden animate-${getSpinClass('spin-reverse-fast')}`}
        >
          <div className="w-full h-full border border-dotted border-cyan-400/50"
               style={{
                 clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                 transform: 'rotate(22.5deg)'
               }}></div>
        </div>
        
        {/* Tech circuitry pattern - only visible at higher energy levels */}
        {energy > 40 && (
          <div className="absolute inset-6 rounded-full overflow-hidden opacity-40">
            <div 
              className="absolute inset-0 border border-cyan-400/60"
              style={{ 
                backgroundImage: 'radial-gradient(circle, rgba(0,200,255,0.1) 1px, transparent 1px), linear-gradient(rgba(0,150,255,0.1) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
                animation: `spin ${5 - energy/25}s linear infinite`
              }}
            ></div>
          </div>
        )}
        
        {/* Core reactor with glowing effect */}
        <div className="absolute inset-20 rounded-full bg-black overflow-hidden flex items-center justify-center">
          {/* Advanced reactor core with multiple layers for Ironman effect */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            {/* Inner core glow */}
            <div 
              className="absolute inset-0 rounded-full reactor-core animate-ironman-pulse"
              style={{ 
                filter: `blur(1px) brightness(${1 + energy/80})`,
                boxShadow: `0 0 ${10 + energy/5}px rgba(0, 150, 255, 0.8), 
                            0 0 ${20 + energy/3}px rgba(0, 200, 255, 0.6),
                            0 0 ${30 + energy/2}px rgba(0, 100, 255, 0.4) inset`
              }}
            />
            
            {/* Plasma effect */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute inset-0 bg-blue-500 mix-blend-screen animate-pulse-slow" 
                style={{filter: `blur(8px) brightness(${1 + energy/100})`}} />
            </div>
            
            {/* Central bright spot */}
            <div 
              className="absolute rounded-full w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-fast"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(100,200,255,0.6) 40%, transparent 70%)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
                filter: `blur(1px) brightness(${1 + energy/70})`
              }}
            />
            
            {/* Energy wave effect */}
            <div 
              className="absolute w-full h-full top-0 left-0"
              style={{
                background: `radial-gradient(circle, rgba(50,150,255,0.1) ${30 + energy/5}%, rgba(0,100,255,0.3) ${50 + energy/4}%, rgba(0,50,200,0.2) ${70 + energy/3}%, transparent 100%)`,
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Energy level indicator bar */}
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-800 z-20 mx-4">
            <div 
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ 
                width: `${energy}%`,
                boxShadow: '0 0 5px #0088ff, 0 0 2px #00eeff'
              }}
            ></div>
          </div>
          
          {/* Energy percentage */}
          <div className="absolute bottom-3 text-xs text-cyan-400 font-mono z-20">
            {energy}%
          </div>
        </div>
        
        {/* Reactor particle container */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden rounded-full pointer-events-none" />
        
        {/* Center text */}
        <div className="z-10 font-orbitron text-white text-center absolute">
          <div className="text-sm opacity-70">SISTEM</div>
          <div className="text-3xl font-bold text-neon-blue animate-pulse-slow">MA-2025</div>
          <div className="text-xs opacity-70 mt-2">ALMANSHURIYAH</div>
        </div>
        
        {/* Holographic scan line */}
        <div className="absolute inset-0 hologram-scanline rounded-full"></div>
      </div>
      
      {/* Technical measurement lines */}
      <div className="absolute top-1/2 left-0 w-12 h-px bg-neon-blue opacity-60"></div>
      <div className="absolute top-1/2 right-0 w-12 h-px bg-neon-blue opacity-60"></div>
      <div className="absolute top-0 left-1/2 h-12 w-px bg-neon-blue opacity-60"></div>
      <div className="absolute bottom-0 left-1/2 h-12 w-px bg-neon-blue opacity-60"></div>
      
      {/* Technical data points */}
      <div className="absolute top-1/2 left-0 -translate-x-2 -translate-y-4 text-xs text-neon-blue font-mono">R-145</div>
      <div className="absolute top-1/2 right-0 translate-x-2 -translate-y-4 text-xs text-neon-blue font-mono">T-768</div>
      <div className="absolute top-0 left-1/2 -translate-y-2 -translate-x-8 text-xs text-neon-blue font-mono">A-012</div>
      <div className="absolute bottom-0 left-1/2 translate-y-2 -translate-x-8 text-xs text-neon-blue font-mono">Z-934</div>
    </div>
  );
};

export default ReactorSpinner;
