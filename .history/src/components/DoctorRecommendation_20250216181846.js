import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin } from 'lucide-react';
import Analytics from '../utils/analytics';

const DoctorRecommendation = ({ treatment, onBack, onDoctorClick, onTreatmentClick }) => {
  const doctors = [
    {
      id: 'dr-marotta',
      name: "Dr. James C. Marotta, MD",
      title: "Board Certified Facial Plastic Surgeon",
      clinic: "Marotta Facial Plastic Surgery",
      rating: 4.9,
      reviews: 'https://maps.app.goo.gl/SZik9u8wkiFev1xd9',
      distance: "0.8",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      expertise: ["Botox", "Active FX", "Laser"],
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
          price: "Contact for pricing"
        },
        {
          name: "Active FX",
          description: "A fractional CO₂ laser treatment that resurfaces the skin to improve texture, reduce wrinkles, and treat pigmentation",
          time: "30–45 minutes",
          price: "Contact for pricing"
        },
        {
          name: "Juvederm",
          description: "A dermal filler that restores volume, smooths wrinkles, and enhances facial contours using hyaluronic acid",
          time: "15–30 minutes",
          price: "Contact for pricing"
        }
      ]
    },
    {
      id: 'dr-schwarzburg',
      name: "Dmitriy Schwarzburg, MD",
      title: "Board-Certified Expert in Minimally Invasive Cosmetic & Laser Medicine",
      clinic: "Skinly Aesthetics",
      rating: 4.6,
      reviews: 'https://maps.app.goo.gl/8KC3pQMQak6HnY2u6',
      distance: "1.2",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      expertise: ["Botox", "Juvederm", "Active FX"],
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
          name: "Botox",
          description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
          time: "10–15 minutes",
          price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
        },
        {
          name: "Microneedling",
          description: "A collagen-boosting treatment that improves skin texture, reduces scars, and enhances overall skin tone",
          time: "30–60 minutes",
          price: "$300 to $600"
        },
        {
          name: "Skin Boosters",
          description: "An injectable treatment that deeply hydrates, improves elasticity, and enhances skin radiance",
          time: "20–30 minutes",
          price: "Single: $800\n2 treatments: $1,400\n3 treatments: $1,800"
        }
      ]
    },
    {
      id: 'dr-ferzli',
      name: "Dr. Georgina Ferzli",
      title: "Board-Certified Dermatologist",
      clinic: "Tribeca MedSpa",
      rating: 4.8,
      reviews: 'https://maps.app.goo.gl/SZik9u8wkiFev1xd9',
      distance: "1.5",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      expertise: ["Botox", "Laser Resurfacing", "Acne Scar Treatment", "Skin Tightening"],
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
          name: "Botox",
          description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
          time: "10–15 minutes",
          price: "$1260 ($18 per unit, 70 units)\nFirst-time offer: $50 discount"
        },
        {
          name: "GLOW Facial Treatment",
          description: "A comprehensive medical facial designed to prep your skin for big events",
          time: "105 minutes",
          price: "$1,000"
        },
        {
          name: "AviClear",
          description: "A three-step acne treatment designed to target the root cause of acne",
          time: "N/A",
          price: "$4,825"
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

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">Top {treatment?.name} Specialists</h2>
          <p className="text-luxe-600">Discover the best specialists for {treatment?.name.toLowerCase()}</p>
        </div>

        <div className="space-y-4">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-xl border border-luxe-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleDoctorClick(doctor)}
              whileHover={{ scale: 1.02 }}
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
                    <a href={doctor.reviews} target="_blank" rel="noopener noreferrer" className="text-luxe-500 ml-1 text-sm underline">View Reviews</a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.expertise.map((exp, i) => (
                      <span key={i} className="text-xs bg-luxe-50 text-luxe-600 px-2 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-luxe-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>
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