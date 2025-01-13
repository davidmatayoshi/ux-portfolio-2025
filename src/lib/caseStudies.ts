import { supabase, isConnected } from './supabase';
import { CaseStudy } from '../types/caseStudy';
import toast from 'react-hot-toast';

export async function loadAllCaseStudies(): Promise<Record<string, CaseStudy>> {
  // Return empty object if Supabase is not connected
  if (!isConnected()) {
    return {};
  }

  try {
    // Fetch case studies
    const { data: studies, error: studiesError } = await supabase
      .from('case_studies')
      .select('*');
    
    if (studiesError) {
      console.error('Error fetching studies:', studiesError);
      throw studiesError;
    }

    // Fetch phases for all studies
    const { data: phases, error: phasesError } = await supabase
      .from('case_study_phases')
      .select('*')
      .order('order');
    
    if (phasesError) {
      console.error('Error fetching phases:', phasesError);
      throw phasesError;
    }

    // Combine the data
    const result: Record<string, CaseStudy> = {};
    
    for (const study of studies) {
      result[study.id] = {
        ...study,
        process: phases
          .filter(phase => phase.case_study_id === study.id)
          .map(phase => ({
            title: phase.title || '',
            description: phase.description || '',
            image: phase.image || ''
          }))
      };
    }

    return result;
  } catch (error) {
    console.error('Error loading case studies:', error);
    return {};
  }
}

export async function saveCaseStudy(id: string, study: CaseStudy): Promise<void> {
  // Don't attempt to save if Supabase is not connected
  if (!isConnected()) {
    toast.error('Cannot save: Supabase is not connected');
    return;
  }

  try {
    // Save case study
    const { error: studyError } = await supabase
      .from('case_studies')
      .upsert({
        id,
        title: study.title || '',
        client: study.client || '',
        year: study.year || '',
        role: study.role || '',
        duration: study.duration || '',
        team: study.team || '',
        challenge: study.challenge || '',
        solution: study.solution || '',
        impact: study.impact || [],
        thumbnail_image: study.thumbnailImage || ''
      });

    if (studyError) throw studyError;

    // Delete existing phases
    const { error: deleteError } = await supabase
      .from('case_study_phases')
      .delete()
      .eq('case_study_id', id);

    if (deleteError) throw deleteError;

    // Insert new phases
    if (study.process && study.process.length > 0) {
      const phases = study.process.map((phase, index) => ({
        case_study_id: id,
        title: phase.title || '',
        description: phase.description || '',
        image: phase.image || '',
        order: index
      }));

      const { error: phasesError } = await supabase
        .from('case_study_phases')
        .insert(phases);

      if (phasesError) throw phasesError;
    }

    toast.success('Case study saved successfully');
  } catch (error) {
    console.error('Error saving case study:', error);
    toast.error('Failed to save case study');
    throw error;
  }
}