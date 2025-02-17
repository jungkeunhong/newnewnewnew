import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, ChevronRight } from 'lucide-react';
import Analytics from '../utils/analytics';

const DoctorRecommendation = ({ treatment, onBack, onDoctorClick, onTreatmentClick }) => {
  const doctors = [
    {
      id: 'dr-marotta',
      name: "Dr. James C. Marotta, MD",
      title: "Board Certified Facial Plastic Surgeon",
      clinic: "Marotta Facial Plastic Surgery",
      rating: 4.8,
      reviews: 'https://www.google.com/maps/search/?api=1&query=Marotta+Facial+Plastic+Surgery+Smithtown+NY',
      distance: "0.8",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      expertise: ["Botox", "Filler", "Microneedling"],
      education: [
        "BA, Columbia University, New York, NY",
        "MD, SUNY Stony Brook, School of Medicine",
        "Fellowship: Facial Plastic and Reconstructive Surgery, Quatela Center"
      ],
      languages: ["English"],
      location: "895 W. Jericho Tpke., Smithtown, NY",
      website: "https://marottamd.com/",
      treatments: [
        {
          name: "Botox",
          description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
          time: "10–15 minutes",
          price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
        },
        {
          name: "Filler",
          description: "Premium dermal fillers to restore volume and enhance facial contours with natural-looking results",
          time: "30–45 minutes",
          price: "$800-1200 per syringe\nPackage deals available"
        },
        {
          name: "Microneedling",
          description: "Advanced skin rejuvenation treatment to improve texture, reduce scars and stimulate collagen production",
          time: "45–60 minutes",
          price: "Single session: $400\nPackage of 3: $1000"
        }
      ]
    },
    {
      id: 'dr-schwarzburg',
      name: "Dmitriy Schwarzburg, MD",
      title: "Board-Certified Expert in Minimally Invasive Cosmetic & Laser Medicine",
      clinic: "Skinly Aesthetics",
      rating: 4.9,
      reviews: 'https://www.google.com/maps/search/?api=1&query=Skinly+Aesthetics+New+York',
      distance: "1.2",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      expertise: ["Filler", "Microneedling", "Botox"],
      education: [
        "Bachelor's in Molecular Biology, Magna Cum Laude, University of Texas at Dallas",
        "Medical Degree, McGovern Medical School, Houston",
        "Surgical Training, North Shore LIJ Hospital, New York"
      ],
      languages: ["English"],
      location: "157 E 64th St 2nd floor, New York, NY 10065",
      website: "https://skinlyaesthetics.com/",
      treatments: [
        {
          name: "Filler",
          description: "Premium dermal fillers for natural-looking volume enhancement and facial contouring",
          time: "30–45 minutes",
          price: "Lips: $750\nCheeks/Chin: $900-1200"
        },
        {
          name: "Microneedling",
          description: "Advanced skin rejuvenation with RF technology for enhanced collagen production",
          time: "60 minutes",
          price: "Face: $600\nFace & Neck: $800"
        },
        {
          name: "Botox",
          description: "Precise muscle relaxation for natural wrinkle reduction and prevention",
          time: "15–20 minutes",
          price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
        }
      ]
    },
    {
      id: 'dr-ferzli',
      name: "Dr. Georgina Ferzli",
      title: "Board-Certified Dermatologist",
      clinic: "Tribeca MedSpa",
      rating: 4.7,
      reviews: 'https://www.google.com/maps/search/?api=1&query=Tribeca+MedSpa+New+York',
      distance: "1.5",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      expertise: ["Microneedling", "Botox", "Filler"],
      education: [
        "B.S., Georgetown University (2008)",
        "M.S., Georgetown University (2009)",
        "M.D., SUNY Downstate Medical Center (2013)"
      ],
      languages: ["English"],
      location: "114 Hudson St, New York, NY 10013",
      website: "https://www.tribecamedspa.com/",
      treatments: [
        {
          name: "Microneedling",
          description: "Premium RF microneedling treatment for skin rejuvenation and texture improvement",
          time: "60–75 minutes",
          price: "Single session: $700\nPackage of 3: $1800"
        },
        {
          name: "Botox",
          description: "Customized treatment for natural-looking wrinkle reduction",
          time: "15–20 minutes",
          price: "$18 per unit (min 20 units)\nFirst-time offer: $50 discount"
        },
        {
          name: "Filler",
          description: "Expert facial contouring using premium dermal fillers",
          time: "30–45 minutes",
          price: "Per syringe: $850-1000\nMultiple area discount available"
        }
      ]
    }
  ];

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
    <div className="min-h-screen bg-white pt-16 pb-20">
      <div className="p-4 space-y-6">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Top {treatment?.name} Specialists</h2>
          <p className="text-luxe-600 text-sm">Discover the best specialists for {treatment?.name.toLowerCase()}</p>
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
    </div>
  );
};

export default DoctorRecommendation; 