import React, { useEffect, useState, useRef } from 'react';
import { FaCode } from 'react-icons/fa';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      // Increase smoothing factor for faster response (0.15 -> 0.35)
      const smoothing = 0.35;

      // Update cursor position with lerp
      cursorRef.current.x = lerp(cursorRef.current.x, mouseRef.current.x, smoothing);
      cursorRef.current.y = lerp(cursorRef.current.y, mouseRef.current.y, smoothing);

      // Reduce threshold for more frequent updates (0.01 -> 0.001)
      const dx = Math.abs(cursorRef.current.x - position.x);
      const dy = Math.abs(cursorRef.current.y - position.y);
      
      if (dx > 0.001 || dy > 0.001) {
        setPosition({
          x: cursorRef.current.x,
          y: cursorRef.current.y
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };

      // Initialize cursor position on first move
      if (cursorRef.current.x === 0) {
        cursorRef.current = {
          x: e.clientX,
          y: e.clientY
        };
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsVisible(false);
    };

    // Handle visibility when tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        // Reset positions when becoming visible
        if (mouseRef.current.x) {
          cursorRef.current = { ...mouseRef.current };
          setPosition({ ...mouseRef.current });
        }
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ease-out hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        willChange: 'transform',
      }}
    >
      <div
        className={`relative transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
      >
        {/* Main circle */}
        <div
          className={`w-8 h-8 rounded-full bg-[#5651e5] shadow-lg transition-all duration-300 ${
            isHovering ? 'bg-opacity-80' : 'bg-opacity-100'
          }`}
        >
          {/* Inner circle */}
          <div
            className={`absolute inset-0 m-1 rounded-full bg-white transition-all duration-300 ${
              isHovering ? 'scale-75' : 'scale-100'
            }`}
          >
            {/* Icon */}
            <div
              className={`absolute inset-0 flex items-center justify-center text-[#5651e5] transition-all duration-300 ${
                isHovering ? 'scale-125' : 'scale-100'
              }`}
            >
              <FaCode className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Trail effect */}
        <div
          className={`absolute inset-0 rounded-full bg-[#5651e5] blur-sm transition-all duration-300 ${
            isHovering ? 'scale-150 opacity-30' : 'scale-100 opacity-20'
          }`}
        />
      </div>
    </div>
  );
};

export default MouseFollower;