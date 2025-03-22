import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const SpeechBubble = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0 }}
    animate={{ opacity: 1, y: -80, scale: 1 }} // Changed y from -60 to -80 to make it more visible
    exit={{ opacity: 0, scale: 0 }}
    className="absolute top-12 right-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-lg z-[9999]" // Added higher z-index
    style={{
      minWidth: '200px',
      maxWidth: '300px',
      textAlign: 'center',
      pointerEvents: 'none' // This ensures the bubble doesn't interfere with clicks
    }}
  >
    <div className="relative">
      <p className="text-sm whitespace-normal text-black dark:text-white">{text}</p>
      <div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 bg-white dark:bg-gray-800"
        style={{ zIndex: -1 }}
      />
    </div>
  </motion.div>
);
const FoxCharacter = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [isSleeping, setIsSleeping] = useState(false);
    const [isWinking, setIsWinking] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [lastMouseMove, setLastMouseMove] = useState(Date.now());
    const [mood, setMood] = useState('excited'); // happy, excited, sleepy, surprised
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
  const messages = [
    { count: 1, text: "Hi there! i am Nahoms RoboDog! 🐕" },
    { count: 2, text: "Want to learn about Nahom? Click the chat! 💬" },
    { count: 3, text: "Hey, that tickles! 😄" },
    { count: 4, text: "I know all about Nahoms projects! 💻" },
    { count: 5, text: "Stop poking me! 😅" },
    { count: 6, text: "I can tell you about his skills in the chat! 🚀" },
    { count: 7, text: "Okay okay, I am getting dizzy! 😵‍💫" },
    { count: 8, text: "Seriously, lets talk in the chat box! ➡️" },
    { count: 9, text: "I have so much to tell you about Nahom! 🤖" },
    { count: 10, text: "*beep boop* Chat is more comfortable! 📱" },
    { count: 11, text: "Did you know Nahom got 3.9 GPA? Chat to learn more! 🎓" },
    { count: 12, text: "I am running out of things to say here! 😅" },
    { count: 13, text: "The chat box is much better for conversation! 💭" },
    { count: 14, text: "Click the chat icon, I will tell you everything! 🗨️" },
    { count: 15, text: "Alright, I am going to take a nap if you dont chat! 😴" }
  ];
  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    sleepy: '😴',
    surprised: '😲',
    love: '🥰'
  };

  const speechBubbles = [
    "Hi there! 👋",
    "Hey, that tickles! 😄",
    "Stop poking me! 😅",
    "Okay okay, I am awake! 🐕",
    "Want to know about Nahom? Click the chat! 💬",
    "I can tell you about his projects! 💻",
    "Or his skills! 🚀",
    "Lets chat in the message box! ➡️",
    "I know everything about Nahom! 🤖",
    "Seriously, lets talk properly in chat! 📱"
  ];;
  // Autonomous eye movement when idle
  const handleInteraction = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      // Get message index (using modulo to cycle through messages)
      const messageIndex = (newCount - 1) % messages.length;
      const messageToShow = messages[messageIndex].text;
      
      // Show message
      setBubbleText(messageToShow);
      setShowBubble(true);

      // Change mood based on click count
      if (newCount > 12) {
        setMood('sleepy');
      } else if (newCount > 8) {
        setMood('surprised');
      } else if (newCount > 4) {
        setMood('excited');
      } else {
        setMood('happy');
      }

      // Clear any existing timeout
      if (window.bubbleTimeout) {
        clearTimeout(window.bubbleTimeout);
      }

      // Hide bubble after 3 seconds
      window.bubbleTimeout = setTimeout(() => {
        setShowBubble(false);
      }, 3000);

      return newCount;
    });

    // Jump animation every 4 clicks
    if (clickCount % 4 === 0) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1000);
    }

    // Show treat every 7 clicks
    if (clickCount % 7 === 0) {
      setShowTreat(true);
    }
  };
  // Eye movement function
  const moveEyesAutonomously = () => {
    const now = Date.now();
    if (now - lastMouseMove > 2000) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 4;
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    }
  };
console.log(clickCount,bubbleText,showBubble);
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
        setBubbleText('Hi! Click me or chat with me! 👋');
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
          {showBubble && <SpeechBubble text={bubbleText} />}
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
        <motion.div
    className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5651e5] to-transparent opacity-10"
    animate={{
      y: [-24, 24, -24]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }}
  />

  {/* Power Indicator */}
  <motion.div
    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5651e5] rounded-full"
    animate={{
      opacity: [0.5, 1, 0.5],
      boxShadow: [
        '0 0 2px #5651e5',
        '0 0 4px #5651e5',
        '0 0 2px #5651e5'
      ]
    }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
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