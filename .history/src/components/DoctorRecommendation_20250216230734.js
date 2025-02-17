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
        image: "",
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

  const doctors = treatment.id.toLowerCase() === 'botox' ? doctorsByTreatment.botox :
                 treatment.id.toLowerCase() === 'filler' ? doctorsByTreatment.filler :
                 treatment.id.toLowerCase() === 'microneedling' ? doctorsByTreatment.microneedling :
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
        <h1 className="ml-4 text-xl font-semibold">{treatment.name} Specialists</h1>
      </div>
      <div className="p-4 space-y-6">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Top {treatment.name} Specialists</h2>
          <p className="text-luxe-600 text-sm">Discover the best specialists for {treatment.name.toLowerCase()}</p>
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