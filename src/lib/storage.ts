import { CaseStudy } from '../types/caseStudy';

export const StorageKeys = {
  CASE_STUDIES: 'case_studies'
} as const;

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from storage:`, error);
    return fallback;
  }
}