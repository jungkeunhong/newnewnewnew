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
      <div className="pt-28 px-12 space-y-4 text-right">
        <h3 className="text-[#3E2723] text-lg tracking-wider">BUILT JUST FOR YOU</h3>
        <h1 className="text-[#3E2723] text-3xl font-light leading-tight">
          Truly custom<br />skin treatment
        </h1>
      </div>

      <div className="mt-8">
        <img
          src="https://media.istockphoto.com/id/1388628680/ko/%EC%82%AC%EC%A7%84/%EA%B7%B8%EB%85%80%EC%9D%98-%EC%96%BC%EA%B5%B4%EC%97%90-%EC%B4%88%EC%9D%8C%ED%8C%8C-%EC%B9%98%EB%A3%8C%EB%A5%BC-%EB%B0%9B%EA%B3%A0-%EC%8A%A4%ED%8C%8C%EC%97%90%EC%84%9C-%EC%97%AC%EC%9E%90.webp?a=1&b=1&s=612x612&w=0&k=20&c=d3px18ADiO_hpLsGlhhKpzQRGY4vPEIBunZ13o0mQmI="
          alt="Beautiful woman with perfect skin"
          className="w-full h-[70vh] object-cover"
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