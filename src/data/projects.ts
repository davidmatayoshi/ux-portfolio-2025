import { Project } from '../types/project';
import { supabase, isConnected } from '../lib/supabase';

// Fallback projects when Supabase is not available
const fallbackProjects: Project[] = [
  {
    id: 'affinity-canvas',
    title: 'Affinity Canvas',
    client: 'Stagebase',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    description: 'A unified workspace for small business lenders to efficiently evaluate loan applications.',
    year: '2022'
  },
  {
    id: 'smart-home',
    title: 'Smart Home App',
    client: 'Pura',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827',
    description: 'IoT mobile app for controlling smart home fragrance devices.',
    year: '2023'
  },
  {
    id: 'tax-credit',
    title: 'Tax Credit Platform',
    client: 'Lendio',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    description: 'Web application for businesses to claim employee retention tax credits.',
    year: '2023'
  }
];

export async function getProjects(): Promise<Project[]> {
  // Return fallback projects if Supabase is not connected
  if (!isConnected()) {
    console.log('Using fallback projects (Supabase not connected)');
    return fallbackProjects;
  }

  try {
    const { data: studies, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map studies to projects
    const projects = (studies || []).map(study => ({
      id: study.id,
      title: study.title,
      client: study.client,
      image: study.thumbnail_image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      description: study.challenge || '',
      year: study.year || ''
    }));

    // Return fallback projects if no data from Supabase
    return projects.length > 0 ? projects : fallbackProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return fallback projects on error
    return fallbackProjects;
  }
}