import { useState, useEffect } from "react";
import OpeningAnimation from "@/components/OpeningAnimation";
import ReactorSpinner from "@/components/ReactorSpinner";
import LinkButton from "@/components/LinkButton";
import DropdownLink from "@/components/DropdownLink";
import ScanlineEffect from "@/components/ScanlineEffect";
import HudCorners from "@/components/HudCorners";
import { useSoundEffects } from "@/hooks/useSoundEffects";
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
    }, 6000); // Loading sequence takes approximately 6 seconds
    
    return () => clearTimeout(timeout);
  }, [playStartupSound, playBackgroundSound]);

  return (
    <div className="bg-dark-bg min-h-screen font-rajdhani text-white overflow-x-hidden relative">
      {isLoading ? (
        <OpeningAnimation />
      ) : (
        <div className="opacity-100 transition-opacity duration-1000">
          <HudCorners />
          <ScanlineEffect />
          
          {/* Header Section */}
          <header className="relative z-10 pt-8 pb-4">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <div className="flex justify-center gap-8">
                  {/* Logo 1 */}
                  <div className="relative">
                    <img src={mbsaLogo} alt="MBES A Logo" className="w-24 h-24 object-contain animate-pulse-slow" />
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-neon-blue"></div>
                  </div>
                  
                  {/* Logo 2 */}
                  <div className="relative">
                    <img src={maLogo} alt="MA Logo" className="w-24 h-24 object-contain animate-pulse-slow" />
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-neon-blue"></div>
                  </div>
                </div>
                
                <h1 className="font-orbitron text-3xl md:text-4xl lg:text-5xl text-neon-blue mt-6 mb-2 tracking-wider">
                  LINK TAUTAN
                </h1>
                <h2 className="font-orbitron text-xl md:text-2xl lg:text-3xl text-cyber-cyan mb-4">
                  MA ALMANSHURIYAH 2025
                </h2>
                <div className="w-full max-w-md mx-auto h-px bg-neon-blue mb-4 opacity-70"></div>
              </div>
            </div>
          </header>
          
          {/* Main Section with Reactor */}
          <main className="relative z-20 py-6">
            <div className="container mx-auto px-4 flex flex-col items-center">
              {/* Central Reactor Element */}
              <ReactorSpinner />
              
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
              <div className="w-full max-w-md mx-auto h-px bg-neon-blue mb-4 opacity-70"></div>
              <p className="font-rajdhani text-sm text-gray-400">
                &copy; 2025 MA ALMANSHURIYAH. All rights reserved.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                <p>Jalan Raya Pagelaran KM 61, Cipari, Pagelaran, Cianjur</p>
              </div>
              <div className="flex justify-center items-center mt-3 space-x-4">
                <div className="text-xs py-1 px-3 border border-neon-blue text-neon-blue rounded-full">
                  SISTEM V.2025.01
                </div>
                <div id="status-indicator" className="flex items-center text-xs text-emerald">
                  <span className="h-2 w-2 bg-emerald rounded-full mr-2 animate-pulse"></span>
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
