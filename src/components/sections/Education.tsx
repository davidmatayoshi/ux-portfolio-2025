import React from 'react';
import { education } from '../../data/education';

export default function Education() {
  return (
    <section>
      <h3 className="text-2xl mb-10">Education</h3>
      <div className="space-y-12">
        {education.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-3">
              <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">{edu.school}</h4>
              {edu.year && <span className="text-gray-400 text-sm">{edu.year}</span>}
            </div>
            <div className="space-y-1">
              {edu.degrees.map((degree, degIndex) => (
                <p key={degIndex} className="text-gray-600 text-lg leading-relaxed">
                  {degree}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}