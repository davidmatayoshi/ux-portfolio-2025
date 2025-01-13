import React from 'react';
import { CaseStudy } from '../../types/caseStudy';
import RichTextEditor from './RichTextEditor';
import toast from 'react-hot-toast';

interface CaseStudyFormProps {
  data: CaseStudy;
  onChange: (data: CaseStudy) => void;
  onSave: (data: CaseStudy) => void;
  lastSaved: Date | null;
}

export default function CaseStudyForm({ data, onChange, onSave }: CaseStudyFormProps) {
  const handleChange = (field: keyof CaseStudy, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProcess = [...(data.process || [])];
        newProcess[index] = { 
          ...newProcess[index], 
          image: reader.result as string 
        };
        handleChange('process', newProcess);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('thumbnailImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light">Edit Case Study</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="client" className="form-label">Client</label>
          <input
            type="text"
            id="client"
            value={data.client || ''}
            onChange={(e) => handleChange('client', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="thumbnail" className="form-label">Thumbnail Image</label>
        <div className="space-y-4">
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="form-input"
          />
          {data.thumbnailImage && (
            <img 
              src={data.thumbnailImage} 
              alt="Thumbnail preview" 
              className="w-full max-w-md aspect-video object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="year" className="form-label">Year</label>
          <input
            type="text"
            id="year"
            value={data.year || ''}
            onChange={(e) => handleChange('year', e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="role" className="form-label">Role</label>
          <input
            type="text"
            id="role"
            value={data.role || ''}
            onChange={(e) => handleChange('role', e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            id="duration"
            value={data.duration || ''}
            onChange={(e) => handleChange('duration', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="team" className="form-label">Team</label>
        <input
          type="text"
          id="team"
          value={data.team || ''}
          onChange={(e) => handleChange('team', e.target.value)}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="challenge" className="form-label">Challenge</label>
        <RichTextEditor
          content={data.challenge || ''}
          onChange={(value) => handleChange('challenge', value)}
          placeholder="Describe the challenge..."
        />
      </div>

      <div>
        <label htmlFor="solution" className="form-label">Solution</label>
        <RichTextEditor
          content={data.solution || ''}
          onChange={(value) => handleChange('solution', value)}
          placeholder="Describe the solution..."
        />
      </div>

      <div>
        <label className="form-label">Impact</label>
        {(data.impact || []).map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newImpact = [...(data.impact || [])];
                newImpact[index] = e.target.value;
                handleChange('impact', newImpact);
              }}
              className="form-input"
            />
            <button
              type="button"
              onClick={() => {
                const newImpact = (data.impact || []).filter((_, i) => i !== index);
                handleChange('impact', newImpact);
              }}
              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleChange('impact', [...(data.impact || []), ''])}
          className="btn-secondary mt-2"
        >
          Add Impact
        </button>
      </div>

      <div>
        <label className="form-label">Process</label>
        {(data.process || []).map((phase, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="space-y-4">
              <input
                type="text"
                value={phase.title || ''}
                onChange={(e) => {
                  const newProcess = [...(data.process || [])];
                  newProcess[index] = { ...phase, title: e.target.value };
                  handleChange('process', newProcess);
                }}
                placeholder="Phase Title"
                className="form-input"
              />
              
              <div>
                <label className="form-label">Phase Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="form-input"
                />
                {phase.image && (
                  <img 
                    src={phase.image} 
                    alt={phase.title || 'Preview'} 
                    className="mt-2 w-full max-w-md aspect-video object-cover rounded"
                  />
                )}
              </div>

              <RichTextEditor
                content={phase.description || ''}
                onChange={(value) => {
                  const newProcess = [...(data.process || [])];
                  newProcess[index] = { ...phase, description: value };
                  handleChange('process', newProcess);
                }}
                placeholder="Description..."
              />

              <button
                type="button"
                onClick={() => {
                  const newProcess = (data.process || []).filter((_, i) => i !== index);
                  handleChange('process', newProcess);
                }}
                className="text-red-500 hover:bg-red-50 px-3 py-2 rounded"
              >
                Remove Phase
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleChange('process', [...(data.process || []), { title: '', description: '', image: '' }])}
          className="btn-secondary"
        >
          Add Process Phase
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="submit" className="btn">
          Save Case Study
        </button>
      </div>
    </form>
  );
}