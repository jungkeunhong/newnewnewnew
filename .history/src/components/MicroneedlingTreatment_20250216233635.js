import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Clock, AlertCircle } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

const MicroneedlingTreatment = ({ onBackToMain }) => {
  const benefits = [
    {
      title: "Collagen Boost",
      description: "Stimulates natural collagen production for firmer, smoother skin.",
      icon: "💉"
    },
    {
      title: "Scar & Wrinkle Reduction",
      description: "Reduces acne scars, fine lines, and wrinkles with precision.",
      icon: "✨"
    },
    {
      title: "Improved Skin Texture",
      description: "Evens skin texture and minimizes pore appearance.",
      icon: "🌿"
    }
  ];

  const keyAreas = [
    {
      area: "Face",
      image: ""
    },
    {
      area: "Neck",
      image: "https://indylasercenter.com/wp-content/uploads/2019/08/All-You-Need-to-Know-about-Laser-Hair-Removal-on-the-Neck-How-Many-Treatments-are-Necessary-for-Complete-Laser-Hair-Removal-from-the-Neck.jpg"
    },
    {
      area: "Scars",
      image: "https://plus.unsplash.com/premium_photo-1706429674321-a6029431c0bc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const precautions = [
    "Active acne or skin infection",
    "Recent sun exposure",
    "Pregnant or breastfeeding",
    "History of keloid scarring"
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBackToMain}
            className="flex items-center space-x-2 text-luxe-500"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button 
            onClick={onBackToMain}
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" />
        </div>
      </div>

      <ScrollToTop />
      <div className="pt-20 p-6 space-y-8">
        {/* Treatment Title */}
        <h1 className="text-3xl font-bold text-luxe-900 mb-8">Microneedling</h1>
        
        {/* TLDR Section */}
        <div className="">
          <h2 className="text-xl font-bold text-luxe-900 mb-4">TLDR;</h2>
          <p className="text-luxe-600">
            Microneedling uses tiny needles to stimulate collagen, improving texture, reducing scars, and enhancing skin elasticity with minimal downtime.
          </p>
        </div>

        {/* Top 3 Benefits */}
        <div>
          <h2 className="text-xl font-bold text-luxe-900 mb-4">Top 3 Benefits</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-luxe-200 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <h3 className="font-semibold text-luxe-900">{benefit.title}</h3>
                    <p className="text-sm text-luxe-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Areas */}
        <div>
          <h2 className="text-xl font-bold text-luxe-900 mb-4">Key Treatment Areas</h2>
          <div className="grid grid-cols-3 gap-4">
            {keyAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={area.area}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-center text-luxe-600">{area.area}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who Should Be Careful */}
        <div>
          <h2 className="text-xl font-bold text-luxe-900 mb-4">Who Should Be Careful?</h2>
          <div className="bg-red-50 rounded-xl p-6">
            <ul className="space-y-3">
              {precautions.map((precaution, index) => (
                <li key={index} className="flex items-center space-x-3 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{precaution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-luxe-600">
            <Clock className="w-5 h-5" />
            <span>Treatment time: 30-60 minutes</span>
          </div>
          <div className="flex items-center space-x-2 text-luxe-600">
            <Star className="w-5 h-5" />
            <span>Results: Visible within 3-4 weeks</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MicroneedlingTreatment;