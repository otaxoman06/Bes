
import { useCallback, useState, useEffect, useRef } from 'react';
import { SOUNDS } from '@/assets/sounds';

const SOUND_ENABLED_KEY = 'ma-almanshuriyah-sound-enabled';

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(SOUND_ENABLED_KEY);
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Initialize audio elements
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioRefs.current[key] = audio;
    });

    return () => {
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_ENABLED_KEY, soundEnabled.toString());
    } catch (e) {
      console.warn('Could not save sound preference:', e);
    }
  }, [soundEnabled]);

  const playSound = useCallback((soundKey: string, volume = 0.5) => {
    if (!soundEnabled) return;

    const audio = audioRefs.current[soundKey];
    if (audio) {
      try {
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.warn('Audio playback error:', error);
        });
      } catch (error) {
        console.warn('Audio playback error:', error);
      }
    }
  }, [soundEnabled]);

  const playHoverSound = useCallback(() => {
    playSound('hover', 0.2);
  }, [playSound]);

  const playClickSound = useCallback(() => {
    playSound('click', 0.3);
  }, [playSound]);

  const playStartupSound = useCallback(() => {
    playSound('startup', 0.4);
  }, [playSound]);

  const playBackgroundSound = useCallback(() => {
    const audio = audioRefs.current['background'];
    if (audio && soundEnabled) {
      audio.volume = 0.1;
      audio.loop = true;
      audio.play().catch(console.warn);
    }
  }, [soundEnabled]);

  const stopBackgroundSound = useCallback(() => {
    const audio = audioRefs.current['background'];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const toggleSounds = useCallback(() => {
    setSoundEnabled(prev => {
      const newState = !prev;
      if (!newState) {
        stopBackgroundSound();
      }
      return newState;
    });
  }, [stopBackgroundSound]);

  const isSoundEnabled = useCallback(() => {
    return soundEnabled;
  }, [soundEnabled]);

  return {
    playHoverSound,
    playClickSound,
    playStartupSound,
    playBackgroundSound,
    stopBackgroundSound,
    toggleSounds,
    isSoundEnabled
  };
};
