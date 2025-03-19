import React, { useEffect, useState, useRef } from 'react';
import { FaCode } from 'react-icons/fa';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationFrameRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const animate = () => {
      // Get current mouse position
      const targetX = mousePositionRef.current.x;
      const targetY = mousePositionRef.current.y;

      // Calculate distance to target
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Apply spring physics for smoother movement
      const spring = 0.15; // Lower value = smoother movement
      const damping = 0.8; // Lower value = more damping

      // Update velocity
      velocityX += dx * spring;
      velocityY += dy * spring;

      // Apply damping
      velocityX *= damping;
      velocityY *= damping;

      // Update position
      currentX += velocityX;
      currentY += velocityY;

      // Update position state
      setPosition({
        x: currentX,
        y: currentY,
      });

      lastPositionRef.current = { x: currentX, y: currentY };
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      // Update mouse position reference
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      setIsVisible(true);
      // Set initial position to current mouse position
      currentX = mousePositionRef.current.x;
      currentY = mousePositionRef.current.y;
      setPosition({ x: currentX, y: currentY });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsVisible(false);
    };

    // Handle visibility when tab switching
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      if (!document.hidden) {
        // Reset position when tab becomes visible
        currentX = mousePositionRef.current.x;
        currentY = mousePositionRef.current.y;
        setPosition({ x: currentX, y: currentY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ease-out ${
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