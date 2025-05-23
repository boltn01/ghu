import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import CropControls from './CropControls';
import CropPreview from './CropPreview';
import { translations } from '../i18n/ar';
import { motion } from 'framer-motion';
import { generateDownloadUrl, downloadImage } from '../utils/cropperUtils';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageUrl, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  
  const imageRef = useRef<HTMLImageElement | null>(null);
  const text = translations.cropper;

  const onCropAreaChange = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const resetCropSettings = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  const getCroppedImage = async () => {
    if (!croppedAreaPixels) return;

    try {
      const image = await createImage(imageUrl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const dataUrl = canvas.toDataURL('image/png');
      downloadImage(dataUrl, 'cropped-image.png');
      onCropComplete(dataUrl);
    } catch (e) {
      console.error('Error generating cropped image:', e);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
    >
      <div className="md:col-span-2 flex flex-col">
        <h3 className="font-bold text-xl mb-2 text-primary">{text.cropTitle}</h3>
        <motion.div 
          className="relative bg-secondary rounded-xl overflow-hidden flex-1 border border-primary/20"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspectRatio || undefined}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropAreaChange}
              cropShape="rect"
              showGrid={true}
              transform={[
                `translate(${crop.x}px, ${crop.y}px)`,
                `rotateZ(${rotation}deg)`,
                `scale(${flipHorizontal ? -zoom : zoom}, ${flipVertical ? -zoom : zoom})`,
              ].join(' ')}
              classes={{
                containerClassName: "w-full h-full",
                cropAreaClassName: "border-2 border-primary"
              }}
            />
          </div>
        </motion.div>
      </div>
      
      <div className="flex flex-col">
        <CropPreview 
          imageUrl={imageUrl} 
          cropData={croppedAreaPixels} 
          rotation={rotation}
          flipHorizontal={flipHorizontal}
          flipVertical={flipVertical}
        />
        
        <div className="mt-4">
          <CropControls
            rotation={rotation}
            setRotation={setRotation}
            zoom={zoom}
            setZoom={setZoom}
            flipHorizontal={flipHorizontal}
            setFlipHorizontal={setFlipHorizontal}
            flipVertical={flipVertical}
            setFlipVertical={setFlipVertical}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onReset={resetCropSettings}
            onDownload={getCroppedImage}
            canDownload={!!croppedAreaPixels}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCropper;