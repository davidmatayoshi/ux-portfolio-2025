import React from 'react';
import { CaseStudy } from '../../types/caseStudy';

interface CaseStudyPreviewProps {
  data: CaseStudy;
}

export default function CaseStudyPreview({ data }: CaseStudyPreviewProps) {
  const impact = data.impact || [];
  const process = data.process || [];

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-light mb-8">Preview</h2>
      
      <article className="space-y-12">
        <header className="space-y-8">
          <h1 className="text-4xl font-light">{data.title || ''}</h1>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Client</h3>
              <p>{data.client || ''}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Role</h3>
              <p>{data.role || ''}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Duration</h3>
              <p>{data.duration || ''}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Team</h3>
              <p>{data.team || ''}</p>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-light">Challenge</h2>
          <div 
            className="text-gray-600 prose"
            dangerouslySetInnerHTML={{ __html: data.challenge || '' }}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light">Solution</h2>
          <div 
            className="text-gray-600 prose"
            dangerouslySetInnerHTML={{ __html: data.solution || '' }}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-light">Impact</h2>
          <ul className="space-y-2">
            {impact.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-light">Process</h2>
          {process.map((phase, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl">{phase.title || ''}</h3>
              {phase.image && (
                <img 
                  src={phase.image} 
                  alt={phase.title || 'Process phase'}
                  className="w-full aspect-video object-cover"
                />
              )}
              <div 
                className="text-gray-600 prose"
                dangerouslySetInnerHTML={{ __html: phase.description || '' }}
              />
            </div>
          ))}
        </section>
      </article>
    </div>
  );
}