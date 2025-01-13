import React, { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getProjects } from '../../data/projects';
import { Project } from '../../types/project';
import { isConnected } from '../../lib/supabase';

interface WorkProps {
  onCaseStudyClick: (id: string) => void;
}

export default function Work({ onCaseStudyClick }: WorkProps) {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Error is handled gracefully by returning fallback projects in getProjects()
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('list');
      } else {
        setViewMode('grid');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderDescription = (description: string) => {
    // Remove any HTML tags and trim the text
    const cleanText = description.replace(/<[^>]*>/g, '').trim();
    return cleanText;
  };

  if (loading) {
    return (
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-light">Selected Work</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[4/3] rounded-[23.33px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isConnected()) {
    console.log('Using fallback projects (Supabase not connected)');
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-between items-center mb-16">
        <h2 className="text-4xl font-light">Selected Work</h2>
        <div className="hidden md:flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`view-toggle-btn ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`view-toggle-btn ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
          >
            <Grid size={20} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative rounded-[23.33px] overflow-hidden [box-shadow:2.92px_2.92px_26.25px_0px_#333B501F] hover:[box-shadow:2.92px_2.92px_26.25px_0px_#333B501F] transition-shadow"
            >
              <button 
                onClick={() => onCaseStudyClick(project.id)}
                className="block w-full text-left"
              >
                <div className="relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full">
                    {project.title}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-12 md:space-y-24">
          {projects.map((project) => (
            <div key={project.id}>
              <button 
                onClick={() => onCaseStudyClick(project.id)}
                className="block w-full text-left"
              >
                <div className="relative overflow-hidden rounded-[23.33px]">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full aspect-[16/9] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full">
                    {project.title}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mt-6">
                  <span className="text-sm text-gray-400">{project.year}</span>
                  <span className="text-sm text-gray-500 line-clamp-2 md:line-clamp-none">
                    {renderDescription(project.description)}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}