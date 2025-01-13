import React from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'values', label: 'Values' },
  { id: 'background', label: 'Background' },
  { id: 'references', label: 'Recommendations' },
  { id: 'contact', label: 'Contact' }
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className="w-full">
      <ul className="flex flex-col space-y-3">
        {tabs.map(tab => (
          <li key={tab.id}>
            <button
              onClick={() => onTabChange(tab.id)}
              className={`nav-link w-full text-left ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}