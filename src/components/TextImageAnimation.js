import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images
import Image1 from './v1.png'; // These should be the images you want to cycle through
import Image2 from './v2.png';
import Image3 from './v3.png';
import Image4 from './v4.png';

const TextImageAnimation = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Image1, Image2, Image3, Image4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', height: 150, position: 'relative' }}>
      <h1 style={{ marginBottom: 20 }}>Depositions Just Got a Lot</h1> {/* Added marginBottom for spacing */}
      <AnimatePresence>
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Dynamic text"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{height: 100, position: 'absolute', top: 50 }} // Adjust top to position correctly
        />
      </AnimatePresence>
    </div>
  );
};

export default TextImageAnimation;