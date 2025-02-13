import React from 'react';
import { motion } from 'framer-motion';

const QuizIntro = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1619451683204-a4edf6d0b0e6?q=80&w=2787&auto=format&fit=crop"
            alt="Beautiful woman smiling"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center text-white">
          <motion.h1 
            className="cormorant text-4xl md:text-6xl font-light mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Tell us about your skin and current skincare routine
          </motion.h1>
          
          <motion.p 
            className="montserrat text-lg md:text-xl font-light mb-12 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We'll provide personalized skin care guidance based on your unique needs
          </motion.p>

          <motion.button
            onClick={onStartQuiz}
            className="luxury-button text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START QUIZ
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro; 