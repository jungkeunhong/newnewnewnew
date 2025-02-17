import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, ChevronRight } from 'lucide-react';
import Analytics from '../utils/analytics';

const DoctorRecommendation = ({ treatment, onBack, onDoctorClick, onTreatmentClick }) => {
  const doctorsByTreatment = {
    botox: [
      {
        id: 'dr-marotta',
        name: "Dr. James C. Marotta, MD",
        title: "Board Certified Facial Plastic Surgeon",
        clinic: "Marotta Facial Plastic Surgery",
      rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Marotta+Facial+Plastic+Surgery+Smithtown+NY',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREofNWqHa3Yj0_h_FE7O1PkVdYTNIwd3u8cw&s",
        expertise: ["Botox", "Active FX", "Laser"],
        education: [
          "BA, Columbia University, New York, NY",
          "MD, SUNY Stony Brook, School of Medicine",
          "Fellowship: Facial Plastic and Reconstructive Surgery, Quatela Center"
        ],
        intro: "Expertise. Innovation. Compassionate care. The primary reasons Dr. Marotta has been consistently named Best Cosmetic Surgeon on Long Island can be found in his commitment to his patients. Combined with his dual-board certification, his Ivy League education and his impeccable credentials.",
        languages: ["English"],
        location: "895 W. Jericho Tpke., Smithtown, NY",
        website: "https://marottamd.com/",
        treatments: [
          {
            name: "Botox",
            description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
            time: "10–15 minutes",
            price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
          }
        ]
      },
      {
        id: 'dr-schwarzburg',
        name: "Dmitriy Schwarzburg, MD",
        title: "Board-Certified Expert in Minimally Invasive Cosmetic & Laser Medicine",
        clinic: "Skinly Aesthetics",
        rating: 4.6,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Skinly+Aesthetics+New+York',
        image: "https://skinlyaesthetics.com/wp-content/uploads/2024/03/Dr.-Schwarzburg-MD-best-cosmetic-dermatologist.jpg",
        expertise: ["Botox", "Juvederm", "Active FX"],
        intro: "Dr. Schwarzburg is a top cosmetic expert in NYC, specializing in minimally invasive treatments to enhance natural beauty.",
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
        rating: 4.8,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Tribeca+MedSpa+New+York',
        image: "https://www.tribecamedspa.com/wp-content/uploads/2023/12/Dr-Georgina-Ferzli-MD-MS-FAAD-Director-of-Cosmetic-Dermatology.jpeg",
        expertise: ["Botox", "Laser Resurfacing", "Acne Scar Treatment", "Skin Tightening"],
        intro: "Dr. Ferzli is a top dermatologist in NYC, specializing in cosmetic and laser dermatology.",
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
          }
        ]
      }
    ],
    filler: [
      {
        id: 'james-christian',
        name: "James Christian",
        title: "Authorized Vampire Facelift® Professional, Injectable Expert & Certified Galderma Trainer",
        clinic: "James Christian Cosmetics",
      rating: 4.8,
        reviews: 'https://www.google.com/maps/search/?api=1&query=James+Christian+Cosmetics',
        image: "https://jameschristiancosmetics.com/wp-content/uploads/jcc-img-profile.jpg",
        expertise: ["Injections", "Botox", "Filler"],
        intro: "James Christian is the Director of Operations and founder of James Christian Cosmetics, specializing in injectable fillers, muscle relaxants, and advanced aesthetic techniques.",
        education: [
          "B.S., Florida Atlantic University",
          "Allied Health Sciences, Touro College",
          "Physician Assistant License",
          "Advanced training under top plastic surgeons in NYC"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://jameschristiancosmetics.com/",
        treatments: [
          {
            name: "Sculptra Filler",
            description: "Help replenish facial volume that has been lost due to aging with a Sculptra 1cc filler treatment.",
            time: "30–60 minutes",
            price: "$900 - 1 Vial\n$1700- 2 Vials\n$2400- 3 Vials\n$2600- 4 Vials"
          }
        ]
      },
      {
        id: 'julija-dimante',
        name: "Julija DiMante, RN, BSN",
        title: "Founder & CEO of Diamond Advanced Aesthetics, Board-Certified Registered Nurse",
        clinic: "Diamond Advanced Aesthetics",
        rating: 5.0,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Diamond+Advanced+Aesthetics',
        image: "https://diamondadvancedaesthetics.com/storage/2024/04/julija-dimante-by-diamond-advanced-aesthetics-in-new-york-ny.webp",
        expertise: ["Injectable Fillers", "Botox", "Natural Aesthetic Enhancements", "Skin Rejuvenation"],
        intro: "Julija DiMante is a skilled injector and aesthetic expert, known for delivering natural and transformative results. She is the founder of Diamond Advanced Aesthetics and an educator in the aesthetics industry.",
        education: [
          "Board-Certified Registered Nurse (RN, BSN)",
          "Founder & CEO of Diamond Advanced Aesthetics",
          "Master Trainer for Suneva Medical",
          "Speaker for Candela"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://diamondadvancedaesthetics.com/",
        treatments: [
          {
            name: "Restylane Contour",
            description: "It is ideal for enhancing cheek volume and correcting deficiencies in midface contour.",
            time: "30–60 minutes",
            price: "$900 (per syringe)"
          }
        ]
      },
      {
        id: 'dr-vivian-chin',
        name: "Dr. Vivian Chin, MD, MPH",
        title: "Cosmetic Physician, Skin & Wellness Expert",
        clinic: "Vivian Chin MD",
        rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Vivian+Chin+MD',
        image: "https://korunyc.com/wp-content/uploads/2017/06/chin.jpg",
        expertise: ["Skin Rejuvenation", "Holistic Medicine", "Personalized Skincare"],
        intro: "Dr. Vivian Chin is a cosmetic physician specializing in skin care, wellness aesthetics, and holistic beauty. She combines medical expertise with aesthetic training to provide personalized skin care regimens.",
        education: [
          "B.A., Vassar College",
          "MPH, Columbia University Mailman School of Public Health",
          "M.D., New York University School of Medicine"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://vivianchinmd.com/",
        treatments: [
          {
            name: "Dermal Filler",
            description: "Dermal fillers restore volume, smooth wrinkles, and enhance facial contours with results lasting 6–18 months.",
            time: "30–60 minutes",
            price: "Syringe Price: $800 – $1,000 each\nPartial Syringe: $595"
          }
        ]
      }
    ],
    microneedling: [
      {
        id: 'samantha-danesi',
        name: "Samantha Danesi, RPA-C, LMT",
        title: "Certified Physician Assistant (RPA-C)",
        clinic: "Samantha Danesi Aesthetics",
      rating: 4.7,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Samantha+Danesi+Aesthetics',
        image: "data:image/jpeg;base64,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",
        expertise: ["Advanced cosmetic injectables", "Tear trough treatments", "Liquid facelifts"],
        intro: "Samantha Danesi is a certified Physician Assistant and Licensed Massage Therapist with over a decade of experience in aesthetics and plastic surgery. She specializes in advanced cosmetic injectables, including tear trough treatments, liquid facelifts, and non-surgical Brazilian Butt Lifts (BBL).",
        education: [
          "Certified Physician Assistant (RPA-C)",
          "Licensed Massage Therapist (LMT)"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://samanthadanesiaesthetics.com/",
        treatments: [
          {
            name: "SkinFix: Microneedling",
            description: "SkinPen (Microneedling) is designed to stimulate your skin's natural ability to produce new collagen formation creating healthier, younger-looking skin. Get smoother more toned skin, hassle-free",
            time: "60 minutes",
            price: "$300.00"
          }
        ]
      },
      {
        id: 'shannon-lee',
        name: "Shannon Lee",
        title: "Founder & Lead Esthetician of Shannon Lee Esthetics",
        clinic: "Shannon Lee Esthetics",
        rating: 4.6,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Shannon+Lee+Esthetics',
        image: "https://images.squarespace-cdn.com/content/v1/63e146735db8872a79265dc0/6fb7b053-086c-4c8f-be26-916f52f77749/Untitled+design+%282%29.jpg",
        expertise: ["Acne Treatments", "Hyperpigmentation Correction", "Skin Rejuvenation", "Custom Facials"],
        intro: "Shannon Lee is a skincare expert specializing in acne and hyperpigmentation treatments. Her journey began with her own skin struggles, leading her to build a thriving esthetics business in New York City.",
        education: ["Licensed Esthetician"],
        languages: ["English"],
        location: "New York, NY",
        website: "https://shannonleeesthetics.com/",
        treatments: [
          {
            name: "MD Pen MicroNeedling",
            description: "A medical-grade microneedling treatment that creates 15,000 micro-channels per square inch to stimulate collagen production, improve skin texture, and reduce scars, fine lines, and hyperpigmentation.",
            time: "30–60 minutes",
            price: "$350"
          }
        ]
      },
      {
        id: 'diana-seo',
        name: "Diana Seo",
        title: "Founder & President of Collagen Bar",
        clinic: "Collagen Bar",
        rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Collagen+Bar',
        image: "https://collagenbar.nyc/cdn/shop/files/dianacc.jpg?v=1658939997&width=1500",
        expertise: ["Medical Aesthetics", "Skin Rejuvenation", "Facial Electrical Treatments", "Collagen Stimulation"],
        intro: "Diana Seo is the founder of Collagen Bar, a premier medical aesthetic and skincare clinic with locations in Westchester and NYC. With over 15 years of experience in health, medical, and beauty fields, she specializes in advanced skincare solutions.",
        education: [
          "B.S. in Biophysics, Minor in Chemistry & Mathematics, University of Connecticut",
          "Licensed Esthetician, Atelier Esthétique Institute of Esthetics"
        ],
        languages: ["English", "Korean"],
        location: "New York, NY",
        website: "https://collagenbar.com/",
        treatments: [
          {
            name: "Morpheus8 RF Microneedling",
            description: "A fractional radiofrequency (RF) microneedling treatment that stimulates collagen production, remodels skin, and contours the face and body by penetrating up to 4mm deep for superior skin tightening and fat reduction.",
            time: "30–60 minutes",
            price: "$1,150.00"
          }
        ]
      }
    ]
  };

  const doctors = treatment?.name?.toLowerCase() === 'botox' ? doctorsByTreatment.botox :
                 treatment?.name?.toLowerCase() === 'filler' ? doctorsByTreatment.filler :
                 treatment?.name?.toLowerCase() === 'microneedling' ? doctorsByTreatment.microneedling :
                 doctorsByTreatment.botox;

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