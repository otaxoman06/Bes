import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { maLogo } from "@/assets/logos";

const OpeningAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  
  const loadingStages = [
    'Memuat sistem inti...',
    'Inisialisasi konfigurasi...',
    'Mengoptimalkan antarmuka...',
    'Memverifikasi tautan...',
    'Menyiapkan reaktor...',
    'Sistem siap!'
  ];

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
        setLoadingStage(stageIndex);
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center z-50">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={maLogo} 
          alt="System Logo" 
          className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-neon-blue" 
        />
        <div className="boot-up-text font-orbitron text-neon-blue text-lg">
          SISTEM INISIALISASI... 
        </div>
      </motion.div>
      
      <div className="w-64 h-2 bg-panel-bg rounded-full relative overflow-hidden">
        <motion.div 
          className="h-full bg-neon-blue rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <motion.div 
        className="mt-2 text-sm text-cyan-400"
        key={loadingStage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {loadingStages[loadingStage]}
      </motion.div>
    </div>
  );
};

export default OpeningAnimation;
