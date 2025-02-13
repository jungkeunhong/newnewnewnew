import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin } from 'lucide-react';

const TreatmentDetail = ({ treatment, onBack, onDoctorClick }) => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Kim",
      clinic: "Aesthetic Clinic",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      rating: 4.9,
      reviews: 528,
      distance: "0.8",
      expertise: ["Botox", "Filler", "Laser"],
      description: "Over 10 years of experience in aesthetic procedures with a focus on natural-looking results.",
      education: [
        "Seoul National University Medical School",
        "American Board of Dermatology",
        "Korean Dermatological Association"
      ]
    },
    {
      id: 2,
      name: "Dr. Emily Lee",
      clinic: "Beauty Medical Center",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      rating: 4.8,
      reviews: 423,
      distance: "1.2",
      expertise: ["Anti-aging", "Skin Regeneration", "Laser"],
      description: "Specialized in personalized treatment programs for optimal results.",
      education: [
        "Yonsei University Medical School",
        "Korean Society of Plastic Surgery",
        "Asian Society of Plastic Surgery"
      ]
    },
    {
      id: 3,
      name: "Dr. Jennifer Park",
      clinic: "La Porte Clinic",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
      rating: 4.7,
      reviews: 389,
      distance: "1.5",
      expertise: ["Skin Care", "Laser", "Lifting"],
      description: "Combines latest technology with extensive experience for safe and effective treatments.",
      education: [
        "Korea University Medical School",
        "Korean Dermatological Association",
        "Laser Society Member"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-[#3E2723]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto space-y-12">
        {/* Treatment Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="aspect-video rounded-2xl overflow-hidden mb-6">
            <img 
              src={treatment.image} 
              alt={treatment.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="cormorant text-3xl mb-4">{treatment.name}</h1>
          <p className="text-[#3E2723]/80 leading-relaxed mb-6">
            {treatment.description}
          </p>

          <div className="flex items-center justify-between p-4 bg-[#3E2723]/5 rounded-xl mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="ml-2 font-medium">{treatment.rating}</span>
              <span className="text-[#3E2723]/60 ml-1">
                ({treatment.reviews} reviews)
              </span>
            </div>
            <div className="font-medium">{treatment.price}</div>
          </div>
        </motion.section>

        {/* Treatment Details */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="cormorant text-2xl">About the Treatment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Benefits</h3>
              <ul className="space-y-2">
                {treatment.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-[#3E2723]/80">
                    <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Precautions</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  No alcohol 24 hours before treatment
                </li>
                <li className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  No makeup on treatment area
                </li>
                <li className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  Consult if pregnant/nursing
                </li>
                <li className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  Inform about recent treatments
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Recommended Doctors */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="cormorant text-2xl">Recommended Specialists</h2>
          <div className="space-y-4">
            {doctors.map((doctor, index) => (
              <motion.button
                key={doctor.id}
                className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => onDoctorClick(doctor)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <div className="flex p-4">
                  <div className="w-24 h-24">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{doctor.name}</h3>
                        <p className="text-sm text-[#3E2723]/60">
                          {doctor.clinic}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-[#3E2723]/60 ml-1">
                        ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-[#3E2723]/60">
                      <MapPin className="w-4 h-4" />
                      <span className="ml-1">{doctor.distance}km</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {doctor.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-[#3E2723]/5 rounded-full"
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
        </motion.section>
      </div>
    </div>
  );
};

export default TreatmentDetail; 