import React from 'react';
import { ChevronLeft, Star, MapPin, Calendar, Clock, Phone, Mail, Award, BookOpen, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorProfile = ({ doctor, onBack }) => {
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
    ]
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center space-x-2 text-purple-600 mb-6"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Results</span>
      </motion.button>

      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        variants={fadeIn}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-6">
          <motion.div 
            className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-100"
            whileHover={{ scale: 1.05 }}
          >
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {doctor.name}
            </h1>
            <p className="text-purple-600 font-medium mt-1">{doctor.specialty}</p>
            <div className="flex items-center mt-2 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1">{doctor.rating}</span>
              <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="ml-1">{doctor.distance} miles away</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Available Times</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"].map((time, i) => (
              <motion.button
                key={i}
                className="p-2 text-sm border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Contact Information</h3>
          </div>
          <div className="space-y-2">
            <p className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              (555) 123-4567
            </p>
            <p className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              dr.smith@clinic.com
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm md:col-span-2"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Stethoscope className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Expertise & Background</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-purple-600 mb-2">Education</h4>
              <ul className="space-y-2">
                {doctorDetails.education.map((edu, i) => (
                  <motion.li
                    key={i}
                    className="text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                  >
                    • {edu}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-600 mb-2">Areas of Expertise</h4>
              <ul className="space-y-2">
                {doctorDetails.expertise.map((exp, i) => (
                  <motion.li
                    key={i}
                    className="text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                  >
                    • {exp}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Publications</h3>
          </div>
          <ul className="space-y-2">
            {doctorDetails.publications.map((pub, i) => (
              <motion.li
                key={i}
                className="text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
              >
                • {pub}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm"
          variants={fadeIn}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Awards & Recognition</h3>
          </div>
          <ul className="space-y-2">
            {doctorDetails.awards.map((award, i) => (
              <motion.li
                key={i}
                className="text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (i * 0.1) }}
              >
                • {award}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile; 