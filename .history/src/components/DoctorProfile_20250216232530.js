import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ChevronLeft } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

const DoctorProfile = ({ doctor, onBack }) => {
  const handleClinicClick = () => {
    const encodedClinic = encodeURIComponent(doctor.clinic);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedClinic}`, '_blank');
  };

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ScrollToTop />
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-luxe-500"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button 
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" />
        </div>
      </div>

      <div className="pt-20 px-4 space-y-2 divide-y divide-gray-300">
        <div className="bg-white py-4" onClick={handleClinicClick}>
          <div className="flex items-start gap-4">
            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm text-luxe-600">{doctor.name}</p>
              <p className="text-xs text-luxe-500">{doctor.title}</p>
              <p className="text-xs text-luxe-500">{doctor.clinic}</p>
              <div className="flex items-center mt-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="ml-1 text-xs">{doctor.rating}</span>
                <a href={doctor.reviews} target="_blank" rel="noopener noreferrer" className="text-luxe-500 ml-1 text-xs underline">
                  Reviews
                </a>
              </div>
              <div className="flex items-center mt-1 text-xs text-luxe-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{doctor.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <p className="text-xs text-luxe-600 leading-relaxed">
            {doctor.intro || "A highly skilled and experienced medical professional specializing in aesthetic treatments and patient-centered care."}
          </p>
        </div>

        <div className="py-4">
          <h3 className="text-base font-medium text-luxe-900 mb-3">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.expertise.map((exp, i) => (
              <span key={i} className="px-3 py-1 bg-luxe-50 text-luxe-600 rounded-full text-xs">
                {exp}
              </span>
            ))}
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-base font-medium text-luxe-900 mb-3">Education & Training</h3>
          <div className="space-y-2">
            {doctor.education.map((edu, i) => (
              <p key={i} className="text-xs text-luxe-600">{edu}</p>
            ))}
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-base font-medium text-luxe-900 mb-3">Available Treatments</h3>
          <div className="divide-y divide-gray-200">
            {doctor.treatments.map((treatment, i) => (
              <div key={i} className="py-3">
                <h4 className="text-base font-medium text-luxe-900">{treatment.name}</h4>
                <p className="text-xs text-luxe-600 mt-1">{treatment.description}</p>
                <div className="flex justify-between items-start mt-2 text-xs">
                  <span className="text-luxe-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {treatment.time.replace('minutes', 'min')}
                  </span>
                  <span className="text-luxe-900 font-medium text-right">
                    {treatment.price.includes('\n') 
                      ? treatment.price.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))
                      : treatment.price
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-base font-medium text-luxe-900 mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang, i) => (
              <span key={i} className="px-3 py-1 bg-luxe-50 text-luxe-600 rounded-full text-xs">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile; 