import { useState, useEffect } from "react";
import OpeningAnimation from "@/components/OpeningAnimation";
import LinkButton from "@/components/LinkButton";
import DropdownLink from "@/components/DropdownLink";
import ScanlineEffect from "@/components/ScanlineEffect";
import HudCorners from "@/components/HudCorners";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  pendaftaranLink, 
  instagramLinks, 
  facebookLinks, 
  youtubeLink, 
  tiktokLink, 
  whatsappLinks, 
  locationLink 
} from "@/lib/linkData";
import { mbsaLogo, maLogo } from "@/assets/logos";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { playStartupSound, playBackgroundSound } = useSoundEffects();
  
  useEffect(() => {
    // Play startup sound when component mounts
    playStartupSound();
    
    // Simulate loading time and then show main content
    const timeout = setTimeout(() => {
      setIsLoading(false);
      playBackgroundSound();
      
      // Setelah loading selesai, buat elemen latar belakang
      setTimeout(() => {
        createBackgroundElements();
      }, 500);
    }, 2000); // Lebih cepat untuk testing
    
    return () => clearTimeout(timeout);
  }, [playStartupSound, playBackgroundSound]);
  
  // Fungsi untuk membuat elemen-elemen latar belakang futuristik yang disederhanakan
  const createBackgroundElements = () => {
    // Untuk sementara kita nonaktifkan pembuatan elemen DOM dinamis ini
    // untuk meningkatkan performa dan mencegah masalah dengan Replit
    console.log('Background elements simplified for testing');
  };

  const { theme } = useTheme();

  return (
    <div className="min-h-screen font-rajdhani text-white overflow-x-hidden relative theme-animated">
      {isLoading ? (
        <OpeningAnimation />
      ) : (
        <div className="opacity-100 transition-opacity duration-1000">
          <HudCorners />
          <ScanlineEffect />
          
          {/* Background Overlay untuk efek hologram */}
          <div className="fixed inset-0 z-[-1]" 
               style={{
                 background: `linear-gradient(to bottom right, 
                              rgba(0, 0, 0, 0.8), 
                              rgba(20, 20, 30, 0.5))`,
                 opacity: 0.9
               }}></div>
          
          {/* Theme Switcher */}
          <ThemeSwitcher />
          
          {/* Futuristic background elements */}
          <div className="fixed top-20 left-20 w-40 h-40 border border-dashed rounded-full animate-spin-slow opacity-30 z-[-1]"
               style={{ borderColor: 'var(--primary-color)' }}></div>
          <div className="fixed bottom-20 right-20 w-60 h-60 border border-dashed rounded-full animate-spin-reverse opacity-20 z-[-1]"
               style={{ borderColor: 'var(--secondary-color)' }}></div>
          <div className="fixed top-1/4 right-1/4 w-20 h-20 border border-dotted rounded-full animate-spin-medium opacity-40 z-[-1]"
               style={{ borderColor: 'var(--primary-color)' }}></div>
          <div className="fixed bottom-1/3 left-1/3 w-32 h-32 border border-dotted rounded-full animate-spin-reverse opacity-30 z-[-1]"
               style={{ borderColor: 'var(--secondary-color)' }}></div>
          
          {/* Tech grid background */}
          <div className="fixed inset-0 bg-tech-grid opacity-20 z-[-1]"></div>
          
          {/* Animated scanning lines */}
          <div className="fixed inset-x-0 h-0.5 z-[-1] theme-scanline" 
            style={{
              boxShadow: '0 0 8px var(--primary-color)',
              animation: 'scanning-line 2.5s ease-in-out infinite alternate',
              top: '30%'
            }}></div>
          <div className="fixed inset-x-0 h-0.5 z-[-1] theme-scanline" 
            style={{
              boxShadow: '0 0 8px var(--secondary-color)',
              animation: 'scanning-line 3.5s ease-in-out infinite alternate-reverse',
              top: '60%'
            }}></div>
          
          {/* Glowing points */}
          <div className="fixed top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse-slow z-[-1]"
            style={{
              backgroundColor: 'var(--primary-color)',
              boxShadow: '0 0 12px var(--primary-color)'
            }}></div>
          <div className="fixed bottom-1/3 right-1/3 w-2 h-2 rounded-full animate-pulse-fast z-[-1]"
            style={{
              backgroundColor: 'var(--secondary-color)',
              boxShadow: '0 0 15px var(--secondary-color)'
            }}></div>
          <div className="fixed top-2/3 right-1/4 w-2 h-2 rounded-full animate-pulse z-[-1]"
            style={{
              backgroundColor: 'var(--primary-color)',
              boxShadow: '0 0 15px var(--primary-color)'
            }}></div>
          
          {/* Header Section */}
          <header className="relative z-10 pt-8 pb-4">
            <div className="container mx-auto px-4">
              <div className="text-center">
                {/* Lingkaran teknologi yang berputar di belakang logo */}
                <div className="absolute left-1/2 top-24 w-64 h-64 border border-dashed rounded-full -translate-x-1/2 animate-spin-slow opacity-60"
                     style={{ borderColor: 'var(--primary-color)' }}></div>
                <div className="absolute left-1/2 top-24 w-72 h-72 border border-dotted rounded-full -translate-x-1/2 animate-spin-reverse opacity-40"
                     style={{ borderColor: 'var(--secondary-color)' }}></div>
                
                <div className="flex justify-center gap-8">
                  {/* Logo 1 */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full animate-pulse-slow"
                         style={{ backgroundColor: 'var(--primary-color)', opacity: 0.1 }}></div>
                    <img src={mbsaLogo} alt="MBES A Logo" className="w-24 h-24 object-contain animate-pulse-slow relative z-10" />
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5"
                         style={{ backgroundColor: 'var(--primary-color)' }}></div>
                  </div>
                  
                  {/* Logo 2 */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full animate-pulse-slow"
                         style={{ backgroundColor: 'var(--primary-color)', opacity: 0.1 }}></div>
                    <img src={maLogo} alt="MA Logo" className="w-24 h-24 object-contain animate-pulse-slow relative z-10" />
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5"
                         style={{ backgroundColor: 'var(--primary-color)' }}></div>
                  </div>
                </div>
                
                <h1 className="font-orbitron text-3xl md:text-4xl lg:text-5xl mt-6 mb-2 tracking-wider theme-animated"
                    style={{ 
                      color: 'var(--primary-color)',
                      textShadow: '0 0 10px var(--primary-color)'
                    }}>
                  LINK TAUTAN
                </h1>
                <h2 className="font-orbitron text-xl md:text-2xl lg:text-3xl mb-4" 
                    style={{ 
                      color: 'var(--secondary-color)',
                      textShadow: '0 0 8px var(--secondary-color)'
                    }}>
                  MA ALMANSHURIYAH 2025
                </h2>
                <div className="w-full max-w-md mx-auto h-px mb-4 opacity-70"
                     style={{ backgroundColor: 'var(--secondary-color)' }}></div>
                
                {/* Status system indicators */}
                <div className="flex justify-center gap-4 text-xs font-mono">
                  <div className="flex items-center">
                    <span className="h-2 w-2 animate-pulse rounded-full mr-1"
                          style={{ backgroundColor: 'var(--secondary-color)' }}></span>
                    <span style={{ color: 'var(--secondary-color)' }}>SISTEM AKTIF</span>
                  </div>
                  <div style={{ color: 'var(--primary-color)' }}>
                    KONEKSI 100%
                  </div>
                  <div className="animate-data-flicker" 
                       style={{ color: 'var(--primary-color)' }}>
                    MEMORI OPTIMAL
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Section with Reactor */}
          <main className="relative z-20 py-6">
            <div className="container mx-auto px-4 flex flex-col items-center">
              {/* Central Reactor Element - Temporary simplified for testing */}
              <div className="w-40 h-40 rounded-full border-4 border-[#0088FF] flex items-center justify-center mb-8 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-[#0088FF] animate-pulse" />
              </div>
              
              {/* Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                <LinkButton 
                  title="Pendaftaran" 
                  url={pendaftaranLink.url} 
                  icon={pendaftaranLink.icon} 
                  subtitle={pendaftaranLink.subtitle} 
                  color={pendaftaranLink.color}
                />
                
                <DropdownLink 
                  title="Instagram" 
                  links={instagramLinks} 
                  icon="fab fa-instagram" 
                  subtitle="2 Akun Resmi" 
                  color="bg-purple-600"
                />
                
                <DropdownLink 
                  title="Facebook" 
                  links={facebookLinks} 
                  icon="fab fa-facebook-f" 
                  subtitle="2 Halaman Resmi" 
                  color="bg-blue-600"
                />
                
                <LinkButton 
                  title="YouTube" 
                  url={youtubeLink.url} 
                  icon={youtubeLink.icon} 
                  subtitle={youtubeLink.subtitle} 
                  color={youtubeLink.color}
                />
                
                <LinkButton 
                  title="TikTok" 
                  url={tiktokLink.url} 
                  icon={tiktokLink.icon} 
                  subtitle={tiktokLink.subtitle} 
                  color={tiktokLink.color}
                />
                
                <DropdownLink 
                  title="WhatsApp" 
                  links={whatsappLinks} 
                  icon="fab fa-whatsapp" 
                  subtitle="2 Kontak Informasi" 
                  color="bg-green-600"
                />
                
                <LinkButton 
                  title="Lokasi" 
                  url={locationLink.url} 
                  icon={locationLink.icon} 
                  subtitle={locationLink.subtitle} 
                  color={locationLink.color}
                  className="md:col-span-2"
                />
              </div>
            </div>
          </main>
          
          {/* Footer Section */}
          <footer className="relative z-10 py-6 mt-8">
            <div className="container mx-auto px-4 text-center">
              <div className="w-full max-w-md mx-auto h-px mb-4 opacity-70" 
                   style={{ backgroundColor: 'var(--primary-color)' }}></div>
              
              {/* Terminal-style status indicator */}
              <div className="w-full max-w-md mx-auto bg-gray-900/60 rounded-lg p-3 font-mono text-xs mb-4"
                   style={{ borderColor: 'var(--primary-color)', borderWidth: '1px' }}>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--secondary-color)' }}>[SISTEM]</span>
                  <span style={{ color: 'var(--primary-color)' }}>STATUS: ONLINE</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-gray-400 mr-2">&gt;</span>
                  <span className="animate-pulse" 
                        style={{ color: 'var(--primary-color)' }}>MA-SYSTEM v.2025.1.0 READY</span>
                </div>
              </div>
              
              <p className="font-rajdhani text-sm"
                 style={{ color: 'var(--text-color)', opacity: 0.7 }}>
                &copy; 2025 MA ALMANSHURIYAH. All rights reserved.
              </p>
              <div className="text-xs mt-2"
                   style={{ color: 'var(--text-color)', opacity: 0.5 }}>
                <p>Jalan Raya Pagelaran KM 61, Cipari, Pagelaran, Cianjur</p>
              </div>
              <div className="flex justify-center items-center mt-3 space-x-4">
                <div className="text-xs py-1 px-3 border rounded-full theme-border theme-text">
                  SISTEM V.2025.01
                </div>
                <div id="status-indicator" className="flex items-center text-xs"
                     style={{ color: 'var(--secondary-color)' }}>
                  <span className="h-2 w-2 rounded-full mr-2 animate-pulse"
                        style={{ backgroundColor: 'var(--secondary-color)' }}></span>
                  <span>ONLINE</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
