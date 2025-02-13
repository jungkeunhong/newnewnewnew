import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Star, ChevronRight, ChevronLeft } from 'lucide-react';

const MainPage = ({ quizResults, onStartAnalysis, onTreatmentClick, onBack }) => {
  const treatments = [
    {
      id: 1,
      name: "Botox",
      description: "Natural wrinkle improvement and prevention",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
      rating: 4.9,
      reviews: 528,
      price: "$250~",
      benefits: [
        "Quick procedure",
        "Minimal pain",
        "Immediate results"
      ]
    },
    {
      id: 2,
      name: "Filler",
      description: "Natural volume and contour improvement",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b",
      rating: 4.8,
      reviews: 423,
      price: "$350~",
      benefits: [
        "Instant volume",
        "Natural results",
        "Long-lasting effect"
      ]
    },
    {
      id: 3,
      name: "Pico Laser",
      description: "Skin tone improvement and spot removal",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
      rating: 4.7,
      reviews: 389,
      price: "$200~",
      benefits: [
        "Quick recovery",
        "High effectiveness",
        "Various applications"
      ]
    }
  ];

  const getSkinSummary = () => {
    const { skinType, concerns = [] } = quizResults || {};
    let summary = `Based on your survey, you have ${skinType.toLowerCase()} skin`;
    
    if (concerns.length > 0) {
      const mainConcerns = concerns.slice(0, 2).join(" and ");
      summary += ` and are mainly concerned about ${mainConcerns}`;
    }
    
    summary += ". Here are our recommended treatments for you!";
    return summary;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Logo */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-luxe-500"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button 
            onClick={onBack} 
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto space-y-12">
        {/* Survey Summary */}
        <motion.section
          className="bg-gradient-to-br from-[#3E2723]/5 to-transparent p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[#3E2723]/80 leading-relaxed text-lg">
            {getSkinSummary()}
          </p>
        </motion.section>

        {/* Skin Analysis Report */}
        <motion.section 
          className="bg-gradient-to-br from-[#3E2723]/5 to-transparent p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="cormorant text-2xl mb-4">Skin Analysis Report</h2>
          <p className="text-[#3E2723]/80 leading-relaxed">
            {quizResults?.skinType === 'Combination' 
              ? 'Your combination skin type requires both hydration and oil control. Focus on balancing T-zone oil production while maintaining adequate moisture in dry areas.'
              : 'Get a personalized care routine based on your skin type. Start your AI skin analysis for more accurate recommendations.'}
          </p>
        </motion.section>

        {/* AI Skin Analysis CTA */}
        <motion.section
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={onStartAnalysis}
            className="w-full max-w-md luxury-button flex items-center justify-center space-x-3"
          >
            <Camera className="w-5 h-5" />
            <span>Start AI Skin Analysis</span>
          </button>
        </motion.section>

        {/* Recommended Treatments */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="cormorant text-2xl">Top 3 Recommended Treatments</h2>
          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <motion.button
                key={treatment.id}
                className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => onTreatmentClick(treatment)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <div className="flex">
                  <div className="w-32 h-32">
                    <img 
                      src={treatment.image} 
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{treatment.name}</h3>
                        <p className="text-sm text-[#3E2723]/60 mt-1">
                          {treatment.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#3E2723]/40" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{treatment.rating}</span>
                      <span className="text-[#3E2723]/60 ml-1">
                        ({treatment.reviews} reviews)
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      {treatment.price}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Treatment Information */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="cormorant text-2xl">Want to Learn More About Treatments?</h2>
          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <div key={index} className="p-4 border border-[#3E2723]/10 rounded-xl">
                <h3 className="font-medium mb-2">{treatment.name}</h3>
                <p className="text-sm text-[#3E2723]/80 mb-3">{treatment.description}</p>
                <button
                  onClick={() => onTreatmentClick(treatment)}
                  className="text-sm text-[#3E2723] font-medium flex items-center"
                >
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onStartAnalysis}
            className="w-full max-w-md luxury-button"
          >
            Find Your Perfect Treatment with AI Analysis
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default MainPage; 