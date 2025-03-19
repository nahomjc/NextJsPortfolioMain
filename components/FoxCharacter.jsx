import React, { useEffect, useState, useRef } from 'react';

const FoxCharacter = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const foxRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
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

      const distance = 4; // Increased distance for more noticeable movement
      const newPosition = {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };

      setEyePosition(newPosition);
      animationFrameRef.current = requestAnimationFrame(updateEyePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(updateEyePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={foxRef}
      className="w-full flex justify-center items-center py-8 pointer-events-none z-[9999] transition-all duration-300"
    >
      <div
        className={`relative transition-all duration-300 ${
          isHovering ? 'scale-110' : 'scale-100'
        }`}
      >
        {/* Fox Body */}
        <div className="w-32 h-32 relative">
          {/* Fox Head */}
          <div className="absolute inset-0 bg-orange-500 rounded-full shadow-lg">
            {/* Fox Ears */}
            <div className="absolute -top-4 left-6 w-8 h-12 bg-orange-500 rounded-t-full transform -rotate-12" />
            <div className="absolute -top-4 right-6 w-8 h-12 bg-orange-500 rounded-t-full transform rotate-12" />
            
            {/* Fox Face */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Fox Nose */}
              <div className="w-6 h-4 bg-black rounded-full mb-4" />
              
              {/* Fox Eyes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-8">
                {/* Left Eye */}
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 bg-white rounded-full" />
                  <div
                    className="absolute inset-1 bg-black rounded-full transition-transform duration-100"
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    }}
                  />
                </div>
                
                {/* Right Eye */}
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 bg-white rounded-full" />
                  <div
                    className="absolute inset-1 bg-black rounded-full transition-transform duration-100"
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trail effect */}
        <div
          className={`absolute inset-0 rounded-full bg-orange-500 blur-sm transition-all duration-300 ${
            isHovering ? 'scale-110 opacity-30' : 'scale-100 opacity-20'
          }`}
        />
      </div>
    </div>
  );
};

export default FoxCharacter; 