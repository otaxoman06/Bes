import { motion } from "framer-motion";

const ScanlineEffect = () => {
  return (
    <motion.div 
      className="scanline"
      initial={{ y: -100 }}
      animate={{ y: ["0%", "100%", "0%"] }}
      transition={{ 
        duration: 8, 
        repeat: Infinity,
        ease: "linear" 
      }}
    />
  );
};

export default ScanlineEffect;
