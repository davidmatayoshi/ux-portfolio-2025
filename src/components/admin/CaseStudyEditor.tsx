import React, { useState, useEffect } from 'react';
import CaseStudyForm from './CaseStudyForm';
import CaseStudyPreview from './CaseStudyPreview';
import CaseStudySelector from './CaseStudySelector';
import { CaseStudy } from '../../types/caseStudy';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export default function CaseStudyEditor() {
  const [studies, setStudies] = useState<Record<string, CaseStudy>>({});
  const [currentStudy, setCurrentStudy] = useState<CaseStudy>({
    id: '',
    title: '',
    client: '',
    year: '',
    role: '',
    duration: '',
    team: '',
    challenge: '',
    solution: '',
    impact: [],
    process: [],
    thumbnailImage: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      const { data: studiesData, error } = await supabase
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
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (studiesData) {
        const formattedStudies: Record<string, CaseStudy> = {};
        
        studiesData.forEach(study => {
          const processPhases = study.case_study_phases || [];
          processPhases.sort((a: any, b: any) => a.order - b.order);

          formattedStudies[study.id] = {
            id: study.id,
            title: study.title || '',
            client: study.client || '',
            year: study.year || '',
            role: study.role || '',
            duration: study.duration || '',
            team: study.team || '',
            challenge: study.challenge || '',
            solution: study.solution || '',
            impact: study.impact || [],
            thumbnailImage: study.thumbnail_image || '',
            process: processPhases.map((phase: any) => ({
              title: phase.title || '',
              description: phase.description || '',
              image: phase.image || ''
            }))
          };
        });

        setStudies(formattedStudies);
        
        // Set the first study as current if none selected
        if (!currentStudy.id && studiesData.length > 0) {
          setCurrentStudy(formattedStudies[studiesData[0].id]);
        }
      }
    } catch (error) {
      console.error('Error loading case studies:', error);
      toast.error('Failed to load case studies');
    } finally {
      setLoading(false);
    }
  };

  const handleStudySelect = (id: string) => {
    if (studies[id]) {
      setCurrentStudy(studies[id]);
    }
  };

  const handleNewStudy = () => {
    setCurrentStudy({
      id: '',
      title: '',
      client: '',
      year: '',
      role: '',
      duration: '',
      team: '',
      challenge: '',
      solution: '',
      impact: [],
      process: [],
      thumbnailImage: ''
    });
  };

  const handleSave = async () => {
    try {
      if (!currentStudy.title) {
        toast.error('Please enter a title');
        return;
      }

      // Generate ID from title if not exists
      const id = currentStudy.id || currentStudy.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Save case study
      const { error: studyError } = await supabase
        .from('case_studies')
        .upsert({
          id,
          title: currentStudy.title,
          client: currentStudy.client,
          year: currentStudy.year,
          role: currentStudy.role,
          duration: currentStudy.duration,
          team: currentStudy.team,
          challenge: currentStudy.challenge,
          solution: currentStudy.solution,
          impact: currentStudy.impact,
          thumbnail_image: currentStudy.thumbnailImage
        });

      if (studyError) throw studyError;

      // Delete existing phases
      const { error: deleteError } = await supabase
        .from('case_study_phases')
        .delete()
        .eq('case_study_id', id);

      if (deleteError) throw deleteError;

      // Insert new phases
      if (currentStudy.process && currentStudy.process.length > 0) {
        const phases = currentStudy.process.map((phase, index) => ({
          case_study_id: id,
          title: phase.title,
          description: phase.description,
          image: phase.image,
          order: index
        }));

        const { error: phasesError } = await supabase
          .from('case_study_phases')
          .insert(phases);

        if (phasesError) throw phasesError;
      }

      // Update local state
      setStudies(prev => ({
        ...prev,
        [id]: { ...currentStudy, id }
      }));
      setCurrentStudy(prev => ({ ...prev, id }));

      toast.success('Case study saved successfully!');
    } catch (error) {
      console.error('Error saving case study:', error);
      toast.error('Failed to save case study');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto p-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-light">Edit Case Study</h2>
          <div className="flex items-center gap-4">
            <CaseStudySelector 
              studies={studies}
              selectedId={currentStudy.id}
              onSelect={handleStudySelect}
            />
            <button 
              onClick={handleNewStudy}
              className="btn-secondary"
            >
              New Case Study
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <CaseStudyForm 
              data={currentStudy} 
              onChange={setCurrentStudy}
              onSave={handleSave}
              lastSaved={null}
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <CaseStudyPreview data={currentStudy} />
          </div>
        </div>
      </div>
    </div>
  );
}