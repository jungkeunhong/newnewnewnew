import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const TreatmentInformation = ({ onTreatmentSelect }) => {
  const treatments = [
    {
      id: 'botox',
      name: 'Botox',
      description: 'Reduce wrinkles and fine lines',
      image: 'https://images.unsplash.com/photo-1516716066581-d6dde5d3d1c7?w=800&auto=format&fit=crop'
    },
    {
      id: 'filler',
      name: 'Dermal Fillers',
      description: 'Add volume and enhance facial contours',
      image: 'https://images.unsplash.com/photo-1523263685509-57c1d050d19b?w=800&auto=format&fit=crop'
    },
    {
      id: 'laser',
      name: 'Laser Treatment',
      description: 'Improve skin texture and tone',
      image: 'https://images.unsplash.com/photo-1532699552235-44bd6aa3478c?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-bold text-luxe-900 mb-6">Learn More About Treatments</h1>
      
      <div className="space-y-4">
        {treatments.map((treatment) => (
          <motion.button
            key={treatment.id}
            className="w-full bg-white rounded-xl border border-luxe-200 overflow-hidden hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTreatmentSelect(treatment.id)}
          >
            <div className="flex items-center">
              <img 
                src={treatment.image} 
                alt={treatment.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-4 text-left">
                <h3 className="font-semibold text-luxe-900">{treatment.name}</h3>
                <p className="text-sm text-luxe-600">{treatment.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-luxe-400 mr-4" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TreatmentInformation; 