import React from 'react';
import { motion } from 'framer-motion';
import ScrollToTop from './ScrollToTop';
import landingVideo from '../assets/0214.mp4';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ScrollToTop />

      <div className="pt-24 px-6">
        <h2 className="text-3xl text-[#3E2723]/80 leading-relaxed mb-4">
          Find trusted MedSpa, just for you
        </h2>
      </div>

      <div className="mt-4 relative h-[70vh] px-6">
        <video
          src={landingVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-[15px]"
        />
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