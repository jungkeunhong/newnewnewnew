import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin } from 'lucide-react';
import Analytics from '../utils/analytics';

const DoctorRecommendation = ({ treatment, onBack, onDoctorClick, onTreatmentClick }) => {
  const doctors = [
    {
      id: 'dr-kim',
      name: "Dr. Sarah Kim",
      specialty: "Dermatologist",
      expertise: ["Botox", "Filler", "Laser"],
      rating: 4.9,
      reviews: 528,
      distance: "0.8",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      education: ["Harvard Medical School", "Stanford Residency"],
      languages: ["English", "Korean"],
      location: "Upper East Side, NYC"
    },
    {
      id: 'dr-chen',
      name: "Dr. Michael Chen",
      specialty: "Cosmetic Dermatologist",
      expertise: ["Laser", "Anti-aging", "Acne"],
      rating: 4.8,
      reviews: 423,
      distance: "1.2",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      education: ["Yale Medical School", "UCLA Residency"],
      languages: ["English", "Chinese"],
      location: "Midtown, NYC"
    },
    {
      id: 'dr-patel',
      name: "Dr. Priya Patel",
      specialty: "Medical Aesthetician",
      expertise: ["Skin Rejuvenation", "Chemical Peels", "Microneedling"],
      rating: 4.7,
      reviews: 389,
      distance: "1.5",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      education: ["Columbia Medical School", "NYU Residency"],
      languages: ["English", "Hindi"],
      location: "Downtown, NYC"
    }
  ];

  const handleDoctorClick = (doctor) => {
    // 의사 프로필 클릭 이벤트 트래킹
    Analytics.track('doctor_profile_click', {
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_specialty: doctor.specialty,
      doctor_expertise: doctor.expertise,
      doctor_rating: doctor.rating,
      doctor_reviews: doctor.reviews,
      doctor_location: doctor.location,
      doctor_languages: doctor.languages,
      doctor_education: doctor.education,
      treatment_context: treatment?.name || 'general',
      section: 'doctor_recommendation'
    });

    if (onDoctorClick) {
      onDoctorClick(doctor);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center text-[#3E2723]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Treatment</span>
          </button>
          <button 
            onClick={() => onTreatmentClick('main')} 
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="cormorant text-3xl mb-4">Top Specialists for {treatment.name}</h1>
          <p className="text-[#3E2723]/80">
          Find the best {treatment.name} specialists near you with proven expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {doctors.map((doctor, index) => (
            <motion.button
              key={doctor.id}
              className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              onClick={() => handleDoctorClick(doctor)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <div className="flex p-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 ml-6 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-[#3E2723]">{doctor.name}</h3>
                      <p className="text-[#3E2723]/60">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-[#3E2723]/60 ml-1">({doctor.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center text-[#3E2723]/60">
                    <MapPin className="w-4 h-4" />
                    <span className="ml-1">{doctor.distance}km away</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {doctor.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#3E2723]/5 text-[#3E2723] rounded-full text-xs"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorRecommendation; 