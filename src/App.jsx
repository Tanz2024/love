import React, { useState, useRef } from 'react';
import './App.css';
import '@fontsource/shadows-into-light';
import Letter from './components/Letter';
import Music from './components/Music';
import Hearts from './components/Hearts';
import Gallery from './components/Gallery';
import BokehBg from './components/BokehBg';
import BirthdaySurprise from './components/BirthdaySurprise';

function App() {
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const introCardRef = useRef(null);

  // Handler to reveal background content and fade out intro card
  const handleReveal = () => {
    setBackgroundVisible(true);
    if (introCardRef.current) {
      introCardRef.current.style.opacity = 0;
      setTimeout(() => {
        if (introCardRef.current) introCardRef.current.style.display = 'none';
      }, 600);
    }
  };

  // Share button handler
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Happy Birthday, Wafa!",
          text: "A special birthday letter for you 💖",
          url: window.location.href
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      alert("Sharing is not supported on this device/browser.");
    }
  };

  return (
    <div className="app-bg">
      {/* Always render background first for reliability */}
      <BokehBg />
      <Hearts />
      {/* Intro card overlay */}
      {!backgroundVisible && (
        <div className="intro-card" ref={introCardRef} style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'radial-gradient(circle at 60% 40%, #f8e1e7 0%, #e0c3fc 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 10}} onClick={handleReveal}>
          <BirthdaySurprise onClose={handleReveal} />
        </div>
      )}
      {/* All background content */}
      <div id="background-content" style={{ opacity: backgroundVisible ? 1 : 0, pointerEvents: backgroundVisible ? 'auto' : 'none' }}>
        <div className="scroll-down-arrow">↓</div>
        <div className="container">
          <h1 className="title">for you</h1>
          <Letter />
          <div className="signature">love you</div>
          <Music />
          <Gallery />
        </div>
        {/* Share button, only visible when background is shown */}
        {backgroundVisible && (
          <button className="share-btn" onClick={handleShare} aria-label="Share this birthday letter">
            <span role="img" aria-label="Share">🔗</span> Share
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
