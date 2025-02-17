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

      {/* Video Section with Overlay Text */}
      <div className="relative mt-6 h-[70vh] flex justify-center items-center">
        <video
          src={landingVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-2xl h-[70vh] object-cover rounded-[15px]"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-semibold drop-shadow-lg">
            Discover MedSpas that match your skin needs
          </h2>
          <p className="mt-3 text-sm md:text-base drop-shadow-lg">
            Personalized treatment recommendations, trusted professionals
          </p>
        </div>
      </div>

      {/* Service Description */}
      <div className="px-6 py-4">
        <h3 className="text-xl md:text-2xl font-medium text-center text-[#3E2723]/90">
          💆‍♀️ Your Skin, Your Match
        </h3>
        <p className="mt-2 text-sm md:text-base text-center text-[#3E2723]/70">
          Stop guessing. We analyze your skin concerns and connect you with top-rated MedSpas offering Botox, fillers, and more — personalized just for you.
        </p>
      </div>

      {/* CTA Button */}
      <div className="p-6">
        <motion.button
          onClick={onStartQuiz}
          className="w-full bg-[#3E2723] text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Find Your Personalized MedSpa Match →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage;