import React from 'react';
import { motion } from 'framer-motion';
import ScrollToTop from './ScrollToTop';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ScrollToTop />
      <div className="p-6 space-y-2 absolute top-10 left-6 z-10">
        <h3 className="text-white text-lg tracking-wider">BUILT JUST FOR YOU</h3>
        <h1 className="text-white text-3xl font-light leading-tight">
          Truly custom<br />skin treatment
        </h1>
      </div>

      <div className="relative h-[75vh] px-6 py-12 bg-white">
        <div className="rounded-[3rem] overflow-hidden h-full bg-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070"
            alt="Beautiful woman with perfect skin"
            className="w-full h-full object-cover rounded-[3rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent rounded-[3rem]" />
        </div>
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