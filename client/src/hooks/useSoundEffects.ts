import { useCallback, useState, useEffect } from 'react';

// Konstanta untuk URL Audio - untuk saat ini kita gunakan empty sounds untuk menghindari error
const HOVER_SOUND = 'hover';
const CLICK_SOUND = 'click';
const STARTUP_SOUND = 'startup';
const BACKGROUND_SOUND = 'background';

// Kunci untuk preferensi suara di localStorage
const SOUND_ENABLED_KEY = 'ma-almanshuriyah-sound-enabled';

/**
 * Hook untuk mengelola efek suara pada aplikasi
 */
export const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem(SOUND_ENABLED_KEY);
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });
  
  // Simpan nilai soundEnabled ke localStorage ketika berubah
  useEffect(() => {
    try {
      localStorage.setItem(SOUND_ENABLED_KEY, soundEnabled.toString());
    } catch (e) {
      console.warn('Could not save sound preference:', e);
    }
  }, [soundEnabled]);
  
  // Fungsi dummy untuk "memainkan" suara - karena terbatas oleh browser policy
  const playSound = useCallback((sound: string, volume = 0.5) => {
    if (!soundEnabled) return;
    
    // Logging untuk development
    console.log(`Playing ${sound} sound at volume ${volume}`);
    
    // Di sini akan ditambahkan kode untuk memainkan suara
    // jika berada di environment produksi
  }, [soundEnabled]);
  
  const playHoverSound = useCallback(() => {
    playSound(HOVER_SOUND, 0.2);
  }, [playSound]);
  
  const playClickSound = useCallback(() => {
    playSound(CLICK_SOUND, 0.3);
  }, [playSound]);
  
  const playStartupSound = useCallback(() => {
    playSound(STARTUP_SOUND, 0.4);
  }, [playSound]);
  
  const playBackgroundSound = useCallback(() => {
    playSound(BACKGROUND_SOUND, 0.1);
  }, [playSound]);
  
  const stopBackgroundSound = useCallback(() => {
    // Do nothing for now, just a placeholder
    console.log('Background sound stopped');
  }, []);
  
  const toggleSounds = useCallback(() => {
    setSoundEnabled(prev => !prev);
    // Always play a 'click' for feedback even if sounds are being turned off
    playSound(CLICK_SOUND, 0.3);
  }, [playSound]);
  
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
