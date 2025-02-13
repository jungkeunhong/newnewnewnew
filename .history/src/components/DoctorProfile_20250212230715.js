import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, Award, BookOpen, Stethoscope, Share2, Heart } from 'lucide-react';

const DoctorProfile = ({ doctor, onBack }) => {
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
    specializedTreatments: [
      {
        name: "Botox",
        experience: "12+ years",
        cases: "5,000+",
        description: "Specialized in natural-looking results with minimal downtime"
      },
      {
        name: "Filler",
        experience: "10+ years",
        cases: "4,000+",
        description: "Expert in facial contouring and volume restoration"
      },
      {
        name: "Laser Treatment",
        experience: "8+ years",
        cases: "3,000+",
        description: "Advanced techniques for various skin concerns"
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
        <div className="p-4">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-luxe-500"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Treatment</span>
          </motion.button>
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
                  <p className="text-luxe-500">{doctor.specialty}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    className="p-2 border border-luxe-200 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5 text-luxe-500" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center mt-2 text-luxe-500">
                <MapPin className="w-4 h-4" />
                <span className="ml-1">{doctor.distance} miles away</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-luxe-200 overflow-hidden">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Education & Training</h3>
              <ul className="space-y-2">
                {doctorDetails.education.map((edu, i) => (
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
                {doctorDetails.expertise.map((exp, i) => (
                  <li key={i} className="flex items-center text-luxe-600">
                    <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0" />
                    {exp}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Specialized Treatments</h3>
              <div className="space-y-4">
                {doctorDetails.specializedTreatments.map((treatment, i) => (
                  <div key={i} className="bg-luxe-50/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-luxe-900">{treatment.name}</h4>
                      <div className="text-sm text-luxe-600">
                        {treatment.cases} cases
                      </div>
                    </div>
                    <p className="text-sm text-luxe-600 mb-2">{treatment.description}</p>
                    <div className="text-sm text-luxe-500">
                      Experience: {treatment.experience}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Awards & Recognition</h3>
              <ul className="space-y-2">
                {doctorDetails.awards.map((award, i) => (
                  <li key={i} className="flex items-center text-luxe-600">
                    <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                    {award}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-luxe-900 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctorDetails.languages.map((lang, i) => (
                  <span key={i} className="px-3 py-1 bg-luxe-50 text-luxe-600 rounded-full text-sm">
                    {lang}
                  </span>
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