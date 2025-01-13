import React from 'react';
import { CaseStudy } from '../../data/caseStudies';

interface CaseStudySelectorProps {
  studies: Record<string, CaseStudy>;
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function CaseStudySelector({ studies, selectedId, onSelect }: CaseStudySelectorProps) {
  return (
    <select
      value={selectedId}
      onChange={(e) => onSelect(e.target.value)}
      className="form-input max-w-xs"
    >
      <option value="">Select a case study</option>
      {Object.entries(studies).map(([id, study]) => (
        <option key={id} value={id}>
          {study.title}
        </option>
      ))}
    </select>
  );
}