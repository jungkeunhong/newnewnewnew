import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin } from 'lucide-react';

const TreatmentDetail = ({ treatment, onBack, onDoctorClick }) => {
  const doctors = [
    {
      id: 1,
      name: "김민서 원장",
      clinic: "에스테틱 클리닉",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      rating: 4.9,
      reviews: 528,
      distance: "0.8",
      expertise: ["보톡스", "필러", "레이저"],
      description: "10년 이상의 시술 경험을 바탕으로 자연스러운 결과를 추구합니다.",
      education: [
        "서울대학교 의과대학",
        "미국 피부과학회 정회원",
        "대한피부과학회 정회원"
      ]
    },
    {
      id: 2,
      name: "이지원 원장",
      clinic: "뷰티 메디컬",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      rating: 4.8,
      reviews: 423,
      distance: "1.2",
      expertise: ["안티에이징", "피부 재생", "레이저"],
      description: "개인별 맞춤 프로그램으로 최적의 결과를 제공합니다.",
      education: [
        "연세대학교 의과대학",
        "대한성형외과학회 정회원",
        "아시아성형외과학회 정회원"
      ]
    },
    {
      id: 3,
      name: "박서연 원장",
      clinic: "라포레 클리닉",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
      rating: 4.7,
      reviews: 389,
      distance: "1.5",
      expertise: ["피부 관리", "레이저", "리프팅"],
      description: "최신 기술과 경험을 바탕으로 안전하고 효과적인 시술을 제공합니다.",
      education: [
        "고려대학교 의과대학",
        "대한피부과학회 정회원",
        "레이저학회 정회원"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-[#3E2723]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>뒤로가기</span>
          </button>
        </div>
      </div>

      <div className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto space-y-12">
        {/* 시술 소개 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="aspect-video rounded-2xl overflow-hidden mb-6">
            <img 
              src={treatment.image} 
              alt={treatment.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="cormorant text-3xl mb-4">{treatment.name}</h1>
          <p className="text-[#3E2723]/80 leading-relaxed mb-6">
            {treatment.description}
          </p>

          <div className="flex items-center justify-between p-4 bg-[#3E2723]/5 rounded-xl">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="ml-2 font-medium">{treatment.rating}</span>
              <span className="text-[#3E2723]/60 ml-1">
                ({treatment.reviews} 리뷰)
              </span>
            </div>
            <div className="font-medium">{treatment.price}</div>
          </div>
        </motion.section>

        {/* 시술 장점과 주의사항 */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* 이미지 */}
          <div className="md:col-span-1">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
              alt="보톡스 시술"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* 시술 장점과 주의사항 */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 시술 장점 */}
            <div className="space-y-4">
              <h2 className="cormorant text-2xl flex items-center">
                <span className="mr-2">✨</span>
                시술 장점
              </h2>
              <div className="space-y-3">
                {treatment.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-[#3E2723]/5 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 시술 전 주의사항 */}
            <div className="space-y-4">
              <h2 className="cormorant text-2xl flex items-center">
                <span className="mr-2">⚠️</span>
                시술 전 주의사항
              </h2>
              <div className="space-y-3">
                <motion.div
                  className="p-4 bg-[#3E2723]/5 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <ul className="space-y-2">
                    <li>• 시술 전 24시간 동안 음주 금지</li>
                    <li>• 시술 부위 화장 금지</li>
                    <li>• 임신/수유 중 상담 필수</li>
                    <li>• 항응고제 복용 시 상담 필수</li>
                    <li>• 최근 2주 내 시술 이력 공유</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 추천 의사 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="cormorant text-2xl">추천 의사</h2>
          <div className="space-y-4">
            {doctors.map((doctor, index) => (
              <motion.button
                key={doctor.id}
                className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => onDoctorClick(doctor)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
              >
                <div className="flex p-4">
                  <div className="w-24 h-24">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{doctor.name}</h3>
                        <p className="text-sm text-[#3E2723]/60">
                          {doctor.clinic}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-[#3E2723]/60 ml-1">
                        ({doctor.reviews} 리뷰)
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-[#3E2723]/60">
                      <MapPin className="w-4 h-4" />
                      <span className="ml-1">{doctor.distance}km</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {doctor.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-[#3E2723]/5 rounded-full"
                        >
                          {exp}
                        </span>
                      ))}
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