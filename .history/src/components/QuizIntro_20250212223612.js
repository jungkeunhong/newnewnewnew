import React from 'react';
import { motion } from 'framer-motion';

const QuizIntro = ({ onStartQuiz }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1619451683204-a4edf6d0b0e6?q=80&w=2787&auto=format&fit=crop"
          alt="Beautiful woman with perfect skin"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 space-y-4">
        <h2 className="cormorant text-2xl text-center">
          Tell us about your skin and skincare routine
        </h2>
        <p className="text-center text-luxe-600">
          We'll guide you to the perfect skincare solutions based on your needs
        </p>
        <motion.button
          onClick={onStartQuiz}
          className="w-full bg-[#3E2723] text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          START QUIZ
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizIntro; 