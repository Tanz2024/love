import React from 'react';
import '../App.css';

const photos = [
  {
    src: '/wafa.jpg',
    caption: 'wafa (birthday girl)',
    border: '3px solid #f8e1e7',
    emoji: '🎂',
  },
  {
    src: '/Tanzim.jpg',
    caption: 'tanzim (me)',
    border: '3px solid #e0c3fc',
    emoji: '🎉',
  },
  {
    src: '/handtogether.jpg',
    caption: 'our hands together',
    border: '3px solid #b07bac',
    emoji: '🤝',
  },
];

export default function Gallery() {
  return (
    <div className="polaroid-gallery">
      {photos.map((photo, idx) => (
        <div
          className="polaroid"
          key={idx}
          style={{
            borderRadius: 16,
            boxShadow: '0 6px 24px rgba(176,123,172,0.22)',
            margin: '0 12px 20px 12px',
            transition: 'transform 0.18s, box-shadow 0.18s',
            border: photo.border,
            background: 'rgba(255,255,255,0.92)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span style={{
            position: 'absolute',
            top: 8,
            right: 12,
            fontSize: 24,
            opacity: 0.85,
            filter: 'drop-shadow(0 2px 6px #fff8)',
            zIndex: 2,
          }}>{photo.emoji}</span>
          <img
            src={photo.src}
            alt={photo.caption}
            style={{
              borderRadius: 14,
              boxShadow: '0 2px 12px #e0c3fc33',
              width: 120,
              height: 120,
              objectFit: 'cover',
              marginBottom: 10,
              marginTop: 8,
              border: '2px solid #fff',
              transition: 'transform 0.18s',
            }}
          />
          <div
            className="caption"
            style={{
              fontFamily: 'Dancing Script, cursive',
              color: '#b07bac',
              fontSize: 19,
              marginTop: 2,
              textShadow: '0 1px 6px #fff6',
              letterSpacing: '0.01em',
            }}
          >
            {photo.caption}
          </div>
        </div>
      ))}
    </div>
  );
}
