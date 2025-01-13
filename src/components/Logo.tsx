import React, { useState, useEffect } from 'react';

export default function Logo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const letters = ['D','A','V','I','D','\u00A0','\u00A0','M','A','T','A','Y','O','S','H','I'];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <h1 className="text-xl font-bold mb-16 cursor-pointer whitespace-nowrap text-gray-600">
      <div className="inline-flex overflow-hidden">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="transition-all duration-700 ease-in-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(-100%)',
              width: 'auto',
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </h1>
  );
}