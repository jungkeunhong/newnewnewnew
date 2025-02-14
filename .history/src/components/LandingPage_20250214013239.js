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
      <div className="pt-28 px-12 space-y-4 text-right">
        <h3 className="text-[#3E2723] text-lg tracking-wider">BUILT JUST FOR YOU</h3>
        <h1 className="text-[#3E2723] text-3xl font-light leading-tight">
          Truly custom<br />skin treatment
        </h1>
      </div>

      <div className="mt-8 relative h-[70vh]">
        <video
          src={landingVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
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