import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { translations } from '../i18n/ar';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';

interface ImageUploaderProps {
  onImageLoaded: (image: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageLoaded, className = '' }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { playHover } = useSound();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('image/')) {
        onImageLoaded(file);
      }
    }
  }, [onImageLoaded]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false)
  });

  const text = translations.cropper;

  return (
    <motion.div 
      {...getRootProps()} 
      className={`
        w-full relative flex flex-col items-center justify-center 
        border-2 border-dashed rounded-xl p-8 transition-all duration-300 
        cursor-pointer backdrop-blur-sm
        ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-primary/30'}
        ${isDragReject ? 'border-red-500 bg-red-500/10' : ''}
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={playHover}
    >
      <input {...getInputProps()} />
      <motion.div 
        className={`text-center transition-opacity duration-300 ${isDragActive ? 'opacity-0' : 'opacity-100'}`}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="w-20 h-20 mb-4 mx-auto bg-primary/20 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Upload className="w-10 h-10 text-primary" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2 text-primary">{text.uploadTitle}</h3>
        <p className="text-primary-light/80">{text.uploadDescription}</p>
      </motion.div>
      
      {isDragActive && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div 
              className="w-20 h-20 mb-4 mx-auto bg-white/20 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ImageIcon className="w-10 h-10 text-primary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-primary drop-shadow-glow">{text.dragActive}</h3>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageUploader;