import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeechBubble = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0 }}
    animate={{ opacity: 1, y: -80, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    className="absolute top-4 right-1/2 z-[9999] max-w-[300px] min-w-[200px] -translate-x-1/2 rounded-xl border border-cyan-500/20 bg-white/95 px-4 py-2 text-center shadow-lg backdrop-blur-sm dark:border-violet-500/25 dark:bg-slate-900/95"
    style={{
      pointerEvents: 'none',
    }}
  >
    <div className="relative">
      <p className="whitespace-normal text-sm text-slate-800 dark:text-slate-100">{text}</p>
      <div
        className="absolute -bottom-2 left-1/2 z-[-1] h-4 w-4 -translate-x-1/2 rotate-45 bg-white dark:bg-slate-900"
        style={{ borderRight: '1px solid transparent', borderBottom: '1px solid transparent' }}
      />
    </div>
  </motion.div>
);

/** Layered SVG dog portrait — reads mouse direction for pupils, keeps prior interactions */
const FoxCharacter = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isSleeping, setIsSleeping] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  const [mood, setMood] = useState('excited');
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
  const bubbleTimeoutRef = useRef(null);
  const treatIdRef = useRef(0);

  const messages = [
    { count: 1, text: 'Hi there! I am Nahom’s pup sidekick! 🐕' },
    { count: 2, text: 'Want to learn about Nahom? Click the chat! 💬' },
    { count: 3, text: 'Hey, that tickles! 😄' },
    { count: 4, text: 'I know all about Nahom’s projects! 💻' },
    { count: 5, text: 'Stop poking me! 😅' },
    { count: 6, text: 'I can chat about his skills too! 🚀' },
    { count: 7, text: 'Okay okay, I am getting dizzy! 😵‍💫' },
    { count: 8, text: 'Seriously — the chat box is comfier! ➡️' },
    { count: 9, text: 'I have so much to tell you about Nahom! 🤖' },
    { count: 10, text: '*woof* Chat is the best way to talk! 📱' },
    { count: 11, text: 'Did you know Nahom had a 3.9 GPA? Ask in chat! 🎓' },
    { count: 12, text: 'I am running out of barks here! 😅' },
    { count: 13, text: 'The chat box is better for real conversation! 💭' },
    { count: 14, text: 'Click the chat icon — I’ll spill everything! 🗨️' },
    { count: 15, text: 'Alright, nap time if you do not chat! 😴' },
  ];

  const moveEyesAutonomously = useCallback(() => {
    const now = Date.now();
    if (now - lastMouseMove > 2000) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 3.5;
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    }
  }, [lastMouseMove]);

  const handleInteraction = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      const messageIndex = (newCount - 1) % messages.length;
      setBubbleText(messages[messageIndex].text);
      setShowBubble(true);

      if (newCount > 12) setMood('sleepy');
      else if (newCount > 8) setMood('surprised');
      else if (newCount > 4) setMood('excited');
      else setMood('happy');

      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      bubbleTimeoutRef.current = setTimeout(() => setShowBubble(false), 3000);

      if (newCount % 4 === 0) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 1000);
      }
      if (newCount % 7 === 0) setShowTreat(true);

      return newCount;
    });
  };

  useEffect(() => {
    let autonomousMovement;
    let winkInterval;

    const startIdleAnimation = () => {
      autonomousMovement = setInterval(moveEyesAutonomously, 1000);
      winkInterval = setInterval(() => {
        setIsWinking(true);
        setTimeout(() => setIsWinking(false), 280);
      }, 5000);
    };

    const handleMouseMove = (e) => {
      setLastMouseMove(Date.now());
      setIsSleeping(false);
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
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
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
      animationFrameRef.current = requestAnimationFrame(updateEyePosition);
    };

    idleTimerRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastMouseMove > 10000) setIsSleeping(true);
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
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [lastMouseMove, moveEyesAutonomously]);

  const pupilDx = eyePosition.x * 0.9;
  const pupilDy = eyePosition.y * 0.9;

  const mouthHappy = isHovering || mood === 'happy' || mood === 'excited';

  return (
    <motion.div
      ref={foxRef}
      className="z-[9999] flex w-full cursor-pointer items-center justify-center overflow-visible py-6"
      onHoverStart={() => {
        setIsHovering(true);
        setBubbleText('Hi! Click me or use the chat! 👋');
        setShowBubble(true);
      }}
      onHoverEnd={() => {
        setIsHovering(false);
        setShowBubble(false);
      }}
      onClick={handleInteraction}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <div className="relative">
        <AnimatePresence>{showBubble && <SpeechBubble text={bubbleText} />}</AnimatePresence>

        <motion.div
          className="relative h-40 w-40 md:h-44 md:w-44"
          animate={
            isJumping
              ? { y: [-18, 0], transition: { duration: 0.5, ease: 'easeOut' } }
              : isSleeping
                ? {
                    y: [0, -4, 0],
                    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                  }
                : {}
          }
        >
          {/* Soft ground glow */}
          <motion.div
            className="pointer-events-none absolute -bottom-2 left-1/2 -z-10 h-8 w-[85%] -translate-x-1/2 rounded-[100%] bg-amber-400/25 blur-md dark:bg-cyan-500/20"
            animate={{ opacity: [0.35, 0.55, 0.35], scaleX: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />

          <svg
            viewBox="0 0 200 200"
            className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
            role="img"
            aria-label="Interactive dog mascot that follows your cursor"
          >
            <defs>
              <linearGradient id="furMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b8743a" />
                <stop offset="45%" stopColor="#8b5220" />
                <stop offset="100%" stopColor="#5c3412" />
              </linearGradient>
              <linearGradient id="furLight" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#c9985c" />
                <stop offset="100%" stopColor="#8b5220" />
              </linearGradient>
              <linearGradient id="snoutGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#f3dcb8" />
                <stop offset="100%" stopColor="#d9b48a" />
              </linearGradient>
              <radialGradient id="cheekGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#e8a87c" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5220" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="noseShine" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#3d3d3d" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </radialGradient>
            </defs>

            {/* Tail */}
            <motion.g
              style={{ transformOrigin: '148px 168px' }}
              animate={
                isHovering || mood === 'excited' || mood === 'happy'
                  ? {
                      rotate: [-28, 28, -28],
                      transition: { duration: 0.45, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
                    }
                  : {
                      rotate: [-6, 6, -6],
                      transition: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                    }
              }
            >
              <path
                d="M 148 165 Q 175 140 188 118 Q 194 108 185 102 Q 178 98 172 108 Q 158 132 138 158 Z"
                fill="url(#furMain)"
                stroke="#4a2c10"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Left ear */}
            <motion.g
              style={{ transformOrigin: '58px 72px' }}
              animate={isHovering ? { rotate: [-6, 2, -6] } : { rotate: 0 }}
              transition={{
                duration: 1.1,
                repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M 58 72 Q 38 12 78 38 Q 88 52 82 78 Z"
                fill="url(#furLight)"
                stroke="#4a2c10"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
              <path d="M 56 58 Q 48 34 70 46 Q 74 56 68 72" fill="#d4a09a" opacity="0.85" />
            </motion.g>

            {/* Right ear */}
            <motion.g
              style={{ transformOrigin: '142px 72px' }}
              animate={isHovering ? { rotate: [6, -2, 6] } : { rotate: 0 }}
              transition={{
                duration: 1.1,
                repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M 142 72 Q 162 12 122 38 Q 112 52 118 78 Z"
                fill="url(#furLight)"
                stroke="#4a2c10"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
              <path d="M 144 58 Q 152 34 130 46 Q 126 56 132 72" fill="#d4a09a" opacity="0.85" />
            </motion.g>

            {/* Head + neck */}
            <ellipse cx="100" cy="108" rx="76" ry="72" fill="url(#furMain)" stroke="#4a2c10" strokeWidth="1.2" />
            <ellipse cx="100" cy="118" rx="62" ry="58" fill="url(#cheekGlow)" opacity="0.9" />

            {/* Snout */}
            <ellipse cx="100" cy="134" rx="44" ry="32" fill="url(#snoutGrad)" stroke="#a67c52" strokeWidth="0.8" />

            {/* Nose */}
            <ellipse cx="100" cy="120" rx="15" ry="11" fill="url(#noseShine)" />
            <ellipse cx="96" cy="122" rx="2.2" ry="1.6" fill="#000" opacity="0.55" />
            <ellipse cx="104" cy="122" rx="2.2" ry="1.6" fill="#000" opacity="0.55" />
            <ellipse cx="94" cy="116" rx="4" ry="2.5" fill="#fff" opacity="0.12" />

            {/* Whiskers */}
            <g stroke="#4a2c10" strokeWidth="0.6" strokeLinecap="round" opacity="0.45">
              <line x1="58" y1="128" x2="28" y2="124" />
              <line x1="56" y1="136" x2="26" y2="136" />
              <line x1="58" y1="144" x2="30" y2="148" />
              <line x1="142" y1="128" x2="172" y2="124" />
              <line x1="144" y1="136" x2="174" y2="136" />
              <line x1="142" y1="144" x2="170" y2="148" />
            </g>

            {/* Eyes — left (stays open while winking) */}
            <g transform="translate(72, 90)">
              {isSleeping ? (
                <path
                  d="M -14 0 Q 0 -5 14 0"
                  fill="none"
                  stroke="#2d1a0a"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <ellipse cx="0" cy="2" rx="16" ry="18" fill="#fefefe" stroke="#c5b89a" strokeWidth="0.6" />
                  <g transform={`translate(${pupilDx}, ${pupilDy})`}>
                    <ellipse cx="0" cy="2" rx="9" ry="10" fill="#3d2914" />
                    <ellipse cx="-3" cy="-1" rx="3" ry="3.5" fill="#0a0603" opacity="0.55" />
                    <ellipse cx="3" cy="-2" rx="2.2" ry="2.2" fill="#fff" opacity="0.9" />
                  </g>
                </>
              )}
            </g>

            {/* Eyes — right (winks closed) */}
            <g transform="translate(128, 90)">
              {isSleeping || isWinking ? (
                <path
                  d="M -14 0 Q 0 -5 14 0"
                  fill="none"
                  stroke="#2d1a0a"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <ellipse cx="0" cy="2" rx="16" ry="18" fill="#fefefe" stroke="#c5b89a" strokeWidth="0.6" />
                  <g transform={`translate(${pupilDx}, ${pupilDy})`}>
                    <ellipse cx="0" cy="2" rx="9" ry="10" fill="#3d2914" />
                    <ellipse cx="-3" cy="-1" rx="3" ry="3.5" fill="#0a0603" opacity="0.55" />
                    <ellipse cx="3" cy="-2" rx="2.2" ry="2.2" fill="#fff" opacity="0.9" />
                  </g>
                </>
              )}
            </g>

            {/* Mouth */}
            {mouthHappy ? (
              <path
                d="M 76 150 Q 100 172 124 150"
                fill="none"
                stroke="#3d2914"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ) : mood === 'surprised' ? (
              <ellipse cx="100" cy="154" rx="8" ry="10" fill="#2a1810" opacity="0.25" />
            ) : (
              <path
                d="M 88 154 L 112 154"
                fill="none"
                stroke="#3d2914"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}

            {/* Subtle fur texture */}
            <g opacity="0.12" stroke="#fff" strokeWidth="0.5" strokeLinecap="round">
              <path d="M 48 100 Q 52 92 56 100" fill="none" />
              <path d="M 144 100 Q 148 92 152 100" fill="none" />
              <path d="M 100 48 Q 104 40 108 48" fill="none" />
            </g>
          </svg>

          <AnimatePresence>
            {showTreat && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: [-20, 0], rotate: [0, 360] }}
                exit={{ opacity: 0, y: 20 }}
                onAnimationComplete={() => {
                  setShowTreat(false);
                  treatIdRef.current += 1;
                  setTreats((prev) => [...prev, { id: treatIdRef.current }]);
                }}
                className="absolute -top-10 left-1/2 -translate-x-1/2"
              >
                <span className="text-2xl">🍪</span>
              </motion.div>
            )}
          </AnimatePresence>

          {isJumping && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0, y: [0, 20] }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
              <div className="flex space-x-1">
                {[
                  { id: 'j0', i: 0 },
                  { id: 'j1', i: 1 },
                  { id: 'j2', i: 2 },
                  { id: 'j3', i: 3 },
                  { id: 'j4', i: 4 },
                ].map(({ id, i }) => (
                  <motion.span
                    key={id}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                      x: (i - 2) * 10,
                      y: (i % 3) * 8 + 4,
                    }}
                    className="text-xl text-amber-400"
                  >
                    ✨
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {showEmoji && (
            <span className="absolute -right-2 -top-2 text-2xl" aria-hidden>
              💛
            </span>
          )}

          <div className="absolute -bottom-6 left-0 flex gap-1">
            {treats.map((treat) => (
              <motion.span
                key={treat.id}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm"
              >
                🦴
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FoxCharacter;