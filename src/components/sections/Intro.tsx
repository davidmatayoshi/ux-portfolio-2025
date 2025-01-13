import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const headlines = {
  'For anyone': "Hi there, I'm a designer. I make beautiful things that make life better for people.",
  'Recruiters': "A hands-on UX and product design leader known for creating impactful, user-centered solutions that drive measurable results.",
  'Design Directors': "Bringing strategic thinking and creative excellence to every project.",
  'Product Designers': "Empowering design teams with frameworks and mentorship to create scalable, high-quality experiences.",
  'Product Managers': "Bridging user needs with business goals through design innovation.",
  'Engineers': "Systems thinker, creating developer-friendly designs with technical feasibility in mind.",
  'Executives': "Driving business growth through strategic design leadership and building design strategies that scale, from MVP to market-leading products."
};

export default function Intro() {
  const { theme } = useTheme();
  const [activeAudience, setActiveAudience] = useState('For anyone');

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex-1 pt-24">
        <div className="space-y-36">
          <div className="space-y-8">
            <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
              <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-4 min-w-max pb-4 max-w-[100vw]">
                  {Object.keys(headlines).map((audience) => (
                    <button
                      key={audience}
                      onClick={() => setActiveAudience(audience)}
                      className={`audience-tag whitespace-nowrap ${
                        activeAudience === audience 
                          ? theme === 'dark' ? 'text-white' : 'text-black' 
                          : ''
                      }`}
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <h2 className="headline">
                {headlines[activeAudience as keyof typeof headlines]}
              </h2>
            </div>
          </div>

          <img 
            src="/images/about.me.grid.png" 
            alt="career highlights"
            className="w-full h-auto max-w-3xl"
          />
        </div>
      </div>
    </div>
  );
}