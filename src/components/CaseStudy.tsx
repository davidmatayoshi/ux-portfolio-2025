import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CaseStudy as CaseStudyType } from '../types/caseStudy';

interface CaseStudyProps {
  id: string;
  onClose: () => void;
}

export function CaseStudy({ id, onClose }: CaseStudyProps) {
  const [study, setStudy] = useState<CaseStudyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseStudy();
  }, [id]);

  const loadCaseStudy = async () => {
    try {
      setLoading(true);
      
      const { data: caseStudy, error } = await supabase
        .from('case_studies')
        .select(`
          *,
          case_study_phases (
            title,
            description,
            image,
            "order"
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (caseStudy) {
        const processPhases = caseStudy.case_study_phases || [];
        processPhases.sort((a: any, b: any) => a.order - b.order);

        setStudy({
          ...caseStudy,
          process: processPhases.map((phase: any) => ({
            title: phase.title || '',
            description: phase.description || '',
            image: phase.image || ''
          }))
        });
      }
    } catch (error) {
      console.error('Error loading case study:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">Loading case study...</div>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">Case study not found</div>
      </div>
    );
  }

  return (
    <article className="space-y-24">
      <header className="space-y-12">
        <h1 className="text-5xl font-light">{study.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Client</h3>
            <p>{study.client}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Role</h3>
            <p>{study.role}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Duration</h3>
            <p>{study.duration}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Team</h3>
            <p>{study.team}</p>
          </div>
        </div>
      </header>

      <section className="space-y-8">
        <h2 className="text-3xl font-light">Challenge</h2>
        <div 
          className="text-xl text-gray-600 leading-relaxed prose"
          dangerouslySetInnerHTML={{ __html: study.challenge || '' }}
        />
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-light">Solution</h2>
        <div 
          className="text-xl text-gray-600 leading-relaxed prose"
          dangerouslySetInnerHTML={{ __html: study.solution || '' }}
        />
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-light">Impact</h2>
        <ul className="space-y-4">
          {study.impact.map((item, index) => (
            <li key={index} className="text-xl text-gray-600">{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-light">Process</h2>
        {study.process.map((phase, index) => (
          <div key={index} className="space-y-6">
            <h3 className="text-2xl">{phase.title}</h3>
            {phase.image && (
              <img 
                src={phase.image} 
                alt={phase.title}
                className="w-full max-w-[800px] aspect-[16/9] object-cover rounded-lg"
              />
            )}
            <div 
              className="text-xl text-gray-600 leading-relaxed prose"
              dangerouslySetInnerHTML={{ __html: phase.description || '' }}
            />
          </div>
        ))}
      </section>
    </article>
  );
}