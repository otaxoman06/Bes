
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
    const preloadAudio = async () => {
      const audioPromises = Object.entries(SOUNDS).map(async ([key, url]) => {
        const audio = new Audio();
        audio.preload = 'auto';
        
        // Create load promise
        const loadPromise = new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
        });
        
        // Set source and wait for load
        audio.src = url;
        try {
          await loadPromise;
          audioRefs.current[key] = audio;
        } catch (err) {
          console.warn(`Failed to load audio ${key}:`, err);
        }
      });
      
      await Promise.all(audioPromises);
    };
    
    preloadAudio();

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
        // Reset audio state
        audio.pause();
        audio.volume = volume;
        audio.currentTime = 0;
        
        // Play with user interaction handling
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch(error => {
              // Auto-play was prevented
              if (error.name === 'NotAllowedError') {
                console.info('Audio playback requires user interaction first');
              } else {
                console.warn('Audio playback error:', error.message);
              }
            });
        }
      } catch (error) {
        console.warn('Audio system error:', error);
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
