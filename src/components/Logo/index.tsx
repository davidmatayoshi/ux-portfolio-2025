import React from 'react';

const LOGO_LETTERS = ['D','A','V','I','D','\u00A0','\u00A0','M','A','T','A','Y','O','S','H','I'];

export default function Logo() {
  return (
    <h1 className="text-xl font-bold mb-16">
      {LOGO_LETTERS.map((letter, index) => (
        <span 
          key={index}
          className="inline-block"
          style={{
            marginRight: letter === '\u00A0' ? '0.5em' : '0.1em'
          }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}