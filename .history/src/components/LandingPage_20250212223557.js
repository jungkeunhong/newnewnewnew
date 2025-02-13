import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-[80vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070"
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/0c3c26a90ffa4af89e5e6f1130ef721d.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="p-6">
        <motion.button
          onClick={onStartQuiz}
          className="w-full bg-[#3E2723] text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          GET YOUR SKIN TREATMENT
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage; 