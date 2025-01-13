import React from 'react';

const values = [
  {
    title: "Human-Centered",
    description: "Every decision starts with understanding the people we're designing for."
  },
  {
    title: "Simplicity",
    description: "Removing complexity to create clear, intuitive experiences."
  },
  {
    title: "Impact",
    description: "Focusing on solutions that create meaningful change."
  },
  {
    title: "Collaboration",
    description: "Working together to achieve the best possible outcomes."
  }
];

export default function Values() {
  return (
    <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-light mb-12">Design Values</h2>
      <div className="space-y-16">
        {values.map((value, index) => (
          <div key={index} className="group">
            <h3 className="text-2xl font-medium mb-4">{value.title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}