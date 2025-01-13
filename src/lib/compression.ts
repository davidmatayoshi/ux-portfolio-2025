// Simple compression using base64 and a basic RLE algorithm
export function compress(str: string): string {
  try {
    // Add a marker to indicate this is compressed data
    const marker = 'COMPRESSED::';
    
    // Convert to base64 first to handle Unicode safely
    const base64 = btoa(unescape(encodeURIComponent(str)));
    
    // Simple run-length encoding
    let compressed = '';
    let count = 1;
    let current = base64[0];
    
    for (let i = 1; i <= base64.length; i++) {
      if (i < base64.length && base64[i] === current) {
        count++;
      } else {
        compressed += (count > 3 ? count.toString() + current : current.repeat(count));
        current = base64[i];
        count = 1;
      }
    }
    
    // Only return compressed version if it's actually smaller
    const final = marker + compressed;
    return final.length < str.length ? final : str;
  } catch (error) {
    console.error('Compression error:', error);
    return str; // Fallback to uncompressed
  }
}

export function decompress(str: string): string {
  try {
    const marker = 'COMPRESSED::';
    
    // Check if this is actually compressed data
    if (!str.startsWith(marker)) {
      return str; // Return as-is if not compressed
    }
    
    // Remove the marker
    const compressed = str.slice(marker.length);
    
    // Decompress run-length encoding
    let decompressed = '';
    let i = 0;
    
    while (i < compressed.length) {
      // Check for number at current position
      const numMatch = compressed.slice(i).match(/^\d+/);
      if (numMatch) {
        const count = parseInt(numMatch[0], 10);
        i += numMatch[0].length; // Move past the number
        if (i < compressed.length) {
          decompressed += compressed[i].repeat(count);
        }
      } else {
        decompressed += compressed[i];
      }
      i++;
    }
    
    try {
      // Convert back from base64
      return decodeURIComponent(escape(atob(decompressed)));
    } catch (base64Error) {
      console.error('Base64 decode error:', base64Error);
      return str; // Return original if base64 decode fails
    }
  } catch (error) {
    console.error('Decompression error:', error);
    return str; // Fallback to original
  }
}