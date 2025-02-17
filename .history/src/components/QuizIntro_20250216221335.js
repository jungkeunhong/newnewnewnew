import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Settings, Shield, ArrowRight } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

const QuizIntro = ({ onStartQuiz }) => {
  return (
    <motion.div 
      className="min-h-screen bg-white/95 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ScrollToTop />
      <div className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12 flex flex-col justify-between">
        <div className="space-y-6 text-center">
          <h1 className="cormorant text-4xl md:text-4xl font-light text-[#3E2723] leading-tight">
            Discover Your Perfect<br />Skin Treatment
          </h1>
          
          <h2 className="text-[#3E2723]/70 text-lg max-w-md mx-auto">
            Answer a few quick questions for personalized, expert-backed recommendations.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 py-12">
          {[
            {
              title: "2-Min Quick Analysis",
              description: "Brief assessment",
              icon: Clock
            },
            {
              title: "93% Precision Rate",
              description: "Accurate matching",
              icon: Target
            },
            {
              title: "AI-Driven Insights",
              description: "Smart technology",
              icon: Settings
            },
            {
              title: "MD-Verified Clinics",
              description: "Expert validation",
              icon: Shield
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#3E2723]/80" />
                <div>
                  <div className="text-xs md:text-sm font-medium text-[#3E2723]">{item.title}</div>
                  <div className="text-[10px] md:text-xs text-[#3E2723]/60">{item.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={onStartQuiz}
          className="w-full max-w-md mx-auto bg-[#3E2723] text-white py-4 px-6 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg font-light">Start My Skin Quiz</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizIntro; 