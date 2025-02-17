import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, Award, BookOpen, Stethoscope, Share2, Heart, Clock } from 'lucide-react';

const DoctorProfile = ({ doctor, onBack, onTreatmentClick }) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const doctorDetails = {
    education: [
      "Harvard Medical School, MD",
      "Stanford University, Dermatology Residency",
      "Board Certified in Dermatology"
    ],
    expertise: [
      "Advanced Skin Cancer Treatment",
      "Cosmetic Dermatology",
      "Laser Therapy",
      "Acne Treatment",
      "Anti-aging Procedures"
    ],
    publications: [
      "Journal of Dermatology, 2023",
      "Skin Research Monthly, 2022",
      "International Dermatology Review, 2021"
    ],
    awards: [
      "Best Dermatologist Award 2023",
      "Excellence in Patient Care 2022",
      "Research Achievement Award 2021"
    ],
    languages: ["English", "Korean", "Spanish"],
    treatments: [
      {
        name: "Botox",
        description: "Expert in natural-looking results",
        experience: "Over 10,000 procedures"
      },
      {
        name: "Filler",
        description: "Specialized in facial contouring",
        experience: "8+ years of experience"
      },
      {
        name: "Laser Treatment",
        description: "Advanced techniques for optimal results",
        experience: "Multiple certification holder"
      }
    ]
  };

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="sticky top-0 bg-white border-b border-luxe-200 z-10">
        <div className="p-4 flex justify-between items-center">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-luxe-500"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Results</span>
          </motion.button>
          <a 
            href={doctor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxe-500 hover:text-luxe-600"
          >
            Visit Website
          </a>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-2xl p-6 shadow-sm border border-luxe-200">
          <div className="flex items-start gap-6">
            <motion.div 
              className="w-32 h-32 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-luxe-900">{doctor.name}</h1>
                  <p className="text-luxe-500">{doctor.title}</p>
                  <p className="text-luxe-600">{doctor.clinic}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{doctor.rating}</span>
                    <a href={doctor.reviews} target="_blank" rel="noopener noreferrer" className="text-luxe-500 ml-1 underline">
                      View Reviews
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-2 text-luxe-500">
                <MapPin className="w-4 h-4" />
                <span className="ml-1">{doctor.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-luxe-200 overflow-hidden">
          <div className="p-6 space-y-8">
            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Education & Training</h3>
              <ul className="space-y-2">
                {doctor.education.map((edu, i) => (
                  <li key={i} className="flex items-center text-luxe-600">
                    <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Areas of Expertise</h3>
              <ul className="space-y-2">
                {doctor.expertise.map((exp, i) => (
                  <li key={i} className="flex items-center text-luxe-600">
                    <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0" />
                    {exp}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang, i) => (
                  <span key={i} className="px-3 py-1 bg-luxe-50 text-luxe-600 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Available Treatments</h3>
              <div className="space-y-4">
                {doctor.treatments.map((treatment, i) => (
                  <div key={i} className="p-4 border border-luxe-200 rounded-xl">
                    <h4 className="font-medium text-luxe-900">{treatment.name}</h4>
                    <p className="text-sm text-luxe-600 mt-1">{treatment.description}</p>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-luxe-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {treatment.time}
                      </span>
                      <span className="text-luxe-900 font-medium">{treatment.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile; 