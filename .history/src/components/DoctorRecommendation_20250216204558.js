import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, ChevronRight } from 'lucide-react';
import Analytics from '../utils/analytics';

const DoctorRecommendation = ({ treatment, onBack, onDoctorClick, onTreatmentClick }) => {
  const doctorsByTreatment = {
    botox: [
      {
        id: 'dr-marotta',
        name: "Dr. James C. Marotta, MD",
        title: "Board Certified Facial Plastic Surgeon",
        clinic: "Marotta Facial Plastic Surgery",
      rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Marotta+Facial+Plastic+Surgery+Smithtown+NY',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREofNWqHa3Yj0_h_FE7O1PkVdYTNIwd3u8cw&s",
        expertise: ["Botox", "Active FX", "Laser"],
        education: [
          "BA, Columbia University, New York, NY",
          "MD, SUNY Stony Brook, School of Medicine",
          "Fellowship: Facial Plastic and Reconstructive Surgery, Quatela Center"
        ],
        intro: "Expertise. Innovation. Compassionate care. The primary reasons Dr. Marotta has been consistently named Best Cosmetic Surgeon on Long Island can be found in his commitment to his patients. Combined with his dual-board certification, his Ivy League education and his impeccable credentials.",
        languages: ["English"],
        location: "895 W. Jericho Tpke., Smithtown, NY",
        website: "https://marottamd.com/",
        treatments: [
          {
            name: "Botox",
            description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
            time: "10–15 minutes",
            price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
          }
        ]
      },
      {
        id: 'dr-schwarzburg',
        name: "Dmitriy Schwarzburg, MD",
        title: "Board-Certified Expert in Minimally Invasive Cosmetic & Laser Medicine",
        clinic: "Skinly Aesthetics",
        rating: 4.6,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Skinly+Aesthetics+New+York',
        image: "data:image/jpeg;base64,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",
        expertise: ["Medical Aesthetics", "Skin Rejuvenation", "Facial Electrical Treatments", "Collagen Stimulation"],
        intro: "Diana Seo is the founder of Collagen Bar, a premier medical aesthetic and skincare clinic with locations in Westchester and NYC. With over 15 years of experience in health, medical, and beauty fields, she specializes in advanced skincare solutions.",
        education: [
          "B.S. in Biophysics, Minor in Chemistry & Mathematics, University of Connecticut",
          "Licensed Esthetician, Atelier Esthétique Institute of Esthetics"
        ],
        languages: ["English", "Korean"],
        location: "New York, NY",
        website: "https://collagenbar.com/",
        treatments: [
          {
            name: "Morpheus8 RF Microneedling",
            description: "A fractional radiofrequency (RF) microneedling treatment that stimulates collagen production, remodels skin, and contours the face and body by penetrating up to 4mm deep for superior skin tightening and fat reduction.",
            time: "30–60 minutes",
            price: "$1,150.00"
          }
        ]
      }
    ]
  };

  const doctors = treatment?.name?.toLowerCase() === 'botox' ? doctorsByTreatment.botox :
                 treatment?.name?.toLowerCase() === 'filler' ? doctorsByTreatment.filler :
                 treatment?.name?.toLowerCase() === 'microneedling' ? doctorsByTreatment.microneedling :
                 doctorsByTreatment.botox;

  const handleDoctorClick = (doctor) => {
    Analytics.track('doctor_profile_click', {
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_title: doctor.title,
      doctor_clinic: doctor.clinic,
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

  const handleLocationClick = (doctor) => {
    Analytics.track('location_click', {
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_location: doctor.location,
      treatment_context: treatment?.name || 'general',
      section: 'doctor_recommendation'
    });

    // Google 지도 URL 생성
    const encodedAddress = encodeURIComponent(doctor.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-white"
    >
      <div className="sticky top-0 z-50 flex items-center px-4 py-2 bg-white border-b">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="ml-4 text-xl font-semibold">{treatment} Specialists</h1>
      </div>
      <div className="p-4 space-y-6">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Top {treatment?.name} Specialists</h2>
          <p className="text-luxe-600 text-sm">Discover the best specialists for {treatment?.name.toLowerCase()}</p>
      </div>

        <div className="space-y-4 divide-y divide-gray-400">
          {doctors.map((doctor) => (
        <motion.div
              key={doctor.id}
              className="bg-white p-4 first:pt-0 hover:cursor-pointer relative"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="flex items-start gap-4">
                <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-luxe-900">{doctor.name}</h3>
                  <p className="text-sm text-luxe-600">{doctor.title}</p>
                  <p className="text-xs text-luxe-500">{doctor.clinic}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm">{doctor.rating}</span>
                    <a href={doctor.reviews} target="_blank" rel="noopener noreferrer" className="text-luxe-500 ml-1 text-sm underline">Reviews</a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.expertise.map((exp, i) => (
                      <span key={i} className="text-xs bg-luxe-50 text-luxe-600 px-2 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center mt-2 text-xs text-luxe-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLocationClick(doctor);
                      }}
                      className="cursor-pointer hover:text-luxe-800 hover:underline"
                    >
                      {doctor.location}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-luxe-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorRecommendation; 