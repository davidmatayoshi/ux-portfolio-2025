import React, { useState, useCallback } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadImage, getImageUrl } from '../../lib/imageStorage';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
}

export default function ImageUpload({ currentUrl, onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Get the correct image URL for display
  const displayUrl = currentUrl ? 
    (currentUrl.startsWith('img_') ? getImageUrl(currentUrl) : currentUrl) 
    : '';

  const handleUpload = useCallback(async (file: File) => {
    if (!file) {
      toast.error('No file selected');
      return;
    }

    try {
      setUploading(true);
      const imageId = await uploadImage(file);
      onUpload(imageId);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [handleUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [handleUpload]);

  return (
    <div className="space-y-4">
      {displayUrl && (
        <div className="relative">
          <img 
            src={displayUrl}
            alt="Current" 
            className="w-full max-w-md aspect-video object-cover rounded-lg"
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null; // Prevent infinite loop
              img.src = 'https://placehold.co/800x450/jpeg';
            }}
          />
        </div>
      )}
      
      <div 
        className="flex items-center justify-center w-full"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label 
          className={`
            flex flex-col items-center justify-center w-full h-32 
            border-2 border-dashed rounded-lg cursor-pointer 
            ${dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }
            transition-colors duration-200
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 mb-3 text-gray-400 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}