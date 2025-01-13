import { supabase } from './supabase';

export async function uploadImage(file: File): Promise<string> {
  try {
    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Generate image ID
    const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Save to Supabase
    const { error } = await supabase
      .from('images')
      .insert({
        image_id: imageId,
        data: base64
      });

    if (error) throw error;

    return imageId;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function getImageUrl(imageId: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('data')
      .eq('image_id', imageId)
      .single();

    if (error) throw error;
    return data.data;
  } catch (error) {
    console.error('Error retrieving image:', error);
    return '';
  }
}