import { supabase } from './supabase';
import { getFromStorage, StorageKeys } from './storage';
import { CaseStudy } from '../types/caseStudy';
import toast from 'react-hot-toast';

interface StoredImage {
  id: string;
  data: string;
  timestamp: number;
}

export async function migrateToSupabase() {
  try {
    // Start migration
    toast.loading('Starting data migration...');

    // 1. Migrate images
    const IMAGE_STORAGE_KEY = 'case_study_images';
    const storedImages = JSON.parse(localStorage.getItem(IMAGE_STORAGE_KEY) || '[]') as StoredImage[];
    
    for (const image of storedImages) {
      const { error: imageError } = await supabase
        .from('images')
        .upsert({
          image_id: image.id,
          data: image.data
        });

      if (imageError) throw imageError;
    }

    // 2. Migrate case studies
    const studies = getFromStorage<Record<string, CaseStudy>>(StorageKeys.CASE_STUDIES, {});
    
    for (const [id, study] of Object.entries(studies)) {
      // Insert case study
      const { error: studyError } = await supabase
        .from('case_studies')
        .upsert({
          id: study.id,
          title: study.title,
          client: study.client,
          year: study.year,
          role: study.role,
          duration: study.duration,
          team: study.team,
          challenge: study.challenge,
          solution: study.solution,
          impact: study.impact,
          thumbnail_image: study.thumbnailImage
        });

      if (studyError) throw studyError;

      // Insert phases
      if (study.process) {
        const phases = study.process.map((phase, index) => ({
          case_study_id: study.id,
          title: phase.title,
          description: phase.description,
          image: phase.image,
          order: index
        }));

        const { error: phasesError } = await supabase
          .from('case_study_phases')
          .upsert(phases);

        if (phasesError) throw phasesError;
      }
    }

    // Success!
    toast.success('Data migration completed successfully!');

    // Clear localStorage after successful migration
    localStorage.clear();
  } catch (error) {
    console.error('Migration error:', error);
    toast.error('Migration failed. Please try again.');
    throw error;
  }
}