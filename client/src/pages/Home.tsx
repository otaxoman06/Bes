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
    
    // Membuat elemen-elemen latar belakang teknologi
    if (!isLoading) {
      createBackgroundElements();
    }
    
    return () => clearTimeout(timeout);
  }, [playStartupSound, playBackgroundSound, isLoading]);
  
  // Fungsi untuk membuat elemen-elemen latar belakang futuristik
  const createBackgroundElements = () => {
    // Hapus elemen lama jika ada
    const oldElements = document.querySelectorAll('.tech-circle, .data-stream');
    oldElements.forEach(el => el.parentNode?.removeChild(el));
    
    // Buat lingkaran teknologi
    for (let i = 0; i < 8; i++) {
      const circle = document.createElement('div');
      circle.className = 'tech-circle';
      
      // Ukuran acak
      const size = Math.random() * 300 + 100;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      
      // Posisi acak
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      circle.style.left = `${posX}%`;
      circle.style.top = `${posY}%`;
      
      // Transform acak
      circle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      
      // Opacity acak
      circle.style.opacity = `${Math.random() * 0.2 + 0.05}`;
      
      document.body.appendChild(circle);
    }
    
    // Buat aliran data
    const dataStreamCount = 5;
    const codeSnippets = [
      "01001010011001\n10110100101111\n10011001001\n1010010101",
      "function init() {\n  system.boot();\n  memory.allocate();\n}",
      "class MASystem {\n  constructor() {\n    this.active = true;\n  }\n}",
      "const STATUS = {\n  ACTIVE: true,\n  POWER: 100,\n  CONN: 'OK'\n}",
      "0x4F8A2C\n0x7B9D3E\n0x2F8E1C\n0xA92D5F",
      "@syscall\ninit_module()\nload_preset('MA2025')\nboot_sequence()"
    ];
    
    for (let i = 0; i < dataStreamCount; i++) {
      const stream = document.createElement('div');
      stream.className = 'data-stream';
      
      // Pilih konten acak
      const snippetIndex = Math.floor(Math.random() * codeSnippets.length);
      stream.innerText = codeSnippets[snippetIndex];
      
      // Posisi acak
      const posX = Math.random() * 90 + 5; // hindari pojok layar
      const posY = Math.random() * 90 + 5;
      stream.style.left = `${posX}%`;
      stream.style.top = `${posY}%`;
      
      // Ukuran acak
      const width = Math.random() * 100 + 50;
      stream.style.width = `${width}px`;
      stream.style.maxHeight = '200px';
      
      // Kecepatan animasi acak
      const animationDuration = Math.random() * 10 + 5;
      stream.style.animationDuration = `${animationDuration}s, 4s`;
      
      document.body.appendChild(stream);
    }
    
    // Tambahkan grid teknologi sebagai background
    const grid = document.createElement('div');
    grid.className = 'bg-tech-grid fixed inset-0 z-[-1] opacity-10';
    document.body.appendChild(grid);
  };

  return (
    <div className="min-h-screen font-rajdhani text-white overflow-x-hidden relative">
      {isLoading ? (
        <OpeningAnimation />
      ) : (
        <div className="opacity-100 transition-opacity duration-1000">
          <HudCorners />
          <ScanlineEffect />
          
          {/* Background Overlay untuk efek hologram */}
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 to-cyan-900/5 z-[-1]"></div>
          
          {/* Header Section */}
          <header className="relative z-10 pt-8 pb-4">
            <div className="container mx-auto px-4">
              <div className="text-center">
                {/* Lingkaran teknologi yang berputar di belakang logo */}
                <div className="absolute left-1/2 top-24 w-64 h-64 border border-dashed border-blue-500/20 rounded-full -translate-x-1/2 animate-spin-slow opacity-60"></div>
                <div className="absolute left-1/2 top-24 w-72 h-72 border border-dotted border-cyan-500/20 rounded-full -translate-x-1/2 animate-spin-reverse opacity-40"></div>
                
                <div className="flex justify-center gap-8">
                  {/* Logo 1 */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse-slow"></div>
                    <img src={mbsaLogo} alt="MBES A Logo" className="w-24 h-24 object-contain animate-pulse-slow relative z-10" />
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500"></div>
                  </div>
                  
                  {/* Logo 2 */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse-slow"></div>
                    <img src={maLogo} alt="MA Logo" className="w-24 h-24 object-contain animate-pulse-slow relative z-10" />
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500"></div>
                  </div>
                </div>
                
                <h1 className="font-orbitron text-3xl md:text-4xl lg:text-5xl text-neon-blue mt-6 mb-2 tracking-wider animate-glow">
                  LINK TAUTAN
                </h1>
                <h2 className="font-orbitron text-xl md:text-2xl lg:text-3xl text-cyber-cyan mb-4">
                  MA ALMANSHURIYAH 2025
                </h2>
                <div className="w-full max-w-md mx-auto h-px bg-cyan-500/70 mb-4 opacity-70"></div>
                
                {/* Status system indicators */}
                <div className="flex justify-center gap-4 text-xs font-mono">
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-green-400 animate-pulse rounded-full mr-1"></span>
                    <span className="text-green-400">SISTEM AKTIF</span>
                  </div>
                  <div className="text-blue-400">
                    KONEKSI 100%
                  </div>
                  <div className="text-cyan-400 animate-data-flicker">
                    MEMORI OPTIMAL
                  </div>
                </div>
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
              <div className="w-full max-w-md mx-auto h-px bg-cyan-500 mb-4 opacity-70"></div>
              
              {/* Terminal-style status indicator */}
              <div className="w-full max-w-md mx-auto bg-gray-900/60 border border-blue-500/20 rounded-lg p-3 font-mono text-xs mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-400">[SISTEM]</span>
                  <span className="text-blue-400">STATUS: ONLINE</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-gray-400 mr-2">&gt;</span>
                  <span className="text-cyan-400 animate-pulse">MA-SYSTEM v.2025.1.0 READY</span>
                </div>
              </div>
              
              <p className="font-rajdhani text-sm text-gray-400">
                &copy; 2025 MA ALMANSHURIYAH. All rights reserved.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                <p>Jalan Raya Pagelaran KM 61, Cipari, Pagelaran, Cianjur</p>
              </div>
              <div className="flex justify-center items-center mt-3 space-x-4">
                <div className="text-xs py-1 px-3 border border-blue-500 text-neon-blue rounded-full">
                  SISTEM V.2025.01
                </div>
                <div id="status-indicator" className="flex items-center text-xs text-green-400">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
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
