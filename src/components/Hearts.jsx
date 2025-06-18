import React, { useEffect, useRef } from 'react';

export default function Hearts() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let hearts = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    function Heart() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = 16 + Math.random() * 12;
      this.speed = 1 + Math.random() * 1.5;
      this.alpha = 0.5 + Math.random() * 0.5;
      this.color = `rgba(176,123,172,${this.alpha})`;
      this.tilt = Math.random() * Math.PI * 2;
    }
    Heart.prototype.draw = function() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.tilt);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = '#b07bac';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.07) hearts.push(new Heart());
      hearts.forEach((h) => {
        h.y -= h.speed;
        h.tilt += 0.01;
        h.draw();
      });
      hearts = hearts.filter(h => h.y > -40);
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
