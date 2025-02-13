import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin } from 'lucide-react';

const TreatmentDetail = ({ treatment, onBack, onDoctorClick }) => {
  const treatmentDetails = {
    description: "보톡스는 근육을 일시적으로 이완시켜 주름을 개선하는 시술입니다. 자연스러운 표정은 유지하면서 주름만 효과적으로 개선할 수 있습니다.",
    benefits: [
      "주름 개선 및 예방",
      "빠른 시술 시간 (15-30분)",
      "최소한의 회복 기간",
      "자연스러운 결과",
      "다양한 부위 적용 가능"
    ],
    precautions: [
      "시술 전 1주일간 아스피린 복용 금지",
      "시술 후 4시간 동안 해당 부위 누르지 않기",
      "시술 후 24시간 동안 운동 피하기",
      "시술 후 2주간 마사지 피하기",
      "임신/수유 중인 경우 시술 불가"
    ],
    effects: {
      onset: "3-4일 후",
      duration: "3-6개월",
      maintenance: "정기적인 관리 필요"
    }
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Kim",
      clinic: "Aesthetic Clinic",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      rating: 4.9,
      reviews: 528,
      distance: "0.8",
      expertise: ["Botox", "Filler", "Laser"],
      experience: "12+ years",
      cases: "5,000+"
    },
    {
      id: 2,
      name: "Dr. Emily Lee",
      clinic: "Beauty Medical Center",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      rating: 4.8,
      reviews: 423,
      distance: "1.2",
      expertise: ["Anti-aging", "Skin Regeneration", "Laser"],
      experience: "10+ years",
      cases: "4,000+"
    },
    {
      id: 3,
      name: "Dr. Jennifer Park",
      clinic: "La Porte Clinic",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
      rating: 4.7,
      reviews: 389,
      distance: "1.5",
      expertise: ["Skin Care", "Laser", "Lifting"],
      experience: "8+ years",
      cases: "3,500+"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-[#3E2723]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto space-y-12">
        {/* Treatment Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="aspect-video rounded-2xl overflow-hidden mb-6">
            <img 
              src={treatment.image} 
              alt={treatment.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="cormorant text-3xl">{treatment.name}</h1>
          <p className="text-[#3E2723]/80 leading-relaxed">
            {treatmentDetails.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Benefits</h3>
              <ul className="space-y-2">
                {treatmentDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-[#3E2723]/80">
                    <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Precautions</h3>
              <ul className="space-y-2">
                {treatmentDetails.precautions.map((precaution, index) => (
                  <li key={index} className="flex items-center text-[#3E2723]/80">
                    <span className="w-2 h-2 bg-[#3E2723]/40 rounded-full mr-3" />
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#3E2723]/5 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-lg">Treatment Effects</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-[#3E2723]/60">Initial Effects</p>
                <p className="font-medium">{treatmentDetails.effects.onset}</p>
              </div>
              <div>
                <p className="text-sm text-[#3E2723]/60">Duration</p>
                <p className="font-medium">{treatmentDetails.effects.duration}</p>
              </div>
              <div>
                <p className="text-sm text-[#3E2723]/60">Maintenance</p>
                <p className="font-medium">{treatmentDetails.effects.maintenance}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Top Specialists */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="cormorant text-2xl">Top Specialists for {treatment.name}</h2>
          <div className="space-y-4">
            {doctors.map((doctor, index) => (
              <motion.button
                key={doctor.id}
                className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => onDoctorClick(doctor)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <div className="flex p-4">
                  <div className="w-24 h-24">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 ml-4 text-left">
                    <div>
                      <h3 className="font-medium text-lg">{doctor.name}</h3>
                      <p className="text-sm text-[#3E2723]/60">
                        {doctor.clinic}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-[#3E2723]/60 ml-1">
                        ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-[#3E2723]/80">
                        Experience: {doctor.experience}
                      </span>
                      <span className="text-sm text-[#3E2723]/80">
                        Cases: {doctor.cases}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default TreatmentDetail; 