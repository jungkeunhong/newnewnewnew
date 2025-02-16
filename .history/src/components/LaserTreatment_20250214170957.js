import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Clock, AlertCircle } from 'lucide-react';

const LaserTreatment = ({ onBack }) => {
  const benefits = [
    {
      title: "Skin Rejuvenation",
      description: "Improves skin texture, tone, and reduces signs of aging",
      icon: "✨"
    },
    {
      title: "Targeted Treatment",
      description: "Precisely targets specific skin concerns without affecting surrounding tissue",
      icon: "🎯"
    },
    {
      title: "Progressive Results",
      description: "Continues to improve skin over time as collagen production increases",
      icon: "📈"
    }
  ];

  const keyAreas = [
    {
      area: "Face",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800"
    },
    {
      area: "Neck",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800"
    },
    {
      area: "Chest",
      image: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?w=800"
    }
  ];

  const precautions = [
    "People with certain skin conditions",
    "Those with recent sun exposure",
    "Individuals using certain medications",
    "People with a history of keloid scarring"
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
        <div className="">
          <h2 className="text-xl font-bold text-luxe-900 mb-4">TLDR;</h2>
          <p className="text-luxe-600">
            Laser treatments use focused light energy to improve skin texture, reduce pigmentation, 
            and stimulate collagen production. Results develop over time with minimal downtime.
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
            <span>Treatment time: 15-45 minutes</span>
          </div>
          <div className="flex items-center space-x-2 text-luxe-600">
            <Star className="w-5 h-5" />
            <span>Results: Gradual improvement over 4-6 weeks</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LaserTreatment; 