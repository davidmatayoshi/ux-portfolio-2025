import { useState, useCallback, useEffect } from 'react';
import { CaseStudy } from '../types/caseStudy';
import { loadAllCaseStudies, saveCaseStudy } from '../lib/caseStudies';
import toast from 'react-hot-toast';

export function useCaseStudies() {
  const [studies, setStudies] = useState<Record<string, CaseStudy>>({});
  const [currentStudy, setCurrentStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all case studies on mount
  useEffect(() => {
    async function loadStudies() {
      try {
        setLoading(true);
        const loadedStudies = await loadAllCaseStudies();
        setStudies(loadedStudies);
      } catch (err) {
        setError('Failed to load case studies');
        console.error('Error loading case studies:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStudies();
  }, []);

  // Save a case study
  const saveStudy = useCallback(async (id: string, study: CaseStudy) => {
    if (!id || !study) {
      toast.error('Invalid study data');
      return;
    }

    try {
      await saveCaseStudy(id, study);
      
      // Update local state
      setStudies(prev => ({
        ...prev,
        [id]: study
      }));
      
      toast.success('Case study saved successfully');
    } catch (error) {
      console.error('Error saving case study:', error);
      toast.error('Failed to save case study');
    }
  }, []);

  return {
    studies,
    currentStudy,
    setCurrentStudy,
    saveStudy,
    loading,
    error
  };
}