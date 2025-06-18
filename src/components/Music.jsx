import React, { useRef } from 'react';

export default function Music() {
  const iframeRef = useRef(null);
  const handleReplay = () => {
    if (iframeRef.current) {
      // Reload the iframe to replay
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
      <iframe
        ref={iframeRef}
        style={{
          borderRadius: 12,
          boxShadow: '0 2px 8px #e0c3fc33',
          width: '100%',
          maxWidth: 380,
          minHeight: 80,
          border: 0,
        }}
        src="https://open.spotify.com/embed/track/0T5iIrXA4p5GsubkhuBIKV?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        allowFullScreen
        title="Until I Found You by Stephen Sanchez"
      ></iframe>
      <button
        onClick={handleReplay}
        style={{
          marginTop: 8,
          borderRadius: 8,
          border: 'none',
          background: '#b07bac',
          color: '#fff',
          padding: '6px 18px',
          fontFamily: 'inherit',
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 1px 4px #b07bac33',
        }}
      >
        Replay music
      </button>
    </div>
  );
}
