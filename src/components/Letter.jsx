import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const letterText = `hey happy birthday i dont really know how to write this the right way but i just want you to know you mean more to me than i ever say out loud sometimes i look at you and i think how did someone like you end up with someone like me youre the calm when my mind is loud the smile when my day is dull the one person who makes everything feel okay even when its not i know im not perfect i mess up i say the wrong things but i never stop caring never stop thinking about you never stop loving you in my own quiet way i hope today makes you feel special not just because its your birthday but because you really are youre rare youre real youre everything thank you for staying for laughing with me for trusting me with your heart i dont need anything else just you happy birthday again i love you always `;

// Helper to highlight short phrases
function highlightPhrases(text) {
  return text
    .replace(/happy birthday(?! again)/i, '<span class="great-vibes">happy birthday</span>')
    .replace(/happy birthday again/i, '<span class="great-vibes">happy birthday again</span>')
    .replace(/i love you/i, '<span class="great-vibes">i love you</span>')
    .replace(/always me/i, '<span class="great-vibes">always, me</span>');
}

export default function Letter() {
  const [displayed, setDisplayed] = useState('');
  const [html, setHtml] = useState('');
  const i = useRef(0);
  const letterRef = useRef(null);

  useEffect(() => {
    setDisplayed('');
    setHtml('');
    i.current = 0;
    function typeWriter() {
      if (i.current < letterText.length) {
        const next = letterText.slice(0, i.current + 1);
        setDisplayed(next);
        setHtml(highlightPhrases(next));
        i.current++;
        setTimeout(typeWriter, 24);
      }
    }
    setTimeout(typeWriter, 600);
    if (letterRef.current) {
      letterRef.current.classList.add('fade-in');
    }
  }, []);

  return (
    <div
      className="letter fade-in"
      ref={letterRef}
      style={{
        fontFamily: 'Shadows Into Light, Dancing Script, cursive',
        lineHeight: 1.8,
        letterSpacing: '0.01em',
        fontSize: '1.18rem',
        textAlign: 'center',
        whiteSpace: 'pre-line',
        margin: '0 auto',
        maxWidth: 380,
        padding: '0 0.5rem',
        animation: 'fadeIn 2s ease-out',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
