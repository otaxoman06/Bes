import { useState, useEffect, useRef } from "react";
import { maLogo } from "@/assets/logos";

const OpeningAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [yOffset, setYOffset] = useState(-20);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  
  const loadingStages = [
    'Memuat sistem inti...',
    'Inisialisasi konfigurasi...',
    'Mengoptimalkan antarmuka...',
    'Memverifikasi tautan...',
    'Menyiapkan reaktor...',
    'Sistem siap!'
  ];

  // Initialize animation
  useEffect(() => {
    // Animate logo entry
    const fadeInTimer = setTimeout(() => {
      setOpacity(1);
      setYOffset(0);
    }, 100);
    
    return () => clearTimeout(fadeInTimer);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 5 + 1;
        const newProgress = Math.min(prev + increment, 100);
        
        // Update loading stage based on progress
        const stageIndex = Math.min(
          Math.floor(newProgress / (100 / loadingStages.length)),
          loadingStages.length - 1
        );
        
        if (stageIndex !== loadingStage) {
          setLoadingStage(stageIndex);
          
          // Reset and animate the message element
          if (messageRef.current) {
            messageRef.current.style.opacity = "0";
            setTimeout(() => {
              if (messageRef.current) {
                messageRef.current.style.opacity = "1";
              }
            }, 200);
          }
        }
        
        // Update progress bar width
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${newProgress}%`;
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [loadingStage]);

  return (
    <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center z-50">
      <div 
        className="mb-8 transition-all duration-500"
        style={{
          opacity,
          transform: `translateY(${yOffset}px)`,
        }}
      >
        <img 
          src={maLogo} 
          alt="System Logo" 
          className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-neon-blue" 
        />
        <div className="boot-up-text font-orbitron text-neon-blue text-lg">
          SISTEM INISIALISASI... 
        </div>
      </div>
      
      <div className="w-64 h-2 bg-panel-bg rounded-full relative overflow-hidden">
        <div 
          ref={progressBarRef}
          className="h-full bg-neon-blue rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div 
        ref={messageRef}
        className="mt-2 text-sm text-cyan-400 transition-opacity duration-200"
      >
        {loadingStages[loadingStage]}
      </div>
    </div>
  );
};

export default OpeningAnimation;
