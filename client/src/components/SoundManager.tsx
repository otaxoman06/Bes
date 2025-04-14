
import { useState, useEffect } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const SoundManager = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { toggleSounds, isSoundEnabled } = useSoundEffects();

  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
  }, [isSoundEnabled]);

  const handleToggleSound = () => {
    toggleSounds();
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div 
      className="fixed bottom-4 right-4 display-panel p-2 rounded-full flex gap-2 items-center z-50 hover:bg-gray-800/50 transition-all duration-300"
      style={{ 
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <button 
        id="toggle-sound" 
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neon-blue/20 transition-all duration-200 transform hover:scale-110 active:scale-90"
        onClick={handleToggleSound}
        title={soundEnabled ? 'Matikan Suara' : 'Hidupkan Suara'}
      >
        <i 
          className={`fas ${soundEnabled ? 'fa-volume-up text-neon-blue' : 'fa-volume-mute text-red-500'} text-xl`}
        ></i>
      </button>
    </div>
  );
};
