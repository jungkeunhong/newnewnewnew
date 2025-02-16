import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Clock, AlertCircle } from 'lucide-react';

const FillerTreatment = ({ onBack }) => {
  const benefits = [
    {
      title: "Instant Volume",
      description: "Immediately adds volume to hollow areas and smooths deep wrinkles",
      icon: "✨"
    },
    {
      title: "Natural Look",
      description: "Creates subtle, natural-looking enhancement",
      icon: "🎭"
    },
    {
      title: "Long-Term Results",
      description: "Results can last 6-18 months depending on the type",
      icon: "⏳"
    }
  ];

  const keyAreas = [
    {
      area: "Lips",
      image: "https://images.unsplash.com/photo-1542996966-2b31ef6171eb?w=800"
    },
    {
      area: "Cheeks",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800"
    },
    {
      area: "Nasolabial Folds",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800"
    }
  ];

  const precautions = [
    "People with autoimmune disorders",
    "Those with active skin infections",
    "Individuals with bleeding disorders",
    "People with multiple severe allergies"
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >


      <div className="p-6 space-y-8">
        {/* TLDR Section */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-luxe-900 mb-4">TLDR;</h2>
          <p className="text-luxe-600">
            Dermal fillers are gel-like substances that restore volume and enhance facial contours. 
            Perfect for lips, cheeks, and deep wrinkles, with results lasting 6-18 months.
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
            <span>Results: Immediate with potential swelling for 1-3 days</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FillerTreatment; 