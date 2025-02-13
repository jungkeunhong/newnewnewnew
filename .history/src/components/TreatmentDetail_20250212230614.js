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

  const treatmentDetails = {
    description: "Botox is a safe and effective treatment that temporarily reduces or eliminates facial fine lines and wrinkles. The procedure involves injecting purified botulinum toxin into specific muscles to relax them.",
    benefits: [
      "Reduces appearance of fine lines and wrinkles",
      "Prevents formation of new wrinkles",
      "Quick procedure with minimal downtime",
      "Results last 3-4 months",
      "Can treat multiple areas in one session"
    ],
    precautions: [
      "No alcohol 24 hours before and after treatment",
      "Avoid blood thinning medications for 1 week prior",
      "No facial massages for 2 weeks after treatment",
      "Avoid strenuous exercise for 24 hours",
      "Stay upright for 4 hours after treatment"
    ],
    procedure: [
      "Consultation and facial assessment",
      "Marking of injection points",
      "Quick injections with fine needle",
      "15-20 minute procedure",
      "Results visible within 3-7 days"
    ]
  };

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
            {treatmentDetails.description}
          </p>
        </motion.section>

        {/* Treatment Details */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6">
            <h2 className="cormorant text-2xl">Benefits</h2>
            <ul className="space-y-2">
              {treatmentDetails.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="cormorant text-2xl">Procedure</h2>
            <ul className="space-y-2">
              {treatmentDetails.procedure.map((step, index) => (
                <li key={index} className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="cormorant text-2xl">Important Precautions</h2>
            <ul className="space-y-2">
              {treatmentDetails.precautions.map((precaution, index) => (
                <li key={index} className="flex items-center text-[#3E2723]/80">
                  <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                  {precaution}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Top 3 Specialists */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="cormorant text-2xl">Top 3 Specialists</h2>
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
                  <div className="flex-1 ml-4 text-left">
                    <div>
                      <h3 className="font-medium text-lg">{doctor.name}</h3>
                      <p className="text-sm text-[#3E2723]/60">
                        {doctor.clinic}
                      </p>
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