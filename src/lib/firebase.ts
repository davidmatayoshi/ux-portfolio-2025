// Firebase configuration
export const storage = {
  ref: (path: string) => ({
    // Return an object that matches Firebase's storage interface
    put: async (file: File) => {
      try {
        // Create object URL for the uploaded file
        const url = URL.createObjectURL(file);
        return {
          ref: {
            getDownloadURL: async () => url
          }
        };
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  }),
  uploadBytes: async (ref: any, file: File) => {
    try {
      // Create object URL for the uploaded file
      const url = URL.createObjectURL(file);
      ref.downloadURL = url;
      return { ref };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  getDownloadURL: async (ref: any) => {
    try {
      return ref.downloadURL || '';
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw error;
    }
  }
};

export const auth = {
  currentUser: { email: 'admin@example.com' }
};

export const db = {};