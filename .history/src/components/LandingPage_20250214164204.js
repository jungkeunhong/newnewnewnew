import React from 'react';
import { motion } from 'framer-motion';
import ScrollToTop from './ScrollToTop';

const LandingPage = ({ onStartQuiz, onLearnMore }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ScrollToTop />
      <div className="pt-28 px-12 space-y-4 text-right">
        <h1 className="text-4xl font-bold text-[#3E2723] gotu-regular">
          Your Skin Journey
        </h1>
        <p className="text-lg text-[#3E2723]/80">
          Discover personalized treatments for your unique skin
        </p>
      </div>

      <div className="mt-8 relative h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800"
          alt="Skincare"
          className="w-full h-full object-cover rounded-[15px]"
        />
      </div>

      <div className="p-6 space-y-4">
        <motion.button
          onClick={onStartQuiz}
          className="w-full bg-[#3E2723] text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          GET YOUR SKIN TREATMENT
        </motion.button>
        
        <motion.button
          onClick={onLearnMore}
          className="w-full border-2 border-[#3E2723] text-[#3E2723] py-4 px-6 rounded-xl hover:bg-[#3E2723]/5 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          LEARN MORE ABOUT TREATMENTS
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage; 