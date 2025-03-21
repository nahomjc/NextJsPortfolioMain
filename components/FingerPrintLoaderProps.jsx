import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: canvas.width, height: canvas.height });
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

const FingerPrintLoader = ({ onLoadingComplete }) => {
  const [scanComplete, setScanComplete] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanComplete(true);
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 1000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: scanComplete ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"
    >
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: scanComplete ? 1.5 : 1 }}
          transition={{ duration: 1 }}
          className="fingerprint-scanner"
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 100 100"
            className="fingerprint"
          >
            {/* Core whorl pattern */}
            <path className="scan-path core" d="M50,50 C50,45 55,45 55,50 C55,55 50,55 50,50" />
            
            {/* Inner loops */}
            <path className="scan-path" d="M45,50 C45,40 55,40 55,50 C55,60 45,60 45,50" />
            <path className="scan-path" d="M40,50 C40,35 60,35 60,50 C60,65 40,65 40,50" />
            
            {/* Middle loops */}
            <path className="scan-path" d="M35,50 C35,30 65,30 65,50 C65,70 35,70 35,50" />
            <path className="scan-path" d="M30,50 C30,25 70,25 70,50 C70,75 30,75 30,50" />
            
            {/* Outer loops */}
            <path className="scan-path" d="M25,50 C25,20 75,20 75,50 C75,80 25,80 25,50" />
            
            {/* Ridge details - left side */}
            <path className="scan-path detail" d="M35,40 C38,42 40,45 40,50" />
            <path className="scan-path detail" d="M30,35 C35,38 38,42 38,50" />
            <path className="scan-path detail" d="M28,45 C32,48 35,52 35,55" />
            
            {/* Ridge details - right side */}
            <path className="scan-path detail" d="M65,40 C62,42 60,45 60,50" />
            <path className="scan-path detail" d="M70,35 C65,38 62,42 62,50" />
            <path className="scan-path detail" d="M72,45 C68,48 65,52 65,55" />
            
            {/* Digital circuit patterns */}
            <path className="circuit-path" d="M20,50 L25,50" />
            <path className="circuit-path" d="M75,50 L80,50" />
            <path className="circuit-path" d="M50,20 L50,25" />
            <path className="circuit-path" d="M50,75 L50,80" />
            
            {/* Scanning elements */}
            <motion.rect
              className="scan-area"
              x="0"
              y="0"
              width="100"
              height="100"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Scanning line */}
            <motion.line
              initial={{ y: 0 }}
              animate={{ y: scanComplete ? 100 : 0 }}
              transition={{
                duration: 3,
                ease: "linear",
              }}
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              className="scan-line"
            />
            
            {/* Data points */}
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={i}
                className="data-point"
                cx={50 + 25 * Math.cos((i * Math.PI) / 6)}
                cy={50 + 25 * Math.sin((i * Math.PI) / 6)}
                r="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Status Text */}
        {showText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-full text-center"
          >
            <motion.p
              initial={{ opacity: 1 }}
              animate={{ opacity: scanComplete ? 0 : 1 }}
              className="text-[#00ff00] text-lg font-mono mb-2 glitch-text"
            >
              {scanComplete ? "IDENTITY CONFIRMED" : "SCANNING BIOMETRICS..."}
            </motion.p>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: scanComplete ? "100%" : "0%" }}
              transition={{ duration: 3 }}
              className="h-1 bg-[#00ff00] mx-auto w-48 scanner-progress"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FingerPrintLoader;