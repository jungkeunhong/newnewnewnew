import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import DoctorRecommendation from './DoctorRecommendation';
import ScrollToTop from './ScrollToTop';
import { trackPageView, trackUserAction, trackTreatmentView } from '../utils/firebase';
import Analytics from '../utils/analytics';

const MainPage = ({ quizResults, onStartAnalysis, onTreatmentClick, onBack, onDoctorClick }) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const treatments = [
    {
      id: 'botox',
      name: "Botox",
      description: "Natural wrinkle improvement and prevention...more",
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
      description: "Natural volume and contour improvement...more",
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
      description: "Skin tone improvement and spot removal...more",
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

  const getSkinMetrics = () => {
    const { skinAfterWashing, skinTexture, pores, fineLines, skinElasticity } = quizResults || {};
    
    const getHydrationStatus = () => {
      switch(skinAfterWashing) {
        case 'Dry immediately':
          return { level: 'Low', message: 'Needs immediate moisture barrier support' };
        case 'Dry after a while':
          return { level: 'Moderate', message: 'Could benefit from better moisture retention' };
        case 'Stays hydrated':
          return { level: 'Good', message: 'Maintains healthy moisture levels' };
        default:
          return { level: 'Moderate', message: 'Consider a hydration assessment' };
      }
    };

    const getTextureStatus = () => {
      switch(skinTexture) {
        case 'Smooth':
          return { level: 'Refined', message: 'Well-maintained surface texture' };
        case 'Rough':
          return { level: 'Uneven', message: 'Gentle exfoliation can help smoothen' };
        case 'Bumpy':
          return { level: 'Textured', message: 'Treatment can improve smoothness' };
        default:
          return { level: 'Variable', message: 'Monitor texture changes' };
      }
    };

    const getElasticityStatus = () => {
      switch(skinElasticity) {
        case 'Immediately':
          return { level: 'Excellent', message: 'Strong skin resilience' };
        case 'Slowly':
          return { level: 'Good', message: 'Room for elasticity improvement' };
        case 'Very slowly':
          return { level: 'Moderate', message: 'Focus on firmness support' };
        default:
          return { level: 'Variable', message: 'Consider elasticity assessment' };
      }
    };

    return {
      hydration: getHydrationStatus(),
      texture: getTextureStatus(),
      elasticity: getElasticityStatus()
    };
  };

  const getSkinSummary = () => {
    const metrics = getSkinMetrics();
    let concerns = [];
    
    if (metrics.hydration.level === 'Low') {
      concerns.push('hydration needs');
    }
    if (metrics.texture.level === 'Uneven' || metrics.texture.level === 'Textured') {
      concerns.push('texture refinement');
    }
    if (metrics.elasticity.level === 'Moderate') {
      concerns.push('firmness support');
    }

    if (concerns.length === 0) {
      return "Your skin is well-maintained. Let's focus on preserving its healthy state and preventing future concerns.";
    }

    const concernsList = concerns.join(' and ');
    return `Your skin may need extra care for ${concernsList}. Discover treatments to improve it`;
  };

  useEffect(() => {
    trackPageView('main_page');
  }, []);

  const handleTreatmentClick = (treatment) => {
    // 트리트먼트 카드 클릭 트래킹
    Analytics.track('treatment_card_click', {
      section: 'recommended_treatments',
      treatment_id: treatment.id,
      treatment_name: treatment.name,
      treatment_price: treatment.price,
      treatment_rating: treatment.rating,
      treatment_reviews: treatment.reviews
    });

    trackUserAction('treatment_selected', {
      treatment_id: treatment.id,
      treatment_name: treatment.name
    });
    setSelectedTreatment(treatment);
  };

  // Learn More 섹션의 트리트먼트 클릭 핸들러
  const handleLearnMoreClick = (treatment) => {
    Analytics.track('learn_more_treatment_click', {
      section: 'learn_more',
      treatment_id: treatment.id,
      treatment_name: treatment.name,
      treatment_description: treatment.description
    });

    if (onTreatmentClick) {
      onTreatmentClick(treatment.id);
    }
  };

  // 의사 프로필 클릭 핸들러
  const handleDoctorClick = (doctor) => {
    Analytics.track('doctor_profile_click', {
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_specialty: doctor.specialty,
      doctor_rating: doctor.rating,
      doctor_reviews: doctor.reviews,
      treatment_context: selectedTreatment ? selectedTreatment.name : 'general'
    });

    if (onDoctorClick) {
      onDoctorClick(doctor);
    }
  };

  if (selectedTreatment) {
    return (
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <DoctorRecommendation
          treatment={selectedTreatment.name}
          onBack={() => setSelectedTreatment(null)}
          onDoctorClick={(doctor) => {
            // 의사 프로필 클릭 트래킹
            Analytics.track('doctor_profile_click', {
              doctor_id: doctor.id,
              doctor_name: doctor.name,
              doctor_specialty: doctor.specialty,
              doctor_rating: doctor.rating,
              doctor_reviews: doctor.reviews,
              treatment_context: selectedTreatment.name,
              section: 'doctor_recommendation'
            });
            
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
            onClick={() => onTreatmentClick('landing')} 
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto">
        {/* Skin Analysis Summary */}
        <motion.section className="pb-12 border-b border-[#3E2723]/10">
          <h2 className="cormorant text-2xl mb-6 text-[#3E2723]">Your Skin Profile</h2>
          <p className="text-[#3E2723]/80 text-base font-light leading-relaxed mb-8">
            {getSkinSummary()}
          </p>
          
          <div className="space-y-6">
            <div className="border-b border-[#3E2723]/10 pb-6">
              <div className="flex items-start space-x-4">
                <div className="p-2">
                  <svg className="w-6 h-6 text-[#3E2723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12a8 8 0 01-8 8m8-8a8 8 0 00-8-8m8 8h2m-10 8a8 8 0 01-8-8m8 8v2m-8-10a8 8 0 018-8m-8 8H4m10-8v2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-[#3E2723] mb-1">Hydration Balance</h3>
                  <div className="text-lg font-light text-[#3E2723]">{getSkinMetrics().hydration.level}</div>
                  <p className="text-sm text-[#3E2723]/70 mt-1">{getSkinMetrics().hydration.message}</p>
                </div>
              </div>
            </div>

            <div className="border-b border-[#3E2723]/10 pb-6">
              <div className="flex items-start space-x-4">
                <div className="p-2">
                  <svg className="w-6 h-6 text-[#3E2723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-[#3E2723] mb-1">Surface Texture</h3>
                  <div className="text-lg font-light text-[#3E2723]">{getSkinMetrics().texture.level}</div>
                  <p className="text-sm text-[#3E2723]/70 mt-1">{getSkinMetrics().texture.message}</p>
                </div>
              </div>
            </div>

            <div className="pb-6">
              <div className="flex items-start space-x-4">
                <div className="p-2">
                  <svg className="w-6 h-6 text-[#3E2723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-[#3E2723] mb-1">Skin Resilience</h3>
                  <div className="text-lg font-light text-[#3E2723]">{getSkinMetrics().elasticity.level}</div>
                  <p className="text-sm text-[#3E2723]/70 mt-1">{getSkinMetrics().elasticity.message}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Treatment Recommendations */}
        <motion.section className="pt-12 pb-12 border-b border-[#3E2723]/10">
          <h2 className="cormorant text-2xl mb-6 text-[#3E2723]">Recommended Treatments</h2>
          <div className="grid grid-cols-3 gap-3">
            {treatments.map((treatment, index) => (
              <motion.button
                key={treatment.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:bg-[#3E2723]/5"
                onClick={() => handleTreatmentClick(treatment)}
              >
                <div className="p-3 flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-2 relative rounded-full overflow-hidden border-2 border-[#3E2723]/10">
                    <img 
                      src={treatment.image} 
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-medium text-2xl mb-1">{treatment.name}</h3>
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{treatment.rating}</span>
                    </div>
                    <div className="mt-0.5 text-sm text-[#3E2723]/60">
                      {treatment.reviews} reviews
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      {treatment.price}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Treatment Information */}
        <motion.section className="pt-12">
          <h2 className="cormorant text-2xl mb-6 text-[#3E2723]">Learn more</h2>
          <div className="divide-y divide-[#3E2723]/10">
            {treatments.map((treatment, index) => (
              <div 
                key={index} 
                className="py-6 hover:transition-all cursor-pointer"
                onClick={() => handleLearnMoreClick(treatment)}
              >
                <h3 className="font-medium text-xl mb-2">{treatment.name}</h3>
                <p className="text-m text-[#3E2723]/80">
                  <span className="text-[#3E2723]">{treatment.description.split('...')[0]}</span>
                  <span className="text-[#3E2723]/60">...more</span>
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default MainPage; 