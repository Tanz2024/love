import React, { useEffect, useRef } from 'react';

export default function BokehBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let circles = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    function Circle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = 30 + Math.random() * 60;
      this.alpha = 0.08 + Math.random() * 0.12;
      this.color = `rgba(176,123,172,${this.alpha})`;
      this.speed = 0.1 + Math.random() * 0.2;
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (circles.length < 18 && Math.random() < 0.1) circles.push(new Circle());
      circles.forEach((c) => {
        c.y -= c.speed;
        if (c.y + c.radius < 0) {
          c.x = Math.random() * canvas.width;
          c.y = canvas.height + c.radius;
        }
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="bokeh-bg" />
  );
}
