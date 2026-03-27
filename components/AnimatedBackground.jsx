import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lines = [];
    const mouse = { x: null, y: null, radius: 120 };

    const palette = {
      line: ['rgba(34, 211, 238, ', 'rgba(139, 92, 246, ', 'rgba(232, 121, 249, '],
      hot: 'rgba(34, 211, 238, 0.55)',
      link: (a) => `rgba(34, 211, 238, ${a})`,
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const trackMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', trackMouse);
    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Line {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 90 + 40;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.018 + 0.008;
        const channel = palette.line[Math.floor(Math.random() * palette.line.length)];
        const alpha = Math.random() * 0.22 + 0.08;
        this.color = `${channel}${alpha})`;
        this.originalColor = this.color;
      }

      update() {
        this.angle += this.speed;
        this.x += Math.cos(this.angle) * 0.45;
        this.y += Math.sin(this.angle) * 0.45;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 2.2;
            this.y -= Math.sin(angle) * 2.2;
            this.color = palette.hot;
          } else {
            this.color = this.originalColor;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    const createLines = () => {
      lines = [];
      const count = Math.min(64, Math.floor((canvas.width * canvas.height) / 18000));
      for (let i = 0; i < Math.max(42, count); i++) {
        lines.push(new Line());
      }
    };
    createLines();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line1, i) => {
        lines.slice(i + 1).forEach((line2) => {
          const dx = line1.x - line2.x;
          const dy = line1.y - line2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            const opacity = 0.18 * (1 - distance / 140);
            ctx.strokeStyle = palette.link(opacity);
            ctx.lineWidth = 0.5;
            ctx.moveTo(line1.x, line1.y);
            ctx.lineTo(line2.x, line2.y);
            ctx.stroke();
          }
        });
      });

      lines.forEach((line) => {
        line.update();
        line.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', trackMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto fixed inset-0 -z-10 h-full w-full"
      style={{ background: 'transparent' }}
      aria-hidden
    />
  );
};

export default AnimatedBackground;
