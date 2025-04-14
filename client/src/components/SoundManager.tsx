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
      className="fixed bottom-4 right-4 display-panel p-2 rounded-full flex gap-2 items-center z-50 transition-all duration-300 transform hover:scale-105"
      style={{ 
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}
    >
      <button 
        id="toggle-sound" 
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neon-blue/20 transition-transform duration-200 transform hover:scale-110 active:scale-90"
        onClick={handleToggleSound}
      >
        <i 
          id="sound-icon" 
          className={`fas ${soundEnabled ? 'fa-volume-up text-neon-blue' : 'fa-volume-mute text-red-500'}`}
        ></i>
      </button>
    </div>
  );
};
