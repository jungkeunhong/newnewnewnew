import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, Clock } from 'lucide-react';

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
      <div className="sticky top-0 bg-white z-10">
        <div className="p-4 flex justify-between items-center">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-luxe-500"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
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
        <div className="bg-white p-6" onClick={handleClinicClick}>
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

        <div className="p-4">
          <p className="text-sm text-luxe-600 leading-relaxed">
            {doctor.intro || "A highly skilled and experienced medical professional specializing in aesthetic treatments and patient-centered care."}
          </p>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-luxe-900 mb-3">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.expertise.map((exp, i) => (
              <span key={i} className="px-3 py-1 bg-luxe-50 text-luxe-600 rounded-full text-xs">
                {exp}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-luxe-900 mb-3">Education & Training</h3>
          <div className="space-y-2">
            {doctor.education.map((edu, i) => (
              <p key={i} className="text-xs text-luxe-600">{edu}</p>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-luxe-900 mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang, i) => (
              <span key={i} className="px-3 py-1 bg-luxe-50 text-luxe-600 rounded-full text-xs">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-luxe-900 mb-3">Available Treatments</h3>
          <div className="space-y-4">
            {doctor.treatments.map((treatment, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-sm font-medium text-luxe-900">{treatment.name}</h4>
                <p className="text-xs text-luxe-600">{treatment.description}</p>
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-luxe-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {treatment.time}
                  </span>
                  <span className="text-luxe-900 font-medium">{treatment.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile; 