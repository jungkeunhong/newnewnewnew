import React from 'react';
import { ChevronLeft, Activity, Droplets, Sun, Shield, Bug, Dna } from 'lucide-react';
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
      score: skinMetrics.hydration.score,
      details: [
        { label: "Surface Hydration", value: "72%" },
        { label: "Deep Hydration", value: "68%" },
        { label: "Water Retention", value: "Good" }
      ]
    },
    elasticity: {
      icon: <Activity className="w-6 h-6" />,
      score: skinMetrics.elasticity.score,
      details: [
        { label: "Collagen Level", value: "High" },
        { label: "Elastin Production", value: "75%" },
        { label: "Bounce Back", value: "Excellent" }
      ]
    },
    sunDamage: {
      icon: <Sun className="w-6 h-6" />,
      score: 8,
      details: [
        { label: "UV Spots", value: "Minimal" },
        { label: "Melanin Level", value: "Balanced" },
        { label: "Protection Need", value: "Medium" }
      ]
    },
    barrier: {
      icon: <Shield className="w-6 h-6" />,
      score: 9,
      details: [
        { label: "Strength", value: "Strong" },
        { label: "Recovery Rate", value: "Fast" },
        { label: "Sensitivity", value: "Low" }
      ]
    },
    microbiome: {
      icon: <Bug className="w-6 h-6" />,
      score: 8,
      details: [
        { label: "Balance", value: "Good" },
        { label: "Diversity", value: "High" },
        { label: "Protection", value: "Strong" }
      ]
    },
    genetics: {
      icon: <Dna className="w-6 h-6" />,
      score: 7,
      details: [
        { label: "Aging Rate", value: "Slow" },
        { label: "Sensitivity", value: "Low" },
        { label: "Recovery", value: "Fast" }
      ]
    }
  };

  // Calculate overall score
  const overallScore = (Object.values(detailedMetrics).reduce((acc, curr) => acc + curr.score, 0) / Object.keys(detailedMetrics).length).toFixed(1);

  return (
    <motion.div 
      className="min-h-screen bg-white p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center space-x-2 text-luxe-500 mb-6"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Results</span>
      </motion.button>

      <motion.div 
        className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-2xl p-6 shadow-sm border border-luxe-200 mb-6"
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-luxe-500 to-luxe-400 bg-clip-text text-transparent">
              Overall Score: {overallScore}/10
            </h1>
            <div className="mt-2 text-luxe-600">
              Skin Age: <span className="font-semibold">27</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-luxe-700 leading-relaxed">
            Your skin is healthy with balanced hydration and oil levels. However, texture and elasticity can be improved.
          </p>
          <p className="text-luxe-500 mt-3 font-medium">
            Key Focus Areas: Maintain hydration while adding peptide-rich products and gentle exfoliants to enhance elasticity and refine texture.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(detailedMetrics).map(([key, value], index) => (
          <motion.div
            key={key}
            className="bg-gradient-to-br from-luxe-50 to-luxe-100 p-6 rounded-xl shadow-sm border border-luxe-200"
            variants={fadeIn}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-luxe-100 to-luxe-200 rounded-lg text-luxe-500">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold capitalize text-luxe-900">{key}</h3>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-luxe-500 to-luxe-400 bg-clip-text text-transparent">
                {value.score}/10
              </div>
            </div>
            <div className="space-y-3">
              {value.details.map((detail, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <span className="text-luxe-600">{detail.label}</span>
                  <span className="font-medium text-luxe-900">{detail.value}</span>
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