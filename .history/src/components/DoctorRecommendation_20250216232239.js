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
        image: "https://www.beyondbeautifulaesthetics.com/assets/silver_websites/beyond-beautiful-aesthetics/staff/samantha-danesi.jpg",
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