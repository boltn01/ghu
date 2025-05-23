/**
 * Utility functions for the image cropper component
 */

// Generate a download URL for a canvas element
export const generateDownloadUrl = (canvas: HTMLCanvasElement, format: string): string => {
  const quality = format === 'image/jpeg' ? 0.9 : 1;
  return canvas.toDataURL(format, quality);
};

// Create a download link for the image
export const downloadImage = (dataUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Calculate dimensions for preview
export const calculatePreviewDimensions = (
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number
): { width: number; height: number } => {
  const ratio = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
  return {
    width: imageWidth * ratio,
    height: imageHeight * ratio
  };
};

// Convert degrees to radians
export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Formats supported for download
export const supportedFormats = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPG' },
  { value: 'image/webp', label: 'WebP' }
];

// Aspect ratios
export const aspectRatios = [
  { value: 0, label: "free" },
  { value: 1, label: "square" },
  { value: 16/9, label: "landscape" },
  { value: 9/16, label: "portrait" }
];