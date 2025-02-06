import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react';

const ProductDetail = ({ product, onBack, skinMetrics }) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // 피부 분석 결과에 기반한 제품 적합성 분석
  const getPersonalizedBenefits = () => {
    const benefits = [];
    
    if (skinMetrics.hydration.score < 8) {
      benefits.push({
        title: "수분 공급 강화",
        description: "히알루론산이 풍부하여 당신의 피부 수분도를 개선하는데 도움을 줍니다.",
        relevance: "현재 수분도 " + skinMetrics.hydration.score + "/10"
      });
    }
    
    if (skinMetrics.elasticity.score < 9) {
      benefits.push({
        title: "탄력 개선",
        description: "펩타이드 성분이 피부 탄력을 개선하는데 효과적입니다.",
        relevance: "현재 탄력도 " + skinMetrics.elasticity.score + "/10"
      });
    }

    if (skinMetrics.texture.score < 8) {
      benefits.push({
        title: "피부결 개선",
        description: "나이아신아마이드가 피부 결을 부드럽게 만들어줍니다.",
        relevance: "현재 피부결 상태 " + skinMetrics.texture.score + "/10"
      });
    }

    return benefits;
  };

  const personalizedBenefits = getPersonalizedBenefits();

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-bl from-[#E6E6FA] to-pink-50"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="p-4 space-y-6">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 text-purple-600"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </motion.button>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
          <div className="flex items-start gap-6">
            <motion.div 
              className="w-32 h-32 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-purple-900">{product.name}</h1>
              <p className="text-purple-600">{product.brand}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="text-gray-500 ml-1">({product.reviews} reviews)</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <motion.button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  className="p-2 border border-purple-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-4 h-4 text-purple-600" />
                </motion.button>
                <motion.button
                  className="p-2 border border-purple-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4 text-purple-600" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-900">맞춤형 피부 분석 결과</h2>
            <div className="space-y-4">
              {personalizedBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-50 rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                      <p className="text-sm text-purple-600 mt-1">{benefit.relevance}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-900">주요 성분</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "히알루론산", benefit: "수분 공급" },
                { name: "나이아신아마이드", benefit: "피부 장벽 강화" },
                { name: "펩타이드", benefit: "탄력 개선" },
                { name: "세라마이드", benefit: "보습력 강화" }
              ].map((ingredient, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-50 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <div className="font-medium text-purple-900">{ingredient.name}</div>
                  <div className="text-sm text-purple-600">{ingredient.benefit}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-900">사용 방법</h2>
            <div className="space-y-2 text-gray-600">
              <p>1. 세안 후 토너로 피부 결을 정돈합니다.</p>
              <p>2. 적당량을 덜어 얼굴 전체에 고르게 펴발라줍니다.</p>
              <p>3. 가볍게 두드려 흡수시켜줍니다.</p>
              <p>4. 아침, 저녁 스킨케어 루틴에 사용합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail; 