import React from 'react';
import { ChevronLeft, Activity, Droplets, Sun, Shield, Virus, Dna } from 'lucide-react';
import { motion } from 'framer-motion';

const DetailedAnalysis = ({ onBack, skinMetrics, selectedImage }) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const detailedMetrics = {
    hydration: {
      icon: <Droplets className="w-6 h-6" />,
      details: [
        { label: "Surface Hydration", value: "72%" },
        { label: "Deep Hydration", value: "68%" },
        { label: "Water Retention", value: "Good" }
      ]
    },
    elasticity: {
      icon: <Activity className="w-6 h-6" />,
      details: [
        { label: "Collagen Level", value: "High" },
        { label: "Elastin Production", value: "75%" },
        { label: "Bounce Back", value: "Excellent" }
      ]
    },
    sunDamage: {
      icon: <Sun className="w-6 h-6" />,
      details: [
        { label: "UV Spots", value: "Minimal" },
        { label: "Melanin Level", value: "Balanced" },
        { label: "Protection Need", value: "Medium" }
      ]
    },
    barrier: {
      icon: <Shield className="w-6 h-6" />,
      details: [
        { label: "Strength", value: "Strong" },
        { label: "Recovery Rate", value: "Fast" },
        { label: "Sensitivity", value: "Low" }
      ]
    },
    microbiome: {
      icon: <Virus className="w-6 h-6" />,
      details: [
        { label: "Balance", value: "Good" },
        { label: "Diversity", value: "High" },
        { label: "Protection", value: "Strong" }
      ]
    },
    genetics: {
      icon: <Dna className="w-6 h-6" />,
      details: [
        { label: "Aging Rate", value: "Slow" },
        { label: "Sensitivity", value: "Low" },
        { label: "Recovery", value: "Fast" }
      ]
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center space-x-2 text-purple-600 mb-6"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Results</span>
      </motion.button>

      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        variants={fadeIn}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden">
            <motion.img 
              src={selectedImage} 
              alt="Your photo" 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Detailed Analysis
            </h1>
            <p className="text-gray-600 mt-2">
              In-depth analysis of your skin health metrics
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(detailedMetrics).map(([key, value], index) => (
          <motion.div
            key={key}
            className="bg-white p-6 rounded-xl shadow-sm"
            variants={fadeIn}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg text-purple-600">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold capitalize">{key}</h3>
            </div>
            <div className="space-y-3">
              {value.details.map((detail, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (i * 0.05) }}
                >
                  <span className="text-gray-600">{detail.label}</span>
                  <span className="font-medium text-purple-600">{detail.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DetailedAnalysis; 