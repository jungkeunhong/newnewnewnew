import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollToTop from './ScrollToTop';
import landingVideo from '../assets/0214.mp4';

const LandingPage = ({ onStartQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      setIsScrolled(show);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] font-['Gotu']">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <video
          src={landingVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <motion.div 
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity, scale }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-relaxed">
            Your Skin,<br />Your Match
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-12 leading-relaxed">
            Stop guessing. We analyze your skin concerns and connect you with top-rated MedSpas.
          </p>
          <motion.button
            onClick={onStartQuiz}
            className="bg-white/90 text-[#1A1A1A] px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center space-x-2">
              <span className="text-lg">Find Your Personalized MedSpa Match</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Description Section */}
        <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] mb-8 leading-relaxed">
              Personalized Treatment Plans
            </h2>
            <p className="text-lg text-[#1A1A1A]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              We analyze your skin concerns and connect you with top-rated MedSpas for Botox, fillers, and more — personalized just for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Smart Analysis",
                  description: "AI-powered skin analysis for precise recommendations"
                },
                {
                  title: "Expert Match",
                  description: "Connect with verified, top-rated MedSpas in your area"
                },
                {
                  title: "Personalized Care",
                  description: "Tailored treatment plans based on your unique needs"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-light text-[#1A1A1A] mb-3">{item.title}</h3>
                  <p className="text-[#1A1A1A]/60 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.button
        onClick={onStartQuiz}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 z-50 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-base">Start Quiz</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default LandingPage; 