import React, { useEffect, useRef } from 'react';
import { translations } from '../i18n/ar';
import GlassCard from './GlassCard';

interface CropPreviewProps {
  imageUrl: string | null;
  cropData: any;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

const CropPreview: React.FC<CropPreviewProps> = ({ 
  imageUrl, 
  cropData, 
  rotation, 
  flipHorizontal, 
  flipVertical 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = translations.cropper;

  useEffect(() => {
    if (!imageUrl || !cropData || !canvasRef.current) return;

    const image = new Image();
    image.src = imageUrl;
    
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = cropData.width;
      canvas.height = cropData.height;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      
      ctx.drawImage(
        image,
        cropData.x,
        cropData.y,
        cropData.width,
        cropData.height,
        -cropData.width / 2,
        -cropData.height / 2,
        cropData.width,
        cropData.height
      );
      
      ctx.restore();
    };
  }, [imageUrl, cropData, rotation, flipHorizontal, flipVertical]);

  return (
    <GlassCard className="h-full p-4">
      <h3 className="font-bold text-xl mb-2 text-primary self-start">{text.previewTitle}</h3>
      <div className="flex-1 w-full flex items-center justify-center bg-secondary rounded-lg overflow-hidden">
        {!imageUrl || !cropData ? (
          <p className="text-primary-light/60">{text.noImageSelected}</p>
        ) : (
          <canvas 
            ref={canvasRef} 
            className="max-w-full max-h-full shadow-lg"
          />
        )}
      </div>
    </GlassCard>
  );
};

export default CropPreview;