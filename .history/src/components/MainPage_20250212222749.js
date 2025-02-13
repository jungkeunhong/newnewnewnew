import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Star, ChevronRight } from 'lucide-react';

const MainPage = ({ quizResults, onStartAnalysis, onTreatmentClick }) => {
  const treatments = [
    {
      id: 1,
      name: "보톡스",
      description: "자연스러운 주름 개선과 예방",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      rating: 4.9,
      reviews: 528,
      price: "₩250,000~",
      benefits: [
        "빠른 시술 시간",
        "최소 통증",
        "즉각적인 효과"
      ]
    },
    {
      id: 2,
      name: "필러",
      description: "자연스러운 볼륨과 윤곽 개선",
      image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2",
      rating: 4.8,
      reviews: 423,
      price: "₩350,000~",
      benefits: [
        "즉각적인 볼륨",
        "자연스러운 결과",
        "오래 지속되는 효과"
      ]
    },
    {
      id: 3,
      name: "피코레이저",
      description: "피부 톤 개선과 잡티 제거",
      image: "https://images.unsplash.com/photo-1612349317329-5942a9b489c2",
      rating: 4.7,
      reviews: 389,
      price: "₩200,000~",
      benefits: [
        "빠른 회복",
        "높은 효과",
        "다양한 적용"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 로고 */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="cormorant text-2xl text-center text-[#3E2723]">Asentica</h1>
        </div>
      </div>

      <div className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto space-y-12">
        {/* 피부 분석 리포트 */}
        <motion.section 
          className="bg-gradient-to-br from-[#3E2723]/5 to-transparent p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="cormorant text-2xl mb-4">피부 분석 리포트</h2>
          <p className="text-[#3E2723]/80 leading-relaxed">
            {quizResults?.skinType === 'Combination' 
              ? '복합성 피부 타입으로, 수분 공급과 함께 유분 조절이 필요합니다. T존 부위의 과다 피지 분비를 억제하면서, 건조한 부위에는 충분한 보습이 필요합니다.'
              : '피부 타입에 맞는 맞춤형 케어가 필요합니다. 정확한 분석을 위해 AI 피부 분석을 시작해보세요.'}
          </p>
        </motion.section>

        {/* AI 피부 분석 CTA */}
        <motion.section
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={onStartAnalysis}
            className="w-full max-w-md luxury-button flex items-center justify-center space-x-3"
          >
            <Camera className="w-5 h-5" />
            <span>AI 피부 분석 시작하기</span>
          </button>
        </motion.section>

        {/* 추천 시술 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="cormorant text-2xl">추천 시술 TOP 3</h2>
          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <motion.button
                key={treatment.id}
                className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => onTreatmentClick(treatment)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                <div className="flex">
                  <div className="w-32 h-32">
                    <img 
                      src={treatment.image} 
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{treatment.name}</h3>
                        <p className="text-sm text-[#3E2723]/60 mt-1">
                          {treatment.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#3E2723]/40" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{treatment.rating}</span>
                      <span className="text-[#3E2723]/60 ml-1">
                        ({treatment.reviews} 리뷰)
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      {treatment.price}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* 시술 정보 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="cormorant text-2xl">시술 정보</h2>
          <div className="prose-like space-y-4 text-[#3E2723]/80">
            <p>
              모든 시술은 철저한 상담을 바탕으로 진행됩니다. 
              개인의 피부 상태와 니즈에 맞는 최적의 시술을 제안해드립니다.
            </p>
            <p>
              시술 전 상담에서는 다음 사항들을 꼼꼼히 체크합니다:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>현재 피부 상태</li>
              <li>원하시는 개선 포인트</li>
              <li>과거 시술 이력</li>
              <li>피부 민감도</li>
              <li>회복 기간</li>
            </ul>
          </div>
        </motion.section>

        {/* AI 분석 CTA */}
        <motion.section
          className="bg-gradient-to-br from-[#3E2723]/5 to-transparent p-8 rounded-2xl text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="cormorant text-2xl">맞춤형 시술을 찾고 계신가요?</h2>
          <p className="text-[#3E2723]/80 max-w-2xl mx-auto">
            AI 피부 분석을 통해 당신의 피부 상태에 가장 적합한 시술을 추천해드립니다.
            지금 바로 시작해보세요.
          </p>
          <button
            onClick={onStartAnalysis}
            className="luxury-button inline-flex items-center space-x-2"
          >
            <Camera className="w-5 h-5" />
            <span>AI 피부 분석 시작하기</span>
          </button>
        </motion.section>

        {/* 하단 CTA */}
        <motion.section
          className="text-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onStartAnalysis}
            className="w-full max-w-md luxury-button"
          >
            AI 피부 분석으로 맞춤 시술 찾기
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default MainPage; 