import React, { useState } from 'react';
import { ChevronLeft, Star, MapPin, Calendar, Clock, Phone, Mail, Award, BookOpen, Stethoscope, MessageSquare, Video, Share2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DoctorProfile = ({ doctor, onBack }) => {
  const [selectedTab, setSelectedTab] = useState('about');
  const [showBookingModal, setShowBookingModal] = useState(false);

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
        name: "Hydrafacial",
        duration: "60 min",
        price: "$299",
        description: "Deep cleansing and hydration treatment"
      },
      {
        name: "Chemical Peel",
        duration: "45 min",
        price: "$199",
        description: "Skin resurfacing and rejuvenation"
      },
      {
        name: "Laser Treatment",
        duration: "30 min",
        price: "$399",
        description: "Advanced skin correction"
      }
    ],
    reviews: [
      {
        author: "Sarah K.",
        rating: 5,
        date: "2 weeks ago",
        text: "Dr. Smith is amazing! She really took the time to understand my concerns..."
      },
      {
        author: "Michael R.",
        rating: 5,
        date: "1 month ago",
        text: "Very professional and knowledgeable. The treatment plan worked perfectly..."
      }
    ]
  };

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' }
  ];

  const BookingModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-luxe-600 mb-1">
              Select Treatment
            </label>
            <select className="w-full p-3 border border-luxe-200 rounded-xl">
              {doctorDetails.treatments.map((treatment, i) => (
                <option key={i} value={treatment.name}>
                  {treatment.name} - {treatment.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-luxe-600 mb-1">
              Select Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-luxe-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-luxe-600 mb-1">
              Select Time
            </label>
            <select className="w-full p-3 border border-luxe-200 rounded-xl">
              {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time, i) => (
                <option key={i} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <motion.button
            className="w-full p-4 bg-gradient-to-r from-luxe-400 to-luxe-300 text-white rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Booking
          </motion.button>
          <button
            className="w-full p-4 text-luxe-500"
            onClick={() => setShowBookingModal(false)}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      className="min-h-screen bg-white pb-20"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
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
            <span>Back to Results</span>
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
                    <Heart className="w-5 h-5 text-luxe-500" />
                  </motion.button>
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

              <div className="mt-4 grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setShowBookingModal(true)}
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
                  <Video className="w-5 h-5 text-luxe-500" />
                  <span className="text-luxe-500">Virtual Consult</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-luxe-200 overflow-hidden">
          <div className="flex border-b border-luxe-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 py-4 text-center relative ${
                  selectedTab === tab.id ? 'text-luxe-500' : 'text-luxe-400'
                }`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
                {selectedTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxe-500"
                    layoutId="tab-indicator"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
            >
              {selectedTab === 'about' && (
                <div className="space-y-6">
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
              )}

              {selectedTab === 'treatments' && (
                <div className="space-y-4">
                  {doctorDetails.treatments.map((treatment, i) => (
                    <motion.div
                      key={i}
                      className="p-4 border border-luxe-200 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-luxe-900">{treatment.name}</h3>
                          <p className="text-sm text-luxe-500">{treatment.description}</p>
                          <div className="flex items-center mt-2 text-sm text-luxe-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {treatment.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-luxe-900">{treatment.price}</div>
                          <motion.button
                            className="mt-2 px-3 py-1 bg-luxe-50 text-luxe-500 rounded-lg text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowBookingModal(true)}
                          >
                            Book Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-4">
                  {doctorDetails.reviews.map((review, i) => (
                    <motion.div
                      key={i}
                      className="p-4 border border-luxe-200 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-luxe-900">{review.author}</h3>
                          <div className="flex items-center mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-luxe-500">{review.date}</span>
                      </div>
                      <p className="text-luxe-600">{review.text}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === 'location' && (
                <div className="space-y-4">
                  <div className="h-64 bg-luxe-50 rounded-xl">
                    {/* Map component would go here */}
                  </div>
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
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-luxe-50 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-luxe-500" />
                      </div>
                      <div>
                        <div className="font-medium text-luxe-900">Email</div>
                        <div className="text-sm text-luxe-500">doctor@example.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showBookingModal && <BookingModal />}
      </AnimatePresence>
    </motion.div>
  );
};

export default DoctorProfile; 