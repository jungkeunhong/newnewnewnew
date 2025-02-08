import React from 'react';
import { ChevronLeft, Star, MapPin, Calendar, Clock, Phone, Mail, Award, BookOpen, Stethoscope, MessageSquare } from 'lucide-react';
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
      className="min-h-screen bg-white"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="p-4 space-y-6">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 text-luxe-500"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </motion.button>

        <div className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-2xl p-6 shadow-sm border border-luxe-200">
          <div className="flex items-start gap-6">
            <motion.div 
              className="w-32 h-32 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-luxe-900">{doctor.name}</h1>
              <p className="text-luxe-500">{doctor.specialty}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="ml-1 font-medium">{doctor.rating}</span>
                <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
              </div>
              <div className="flex items-center mt-2 text-luxe-500">
                <MapPin className="w-4 h-4" />
                <span className="ml-1">{doctor.distance} miles away</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.button
              className="flex-1 bg-gradient-to-r from-luxe-400 to-luxe-300 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </motion.button>
            <motion.button
              className="flex-1 border border-luxe-200 py-3 px-4 rounded-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="w-5 h-5 text-luxe-500" />
              <span className="text-luxe-500">Message</span>
            </motion.button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-luxe-200">
            <h2 className="text-lg font-semibold text-luxe-900 mb-4">About</h2>
            <p className="text-gray-600">
              Dr. {doctor.name.split(' ')[1]} is a board-certified dermatologist with over 10 years of experience in treating various skin conditions. Specializing in acne treatment and anti-aging procedures, they provide personalized care using the latest technologies and evidence-based approaches.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-luxe-200">
            <h2 className="text-lg font-semibold text-luxe-900 mb-4">Availability</h2>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 border border-luxe-100 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-luxe-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-luxe-500" />
                    </div>
                    <div>
                      <div className="font-medium text-luxe-900">{day}</div>
                      <div className="text-sm text-luxe-500">9:00 AM - 5:00 PM</div>
                    </div>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-luxe-50 text-luxe-500 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-luxe-200">
            <h2 className="text-lg font-semibold text-luxe-900 mb-4">Location & Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-luxe-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-luxe-500" />
                </div>
                <div>
                  <div className="font-medium text-luxe-900">Office Address</div>
                  <div className="text-sm text-luxe-500">123 Medical Center Dr, Suite 100</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-luxe-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-luxe-500" />
                </div>
                <div>
                  <div className="font-medium text-luxe-900">Phone Number</div>
                  <div className="text-sm text-luxe-500">(555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile; 