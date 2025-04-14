import { useEffect, useState } from "react";

const ScanlineEffect = () => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;
    
    // Animation duration in ms
    const duration = 8000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate position based on elapsed time (0 to 100 and back)
      const cycle = (elapsed % duration) / duration;
      const pos = cycle <= 0.5 
        ? cycle * 200  // 0 to 100 (first half of cycle)
        : 200 - (cycle * 200); // 100 to 0 (second half of cycle)
      
      setPosition(pos);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return (
    <div 
      className="scanline"
      style={{
        transform: `translateY(${position}%)`
      }}
    />
  );
};

export default ScanlineEffect;
