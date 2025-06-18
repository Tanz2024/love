import React, { useEffect, useRef, useState } from 'react';

export default function BirthdaySurprise({ onClose, overlayActive }) {
  const [showCake, setShowCake] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    // Play music on overlay show
    if (showCake && audioRef.current && !audioPlayed) {
      const playAudio = () => {
        audioRef.current.volume = 0.22;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setAudioPlayed(true)).catch(() => {
            // If autoplay is blocked, play on first user interaction
            const resume = () => {
              audioRef.current.play();
              setAudioPlayed(true);
              window.removeEventListener('click', resume);
              window.removeEventListener('touchstart', resume);
            };
            window.addEventListener('click', resume);
            window.addEventListener('touchstart', resume);
          });
        }
      };
      playAudio();
    }
  }, [showCake, audioPlayed]);

  useEffect(() => {
    // Dynamically load canvas-confetti
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f8e1e7', '#b07bac', '#e0c3fc', '#fff6f9', '#ffb347'],
      });
    });
    // Progress bar and auto-hide
    let t = 0;
    const interval = setInterval(() => {
      t += 100;
      setProgress((t / 3500) * 100);
      if (t >= 3500) {
        setShowCake(false);
        if (onClose) onClose();
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [onClose]);

  const handleClick = () => {
    setShowCake(false);
    if (onClose) onClose();
  };

  if (!showCake) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'radial-gradient(circle at 60% 40%, #f8e1e7 0%, #e0c3fc 100%)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      transition: 'opacity 0.7s',
      animation: 'fadeIn 1.2s',
      overflow: 'hidden',
      pointerEvents: 'auto',
    }} onClick={handleClick}>
      <audio ref={audioRef} src="/bdaymusic.mp3" preload="auto" />
      {/* Animated bokeh dots */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 32 + Math.random() * 32,
            height: 32 + Math.random() * 32,
            background: 'rgba(255,255,255,0.13)',
            borderRadius: '50%',
            filter: 'blur(2.5px)',
            animation: `bokehMove 3.5s linear ${i * 0.2}s infinite alternate`,
          }} />
        ))}
      </div>
      <div style={{ maxWidth: 340, width: '90vw', zIndex: 2, boxShadow: '0 8px 32px #b07bac33', borderRadius: 22, background: 'rgba(255,255,255,0.92)', padding: 18, border: '2.5px solid #b07bac' }}>
        <img
          src="/wafaandtanzim.png"
          alt="wafaandtanzim birthday surprise"
          style={{ width: '100%', height: 220, objectFit: 'contain', border: 'none', background: 'none', borderRadius: 18, boxShadow: '0 4px 24px #b07bac22', marginBottom: 12 }}
        />
        <div style={{
          fontFamily: 'Great Vibes, cursive',
          fontSize: 36,
          color: '#b07bac',
          marginTop: 8,
          marginBottom: 8,
          textShadow: '0 2px 12px #e0c3fc88',
          animation: 'popText 1.2s',
        }}>
          Happy Birthday!
        </div>
        <div style={{
          width: '100%',
          height: 7,
          background: '#e0c3fc44',
          borderRadius: 6,
          overflow: 'hidden',
          margin: '10px 0 0 0',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #b07bac 0%, #f8e1e7 100%)',
            borderRadius: 6,
            transition: 'width 0.2s',
          }} />
        </div>
        <div style={{
          fontFamily: 'Shadows Into Light, cursive',
          color: '#b07bac',
          fontSize: 17,
          marginTop: 18,
          opacity: 0.85,
          fontWeight: 600,
          background: 'rgba(255,255,255,0.7)',
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: '0 2px 8px #e0c3fc33',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}>
          Tap anywhere to start the birthday music and reveal your surprise!
        </div>
      </div>
      <style>{`
        @keyframes bokehMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
        @keyframes popText {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 600px) {
          img[alt="wafaandtanzim birthday surprise"] { height: 120px !important; }
          div[style*="font-size: 36px"] { font-size: 24px !important; }
        }
      `}</style>
    </div>
  );
}
