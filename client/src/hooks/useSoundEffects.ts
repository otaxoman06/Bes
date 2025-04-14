import { useCallback, useRef, useEffect } from 'react';

// Gunakan embedded base64 audio untuk menghindari masalah CORS/network
// Suara kecil dengan format data URI untuk audio
const HOVER_SOUND_URL = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFWADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d//////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUDgAAAAAAAAVgD0l7IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tAxAAACXCZIU0MpMEyiymkhiTBQAE1/MwAkfQ5WDPGBQ+WkXCX4jKjQcHCzDUhMDAfMDRcOoYGBgkkR2bK9cxPZHjQULqR/+LsP8W/+i3+pnqfd5//vqCj/wHznAQkAzABNATBhgAkMO+TP9CzGqrI6Y2qrLlQsyxbvKztVEDzPJF8shRZuIj7v/9Gs7h5fvKUz0GdZ2i9hBuqzV2zsFqnrMZAiwC6zAFoJbP3MzAZMAthpTCyM4YE0TAwYMAwEAhjSRZpK8YQNXJG//tCxA4B1sSTGw9gAEGKGYNhg4FhjWwXLCRqQHlhJk7XtNIQGxhVGSCHHBz0fMeABWamkoHp85Vk2Yx5gHAW/S/+aBAi+QJcWPTjgJPCBSVTnpWFq1Xx0sMrX9e3TsXTDYFCwVxO/09a3hKI/pam+sAcBwJINnrWxcqOSl/oWuZ5TJvW5JuJPKa1rWta1tbpv0LXWcpI+PkGUipNa7NKTRBRYtXJ+gzr0vSn1NiJTXNalrdN1K9LSl5ZM8xsUDMYFBTGBQexbAAAAA==';
const CLICK_SOUND_URL = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFHADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUBgAAAAAAAARwCEiXTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//sQxAADwAABpAAAACAAADSAAAAETEFNFMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
const STARTUP_SOUND_URL = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAA8AAAaQAAAAgAAA0gAAABExBTRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
const BACKGROUND_SOUND_URL = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAA8AAAaQAAAAgAAA0gAAABExBTRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';

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

// Kumpulan audio yang sudah dipreload
const audioElements: {[key: string]: HTMLAudioElement} = {};

// Helper function untuk memuat dan memainkan audio
const playAudio = (url: string, volume = 0.5, loop = false): HTMLAudioElement => {
  // Gunakan audio yang sudah dimuat jika tersedia
  if (!audioElements[url]) {
    const audio = new Audio();
    audio.src = url;
    audio.volume = volume;
    audio.loop = loop;
    audio.preload = 'auto';
    
    // Tambahkan ke kumpulan audio
    audioElements[url] = audio;
    
    // Preload audio secara manual
    audio.load();
  } else {
    // Update volume dan loop jika sudah ada
    audioElements[url].volume = volume;
    audioElements[url].loop = loop;
    
    // Reset posisi audio jika sedang dimainkan
    if (!audioElements[url].paused) {
      audioElements[url].currentTime = 0;
    }
  }
  
  // Main audio dengan penanganan error
  try {
    const playPromise = audioElements[url].play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Audio playback error:", error);
        // Coba sekali lagi dengan interaksi pengguna
        document.addEventListener('click', function audioPlayOnClick() {
          audioElements[url].play().catch(e => console.warn("Retry audio error:", e));
          document.removeEventListener('click', audioPlayOnClick);
        }, { once: true });
      });
    }
  } catch (e) {
    console.warn("Audio play error:", e);
  }
  
  return audioElements[url];
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
