
import { useCallback, useState, useEffect, useRef } from 'react';
import { SOUNDS } from '@/assets/sounds';

// Konstanta untuk key di localStorage
const SOUND_ENABLED_KEY = 'ma-almanshuriyah-sound-enabled';

// Synthethic Audio Context (untuk efek suara sintetis)
let audioContext: AudioContext | null = null;

// Mencoba membuat beep sintetis sebagai fallback
const createSyntheticBeep = (frequency = 440, duration = 100, volume = 0.3) => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + (duration / 1000));
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + (duration / 1000));
  } catch (e) {
    // Abaikan error - audio adalah fitur opsional
  }
};

export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(SOUND_ENABLED_KEY);
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  // Referensi untuk semua audio yang dipreload
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  
  // Menandai apakah audio availability sudah dicek
  const audioChecked = useRef<boolean>(false);

  // Efek untuk memuat audio saat komponen mount
  useEffect(() => {
    // Daripada asynchronous load yang dapat gagal, kita langsung buat audio elements
    Object.entries(SOUNDS).forEach(([key, url]) => {
      try {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = url;
        
        // Error handler
        audio.onerror = () => {
          console.warn(`Failed to load audio ${key}`);
        };
        
        // Simpan referensi
        audioRefs.current[key] = audio;
      } catch (err) {
        console.warn(`Failed to create audio ${key}:`, err);
      }
    });
    
    // Cleanup saat component unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        try {
          audio.pause();
          audio.src = '';
        } catch (e) {
          // Abaikan error
        }
      });
    };
  }, []);

  // Menyimpan preferensi ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SOUND_ENABLED_KEY, soundEnabled.toString());
    } catch (e) {
      // Abaikan error
    }
  }, [soundEnabled]);

  // Function untuk memainkan suara
  const playSound = useCallback((soundKey: string, volume = 0.5, frequency = 440) => {
    if (!soundEnabled) return;

    // Pertama coba gunakan Audio APIs standard
    const audio = audioRefs.current[soundKey];
    if (audio) {
      try {
        // Reset audio state
        audio.pause();
        audio.volume = volume;
        audio.currentTime = 0;
        
        // Coba mainkan audio
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Jika gagal, gunakan synthetic beep
            if (soundKey === 'hover') createSyntheticBeep(frequency, 50, volume);
            else if (soundKey === 'click') createSyntheticBeep(frequency * 1.2, 80, volume);
            else if (soundKey === 'startup') createSyntheticBeep(frequency * 1.5, 120, volume);
          });
        }
        return;
      } catch (error) {
        // Jika error, fallback ke synthetic
      }
    }
    
    // Fallback untuk synthetic audio
    if (soundKey === 'hover') createSyntheticBeep(frequency, 50, volume);
    else if (soundKey === 'click') createSyntheticBeep(frequency * 1.2, 80, volume);
    else if (soundKey === 'startup') createSyntheticBeep(frequency * 1.5, 120, volume);
    
  }, [soundEnabled]);

  // Berbagai fungsi untuk memainkan suara
  const playHoverSound = useCallback(() => {
    playSound('hover', 0.2, 600);
  }, [playSound]);

  const playClickSound = useCallback(() => {
    playSound('click', 0.3, 800);
  }, [playSound]);

  const playStartupSound = useCallback(() => {
    playSound('startup', 0.4, 440);
  }, [playSound]);

  // Background sound memerlukan perlakuan khusus
  const playBackgroundSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Coba buat ambient sound dengan oscillator
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Create subtle ambient sound with periodic oscillator
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      
      // Store oscillator node reference for cleanup
      const cleanup = () => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
      };
      
      // Set timeout to avoid infinite sound
      setTimeout(cleanup, 2000);
    } catch (e) {
      // Abaikan error
    }
    
  }, [soundEnabled]);

  const stopBackgroundSound = useCallback(() => {
    const audio = audioRefs.current['background'];
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        // Abaikan error
      }
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
    
    // Mainkan beep sintetis untuk feedback
    createSyntheticBeep(440, 80, 0.2);
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
