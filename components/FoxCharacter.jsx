import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FoxCharacter = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [isSleeping, setIsSleeping] = useState(false);
    const [isWinking, setIsWinking] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [lastMouseMove, setLastMouseMove] = useState(Date.now());
    const [mood, setMood] = useState('happy'); // happy, excited, sleepy, surprised
    const [clickCount, setClickCount] = useState(0);
    const [showTreat, setShowTreat] = useState(false);
    const [treats, setTreats] = useState([]);
    const [isJumping, setIsJumping] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [bubbleText, setBubbleText] = useState('');
    
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const foxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const idleTimerRef = useRef(null);
  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    sleepy: '😴',
    surprised: '😲',
    love: '🥰'
  };

  const speechBubbles = [
    "Woof! Wanna play?",
    "I love belly rubs!",
    "*wags tail excitedly*",
    "Ball? BALL? BALL!",
    "You're my best friend!",
    "*yawns* Nap time...",
    "Treats? Did someone say treats?",
    "Let's go for a walk!",
    "I'll help you debug! *sniffs code*",
    "Squirrel! 🐿️"
  ];
  // Autonomous eye movement when idle
  const moveEyesAutonomously = () => {
    const now = Date.now();
    if (now - lastMouseMove > 2000) { // If mouse hasn't moved for 2 seconds
      const angle = Math.random() * Math.PI * 2;
      const distance = 4;
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    }
  };
  const handleInteraction = () => {
    setClickCount(prev => prev + 1);
    
    // Every 3 clicks shows a treat
    if (clickCount % 3 === 0) {
      setShowTreat(true);
      setMood('excited');
      setBubbleText('Yay! A treat! 🍪');
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    }

    // Every 5 clicks makes the fox jump
    if (clickCount % 5 === 0) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1000);
      setBubbleText('Wheee! 🎉');
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    }

    // Random mood changes
    if (Math.random() > 0.7) {
      const moods = ['happy', 'excited', 'surprised', 'love'];
      const newMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(newMood);
    }

    // Random speech bubble
    if (Math.random() > 0.5) {
      const randomSpeech = speechBubbles[Math.floor(Math.random() * speechBubbles.length)];
      setBubbleText(randomSpeech);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    }
  };

  // ... (keep existing useEffect and other functions)

  useEffect(() => {
    let autonomousMovement;
    let winkInterval;

    const startIdleAnimation = () => {
      autonomousMovement = setInterval(moveEyesAutonomously, 1000);
      winkInterval = setInterval(() => {
        setIsWinking(true);
        setTimeout(() => setIsWinking(false), 300);
      }, 5000);
    };

    const handleMouseMove = (e) => {
      setLastMouseMove(Date.now());
      setIsSleeping(false);
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseClick = () => {
      setShowEmoji(true);
      setTimeout(() => setShowEmoji(false), 1000);
    };

    const updateEyePosition = () => {
      if (!foxRef.current) return;

      const foxRect = foxRef.current.getBoundingClientRect();
      const foxCenterX = foxRect.left + foxRect.width / 2;
      const foxCenterY = foxRect.top + foxRect.height / 2;

      const angle = Math.atan2(
        mousePositionRef.current.y - foxCenterY,
        mousePositionRef.current.x - foxCenterX
      );

      const distance = 4;
      const newPosition = {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };

      setEyePosition(newPosition);
      animationFrameRef.current = requestAnimationFrame(updateEyePosition);
    };

    // Start idle timer
    idleTimerRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastMouseMove > 10000) { // 10 seconds of inactivity
        setIsSleeping(true);
      }
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    animationFrameRef.current = requestAnimationFrame(updateEyePosition);
    startIdleAnimation();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      clearInterval(autonomousMovement);
      clearInterval(winkInterval);
      clearInterval(idleTimerRef.current);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lastMouseMove]);

  
 
  
    // ... (keep existing useEffect and other functions)
  
    return (
      <motion.div
        ref={foxRef}
        className="w-full flex justify-center items-center py-8 cursor-pointer z-[9999] overflow-hidden"
        onHoverStart={() => {
          setIsHovering(true);
          setBubbleText('*happy fox noises* 💕');
          setShowBubble(true);
        }}
        onHoverEnd={() => {
          setIsHovering(false);
          setShowBubble(false);
        }}
        onClick={handleInteraction}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          {/* Speech Bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: -60, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-lg"
              >
                <div className="relative">
                  <p className="text-sm whitespace-nowrap">{bubbleText}</p>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 bg-white dark:bg-gray-800" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  
          {/* Fox Body */}
          <motion.div 
            className="w-32 h-32 relative"
            animate={
              isJumping 
                ? {
                    y: [-20, 0],
                    transition: {
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }
                : isSleeping 
                ? {
                    y: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                : {}
            }
          >
          
        


<div className="absolute inset-0 bg-[#8B4513] rounded-full shadow-lg overflow-hidden">
  {/* Dog Ears - Made floppier and longer */}
  <motion.div 
    className="absolute -top-6 left-4 w-10 h-16 bg-[#8B4513] rounded-t-full origin-bottom transform rotate-[-20deg]"
    animate={isHovering ? {
      rotateZ: [-20, -10, -20],
      transition: { duration: 1, repeat: Infinity }
    } : {}}
    style={{
      transformOrigin: 'bottom center',
      borderRadius: '50% 50% 0 0'
    }}
  />
  <motion.div 
    className="absolute -top-6 right-4 w-10 h-16 bg-[#8B4513] rounded-t-full origin-bottom transform rotate-[20deg]"
    animate={isHovering ? {
      rotateZ: [20, 10, 20],
      transition: { duration: 1, repeat: Infinity }
    } : {}}
    style={{
      transformOrigin: 'bottom center',
      borderRadius: '50% 50% 0 0'
    }}
  />
  
  {/* Dog Face */}
  <div className="absolute inset-0 flex items-center justify-center">
    {/* Dog Snout */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-20 h-16 bg-[#A0522D] rounded-[100%] flex flex-col items-center justify-center">
      {/* Nose */}
      <motion.div 
        className="w-6 h-4 bg-black rounded-full mb-2"
        whileHover={{ scale: 1.2 }}
        animate={{
          scale: isHovering ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Mouth */}
      <motion.div
        className="w-8 h-[2px] bg-black rounded-full"
        animate={
          isHovering || mood === 'happy' || mood === 'excited'
            ? {
                scaleY: [1, 2, 1],
                borderRadius: ["9999px", "0", "9999px"],
              }
            : {}
        }
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </div>

    {/* Dog Eyes */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-10">
      {/* Left Eye */}
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 bg-white rounded-full" />
        {!isSleeping && !isWinking && (
          <motion.div
            className="absolute inset-1 bg-[#4B3621] rounded-full"
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
            }}
          >
            {/* Eye shine */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        )}
        {(isSleeping || isWinking) && (
          <div className="absolute top-1/2 w-full h-0.5 bg-[#4B3621] rounded-full" />
        )}
      </div>
      
      {/* Right Eye */}
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 bg-white rounded-full" />
        {!isSleeping && !isWinking && (
          <motion.div
            className="absolute inset-1 bg-[#4B3621] rounded-full"
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
            }}
          >
            {/* Eye shine */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        )}
        {(isSleeping || isWinking) && (
          <div className="absolute top-1/2 w-full h-0.5 bg-[#4B3621] rounded-full" />
        )}
      </div>
    </div>
  </div>

  {/* Mood Indicator with Tail Wag */}
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="absolute -bottom-8 -right-4 origin-bottom"
  >
    <motion.div
      className="w-4 h-12 bg-[#8B4513] rounded-full origin-bottom"
      animate={
        isHovering || mood === 'excited' || mood === 'happy'
          ? {
              rotateZ: [-45, 45, -45],
              transition: {
                duration: 0.5,
                repeat: Infinity,
                ease: "linear"
              }
            }
          : {}
      }
    />
  </motion.div>

  {/* Treats Collection */}
  <div className="absolute -bottom-8 left-0 flex space-x-2">
    {treats.map((treat, index) => (
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-sm"
      >
        🦴
      </motion.span>
    ))}
  </div>
</div>




          </motion.div>
  
          {/* Treat Animation */}
          <AnimatePresence>
            {showTreat && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: [-20, 0], rotate: [0, 360] }}
                exit={{ opacity: 0, y: 20 }}
                onAnimationComplete={() => {
                  setShowTreat(false);
                  setTreats(prev => [...prev, '🍪']);
                }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2"
              >
                <span className="text-2xl">🍪</span>
              </motion.div>
            )}
          </AnimatePresence>
  
          {/* Particle Effects */}
          {isJumping && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0, y: [0, 20] }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                      x: (i - 2) * 10,
                      y: Math.random() * 20
                    }}
                    className="text-yellow-500 text-xl"
                  >
                    ✨
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
  
          {/* Keep existing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-500 blur-md -z-10"
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    );
  };
  
  export default FoxCharacter;