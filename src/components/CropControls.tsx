import React from 'react';
import { Rotate3D as Rotate, RotateCcw, ZoomIn, ZoomOut, FlipHorizontal, FlipVertical, Download } from 'lucide-react';
import { translations } from '../i18n/ar';
import { motion } from 'framer-motion';
import FloatingButton from './FloatingButton';
import GlassCard from './GlassCard';

interface CropControlsProps {
  rotation: number;
  setRotation: (rotation: number) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  flipHorizontal: boolean;
  setFlipHorizontal: (flip: boolean) => void;
  flipVertical: boolean;
  setFlipVertical: (flip: boolean) => void;
  aspectRatio: number;
  setAspectRatio: (ratio: number) => void;
  onReset: () => void;
  onDownload: () => void;
  canDownload: boolean;
}

const CropControls: React.FC<CropControlsProps> = ({
  rotation,
  setRotation,
  zoom,
  setZoom,
  flipHorizontal,
  setFlipHorizontal,
  flipVertical,
  setFlipVertical,
  aspectRatio,
  setAspectRatio,
  onReset,
  onDownload,
  canDownload
}) => {
  const text = translations.cropper;
  
  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  return (
    <GlassCard className="p-4">
      <div className="border-b border-primary/20 pb-3 mb-3">
        <h3 className="font-bold text-xl mb-2 text-primary">{text.aspectRatio}</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 0, label: text.free },
            { value: 1, label: text.square },
            { value: 16/9, label: text.landscape },
            { value: 9/16, label: text.portrait }
          ].map((ratio) => (
            <motion.button
              key={ratio.value}
              onClick={() => setAspectRatio(ratio.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-lg text-sm transition-colors duration-300 ${
                aspectRatio === ratio.value 
                  ? 'bg-primary text-secondary-dark' 
                  : 'bg-glass-light hover:bg-glass-dark text-primary-light'
              }`}
            >
              {ratio.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <h3 className="font-bold text-xl mb-2 text-primary">{text.rotate}</h3>
          <div className="flex gap-2">
            <FloatingButton onClick={handleRotate} className="!p-2">
              <Rotate className="w-5 h-5" />
            </FloatingButton>
            <FloatingButton
              onClick={() => setFlipHorizontal(!flipHorizontal)}
              className={`!p-2 ${flipHorizontal ? '!bg-accent' : ''}`}
            >
              <FlipHorizontal className="w-5 h-5" />
            </FloatingButton>
            <FloatingButton
              onClick={() => setFlipVertical(!flipVertical)}
              className={`!p-2 ${flipVertical ? '!bg-accent' : ''}`}
            >
              <FlipVertical className="w-5 h-5" />
            </FloatingButton>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-2 text-primary">{text.zoom}</h3>
          <div className="flex gap-2">
            <FloatingButton
              onClick={() => setZoom(Math.max(1, zoom - 0.1))}
              className="!p-2"
              disabled={zoom <= 1}
            >
              <ZoomOut className="w-5 h-5" />
            </FloatingButton>
            <FloatingButton
              onClick={() => setZoom(Math.min(3, zoom + 0.1))}
              className="!p-2"
            >
              <ZoomIn className="w-5 h-5" />
            </FloatingButton>
            <FloatingButton
              onClick={onReset}
              className="!p-2"
            >
              <RotateCcw className="w-5 h-5" />
            </FloatingButton>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-primary/20">
        <FloatingButton
          onClick={onDownload}
          disabled={!canDownload}
          className="w-full !py-3 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>{text.download}</span>
        </FloatingButton>
      </div>
    </GlassCard>
  );
};

export default CropControls;