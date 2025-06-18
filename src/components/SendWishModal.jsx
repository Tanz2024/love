import React, { useState } from 'react';

export default function SendWishModal({ open, onClose }) {
  const [wish, setWish] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (wish.trim()) {
      setSent(true);
      setTimeout(() => {
        setWish('');
        setSent(false);
        onClose();
      }, 1800);
    }
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(176,123,172,0.18)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.5s',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px #b07bac33',
        padding: 28,
        minWidth: 260,
        maxWidth: '90vw',
        textAlign: 'center',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{position: 'absolute', top: 10, right: 14, background: 'none', border: 'none', fontSize: 22, color: '#b07bac', cursor: 'pointer'}}>×</button>
        <div style={{fontFamily: 'Great Vibes, cursive', fontSize: 28, color: '#b07bac', marginBottom: 12}}>Send a Wish</div>
        {sent ? (
          <div style={{color: '#b07bac', fontFamily: 'Shadows Into Light, cursive', fontSize: 18, marginTop: 18}}>🎉 Wish sent! 🎉</div>
        ) : (
          <>
            <textarea
              value={wish}
              onChange={e => setWish(e.target.value)}
              placeholder="Write your wish..."
              style={{width: '100%', minHeight: 60, borderRadius: 8, border: '1.5px solid #e0c3fc', padding: 10, fontFamily: 'Shadows Into Light, cursive', fontSize: 16, marginBottom: 12, resize: 'none'}}
            />
            <button
              onClick={handleSend}
              style={{borderRadius: 8, border: 'none', background: '#b07bac', color: '#fff', padding: '7px 20px', fontFamily: 'inherit', fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px #b07bac33'}}
            >
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
}
