import React from 'react';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { playClickSound } = useSoundEffects();

  const themes: { id: ThemeType; name: string; icon: string }[] = [
    { id: 'ironman', name: 'Iron Tech', icon: '⚡' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌆' },
    { id: 'hologram', name: 'Hologram', icon: '🔮' },
    { id: 'matrix', name: 'Matrix', icon: '💻' }
  ];

  const handleThemeChange = (newTheme: ThemeType) => {
    try {
      playClickSound();
      setTheme(newTheme);
    } catch (e) {
      console.error("Error changing theme:", e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 border border-current rounded-lg overflow-hidden theme-border" 
           style={{ borderColor: 'var(--primary-color)' }}>
        <div className="p-2 bg-black/50 text-xs font-mono text-center"
             style={{ color: 'var(--primary-color)' }}>
          TEMA INTERFACE
        </div>
        <div className="grid grid-cols-2 gap-1 p-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => handleThemeChange(t.id)}
              className={`px-3 py-1.5 rounded flex items-center justify-center transition-all 
                ${theme === t.id ? 'bg-opacity-20 border border-current' : 'bg-black/40 border border-gray-700 opacity-70'}`}
              style={{ 
                color: 'var(--text-color)',
                borderColor: theme === t.id ? 'var(--primary-color)' : undefined,
                backgroundColor: theme === t.id ? 'var(--background-light)' : undefined,
                boxShadow: theme === t.id ? '0 0 10px var(--primary-color)' : undefined
              }}
            >
              <span className="mr-1">{t.icon}</span>
              <span className="text-xs">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;