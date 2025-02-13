import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const QuizIntro = ({ onStartQuiz }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-1 px-8 py-12 flex flex-col justify-between max-h-[90vh]">
        <div className="space-y-6">
          <h1 className="text-3xl font-light text-[#3E2723]">
            Let's find your<br />perfect treatment
          </h1>
          
          <p className="text-[#3E2723]/70">
            Answer a few questions about your skin to get personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 py-8">
          {[
            {
              title: "2 min",
              description: "Quick analysis",
              icon: "⚡️"
            },
            {
              title: "93% Match",
              description: "Accuracy rate",
              icon: "🎯"
            },
            {
              title: "AI-Powered",
              description: "Smart matching",
              icon: "🤖"
            },
            {
              title: "Verified MDs",
              description: "Expert review",
              icon: "👩‍⚕️"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#3E2723]/5 p-5 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="text-sm font-medium text-[#3E2723]">{item.title}</div>
              <div className="text-xs text-[#3E2723]/70">{item.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={onStartQuiz}
          className="w-full bg-[#3E2723] text-white py-4 px-6 rounded-2xl flex items-center justify-between mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Start Skin Quiz</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizIntro; 