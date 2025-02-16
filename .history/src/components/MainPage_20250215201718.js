import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import DoctorRecommendation from './DoctorRecommendation';
import ScrollToTop from './ScrollToTop';

const MainPage = ({ quizResults, onStartAnalysis, onTreatmentClick, onBack, onDoctorClick }) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const treatments = [
    {
      id: 'botox',
      name: "Botox",
      description: "Natural wrinkle improvement and prevention",
      image: "https://plus.unsplash.com/premium_photo-1661769358914-1d33c22bd7ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym90b3h8ZW58MHx8MHx8fDA%3D",
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
      id: 'filler',
      name: "Filler",
      description: "Natural volume and contour improvement",
      image: "https://plus.unsplash.com/premium_photo-1719617673012-4b121052cc8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpbGxlcnxlbnwwfHwwfHx8MA%3D%3D",
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
      id: 'laser',
      name: "Pico Laser",
      description: "Skin tone improvement and spot removal",
      image: "https://media.istockphoto.com/id/1731969249/ko/%EC%82%AC%EC%A7%84/%EB%85%B8%ED%99%94-%EB%B0%A9%EC%A7%80-%ED%81%B4%EB%A6%AC%EB%8B%89%EC%97%90%EC%84%9C-%EC%A3%BC%EB%A6%84%EA%B3%BC-%ED%9D%89%ED%84%B0%EB%A5%BC-%EC%A4%84%EC%9D%B4%EA%B8%B0-%EC%9C%84%ED%95%B4-%EC%84%B1%EC%9D%B8-%EB%82%A8%EC%84%B1%EA%B3%BC-%ED%95%A8%EA%BB%98-%EB%A0%88%EC%9D%B4%EC%A0%80-%ED%91%9C%EB%A9%B4-%EC%B2%98%EB%A6%AC-%EC%96%BC%EA%B5%B4-%EC%8A%A4%ED%82%A8-%EC%BC%80%EC%96%B4-%EC%B9%98%EB%A3%8C-%EA%B8%B0%EC%88%A0%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%ED%94%BC%EB%B6%80-%EC%9D%98%EC%82%AC.webp?a=1&b=1&s=612x612&w=0&k=20&c=019vxc5s4SAycLCyiZC078IFtJvhqseZyHse_A9stbU=",
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
    let summary = `You have ${skinType.toLowerCase()} skin`;
    
    if (concerns.length > 0) {
      const mainConcerns = concerns.slice(0, 2).join(" and ");
      summary += ` and are mainly concerned about ${mainConcerns}. Consider following treatments.`;
    }
    
    return summary;
  };

  const handleTreatmentClick = (treatment) => {
    setSelectedTreatment(treatment);
  };

  if (selectedTreatment) {
    return (
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <DoctorRecommendation
          treatment={selectedTreatment}
          onBack={() => setSelectedTreatment(null)}
          onDoctorClick={(doctor) => {
            if (onDoctorClick) {
              onDoctorClick(doctor);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
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
            onClick={() => onTreatmentClick('main')} 
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
          className=""
        >
          <h2 className="cormorant text-2xl mb-4">Your Skin Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🌟</div>
              <div className="text-lg font-medium">Skin Age</div>
              <div className="text-3xl font-bold text-[#3E2723]">27</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💧</div>
              <div className="text-lg font-medium">Hydration</div>
              <div className="text-3xl font-bold text-[#3E2723]">8.5</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✨</div>
              <div className="text-lg font-medium">Elasticity</div>
              <div className="text-3xl font-bold text-[#3E2723]">7.8</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-lg font-medium">Texture</div>
              <div className="text-3xl font-bold text-[#3E2723]">8.2</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Main Concerns</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">👉</span>
                <span>Fine Lines</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">👉</span>
                <span>Pores</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">👉</span>
                <span>Dryness</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">👉</span>
                <span>Pigmentation</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Recommended Treatments */}
        <motion.section
          className="space-y-6"
        >
          <h2 className="cormorant text-2xl">Top Treatments for Your Skin Type</h2>
          <div className="grid grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
              <motion.button
                key={treatment.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:bg-[#3E2723]/5"
                onClick={() => handleTreatmentClick(treatment)}
              >
                <div className="p-4 flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4 relative rounded-full overflow-hidden border-2 border-[#3E2723]/10">
                    <img 
                      src={treatment.image} 
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-medium text-xl mb-2">{treatment.name}</h3>
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{treatment.rating}</span>
                    </div>
                    <div className="mt-1 text-sm text-[#3E2723]/60">
                      {treatment.reviews} reviews
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
        >
          <h2 className="cormorant text-2xl">Learn More About Treatments?</h2>
          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <div 
                key={index} 
                className="p-4 border border-[#3E2723]/10 rounded-xl hover:bg-[#3E2723]/5 transition-all cursor-pointer"
                onClick={() => {
                  if (onTreatmentClick) {
                    onTreatmentClick(treatment.id);
                  }
                }}
              >
                <h3 className="font-medium text-xl mb-2">{treatment.name}</h3>
                <p className="text-m text-[#3E2723]/80 mb-3">{treatment.description}</p>
                <div className="text-sm text-[#3E2723] font-medium flex items-center">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default MainPage; 