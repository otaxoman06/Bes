import { useCallback, useRef, useEffect } from 'react';

// Sound URLs - menggunakan CDN lain yang lebih reliable
const HOVER_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-interface-click-tone-2568.mp3';
const CLICK_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3';
const STARTUP_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-tech-break-ui-deploy-2574.mp3';
const BACKGROUND_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-futuristic-technology-ambience-2516.mp3';

// Use local storage key for sound settings
const SOUND_ENABLED_KEY = 'ma-almanshuriyah-sound-enabled';

// Create a singleton for sound state
let soundEnabled = true;

// Try to get stored preference
try {
  const storedPreference = localStorage.getItem(SOUND_ENABLED_KEY);
  if (storedPreference !== null) {
    soundEnabled = storedPreference === 'true';
  }
} catch (e) {
  // In case of issues with localStorage
  console.warn('Could not access localStorage for sound preferences');
}

// Helper function to play audio with proper cleanup
const playAudio = (url: string, volume = 0.5, loop = false): HTMLAudioElement => {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.loop = loop;
  
  const playPromise = audio.play();
  
  // Handle promise rejection for browsers that restrict autoplay
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Audio playback error:", error);
    });
  }
  
  return audio;
};

export const useSoundEffects = () => {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const startupSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Preload sounds
  useEffect(() => {
    const preloadAudio = (url: string) => {
      const audio = new Audio();
      audio.src = url;
    };
    
    preloadAudio(HOVER_SOUND_URL);
    preloadAudio(CLICK_SOUND_URL);
    preloadAudio(STARTUP_SOUND_URL);
    preloadAudio(BACKGROUND_SOUND_URL);
    
    return () => {
      // Cleanup on unmount
      if (backgroundSoundRef.current) {
        backgroundSoundRef.current.pause();
      }
    };
  }, []);

  const playHoverSound = useCallback(() => {
    if (!soundEnabled) return;
    playAudio(HOVER_SOUND_URL, 0.2);
  }, []);

  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    playAudio(CLICK_SOUND_URL, 0.3);
  }, []);

  const playStartupSound = useCallback(() => {
    if (!soundEnabled) return;
    startupSoundRef.current = playAudio(STARTUP_SOUND_URL, 0.4);
  }, []);

  const playBackgroundSound = useCallback(() => {
    if (!soundEnabled) return;
    
    if (backgroundSoundRef.current) {
      backgroundSoundRef.current.play();
    } else {
      backgroundSoundRef.current = playAudio(BACKGROUND_SOUND_URL, 0.1, true);
    }
  }, []);

  const stopBackgroundSound = useCallback(() => {
    if (backgroundSoundRef.current) {
      backgroundSoundRef.current.pause();
    }
  }, []);

  const toggleSounds = useCallback(() => {
    soundEnabled = !soundEnabled;
    
    // Save preference to localStorage
    try {
      localStorage.setItem(SOUND_ENABLED_KEY, soundEnabled.toString());
    } catch (e) {
      console.warn('Could not save sound preference to localStorage');
    }
    
    if (soundEnabled) {
      playBackgroundSound();
    } else {
      stopBackgroundSound();
    }
    
    // Always play click sound for feedback
    playAudio(CLICK_SOUND_URL, 0.3);
  }, [playBackgroundSound, stopBackgroundSound]);

  const isSoundEnabled = useCallback(() => {
    return soundEnabled;
  }, []);

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
