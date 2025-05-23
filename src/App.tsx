import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageCropper from './components/ImageCropper';
import MashrabiyaPattern from './components/MashrabiyaPattern';
import GradientBackground from './components/GradientBackground';
import { ScissorsLineDashed } from 'lucide-react';
import { translations } from './i18n/ar';
import GlassCard from './components/GlassCard';
import { motion } from 'framer-motion';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  
  const text = translations.app;

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCroppedImage(null);
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setCroppedImage(croppedImageUrl);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-main overflow-hidden" dir="rtl">
      <GradientBackground />
      <MashrabiyaPattern />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.div 
              className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <ScissorsLineDashed className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent">
              {text.title}
            </h1>
          </div>
          <p className="text-xl text-primary-light/80">
            {text.subtitle}
          </p>
        </motion.header>
        
        <GlassCard className="max-w-6xl mx-auto p-8">
          {!imageUrl ? (
            <div className="min-h-[500px] flex items-center justify-center">
              <ImageUploader onImageLoaded={handleImageChange} className="max-w-lg mx-auto" />
            </div>
          ) : (
            <div className="min-h-[500px]">
              <ImageCropper 
                imageUrl={imageUrl}
                onCropComplete={handleCropComplete}
              />
            </div>
          )}
        </GlassCard>
      </div>
      
      <footer className="py-6 text-center text-sm text-primary-light/60">
        <p>
          {translations.footer.madeWith} 
          <motion.span 
            className="text-accent mx-1 inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤
          </motion.span> 
          {translations.footer.love} &copy; 2025 {translations.footer.copyright}
        </p>
      </footer>
    </div>
  );
}

export default App;