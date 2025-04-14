import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  isActive: boolean;
}

const AudioVisualizer = ({ isActive }: AudioVisualizerProps) => {
  const bars = [0, 1, 2, 3, 4];
  const [heights, setHeights] = useState<number[]>([5, 5, 5, 5, 5]);
  
  useEffect(() => {
    if (!isActive) {
      setHeights([5, 5, 5, 5, 5]);
      return;
    }
    
    // Animation frames for each bar
    const animationFrames: number[][] = [
      [5, 15, 8, 20, 5],
      [8, 5, 18, 10, 12],
      [12, 10, 5, 15, 8],
      [6, 12, 10, 5, 15],
      [15, 6, 12, 10, 5]
    ];
    
    let frameIndex = 0;
    
    const interval = setInterval(() => {
      setHeights(animationFrames[frameIndex]);
      frameIndex = (frameIndex + 1) % animationFrames.length;
    }, 150);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  return (
    <div className={`audio-visualizer ml-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      {bars.map((index) => (
        <div
          key={index}
          className="audio-bar transition-all duration-150"
          style={{
            height: `${heights[index]}px`,
            transitionDelay: `${index * 0.05}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
