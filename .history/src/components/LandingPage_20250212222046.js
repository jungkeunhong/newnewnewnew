import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Video/GIF Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.shopify.com/videos/c/o/v/0c3c26a90ffa4af89e5e6f1130ef721d.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center text-white">
          <motion.h1 
            className="cormorant text-5xl md:text-7xl font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Discover Your Perfect
            <br />
            Skin Treatment
          </motion.h1>
          
          <motion.p 
            className="montserrat text-lg md:text-xl font-light mb-12 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Experience personalized skincare solutions tailored to your unique needs
          </motion.p>

          <motion.button
            onClick={onStartQuiz}
            className="luxury-button text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GET YOUR SKIN TREATMENT
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 