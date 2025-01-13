import { CaseStudy } from '../types/caseStudy';
import { loadAllCaseStudies } from '../lib/caseStudies';

// Get case studies from storage
export const caseStudies = loadAllCaseStudies();

// Function to get latest case studies
export function getLatestCaseStudies(): Record<string, CaseStudy> {
  return loadAllCaseStudies();
}