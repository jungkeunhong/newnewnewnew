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
        title: "Enhanced Hydration",
        description: "Rich in hyaluronic acid to improve your skin's hydration levels.",
        relevance: "Current Hydration " + skinMetrics.hydration.score + "/10"
      });
    }
    
    if (skinMetrics.elasticity.score < 9) {
      benefits.push({
        title: "Improved Elasticity",
        description: "Peptides effectively enhance skin elasticity and firmness.",
        relevance: "Current Elasticity " + skinMetrics.elasticity.score + "/10"
      });
    }

    if (skinMetrics.texture.score < 8) {
      benefits.push({
        title: "Texture Refinement",
        description: "Niacinamide helps to smooth and refine skin texture.",
        relevance: "Current Texture " + skinMetrics.texture.score + "/10"
      });
    }

    return benefits;
  };

  const personalizedBenefits = getPersonalizedBenefits();

  return (
    <motion.div 
      className="min-h-screen bg-white"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="p-4 space-y-6">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 text-luxe-500"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </motion.button>

        <div className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-2xl p-6 shadow-sm border border-luxe-200 space-y-6">
          <div className="flex items-start gap-6">
            <motion.div 
              className="w-32 h-32 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-luxe-900">{product.name}</h1>
              <p className="text-luxe-500">{product.brand}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="text-gray-500 ml-1">({product.reviews} reviews)</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <motion.button
                  className="flex-[3] bg-gradient-to-r from-luxe-400 to-luxe-300 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  className="flex-1 p-2 border border-luxe-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-4 h-4 text-luxe-500" />
                </motion.button>
                <motion.button
                  className="flex-1 p-2 border border-luxe-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4 text-luxe-500" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-luxe-900">Why this product is right for you?</h2>
            <div className="space-y-4">
              {personalizedBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-luxe-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-luxe-100 rounded-lg">
                      <Check className="w-4 h-4 text-luxe-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-luxe-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                      <p className="text-sm text-luxe-500 mt-1">{benefit.relevance}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-luxe-900">Key Ingredients</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Hyaluronic Acid", benefit: "Deep Hydration" },
                { name: "Niacinamide", benefit: "Barrier Support" },
                { name: "Peptides", benefit: "Elasticity" },
                { name: "Ceramides", benefit: "Moisture Lock" }
              ].map((ingredient, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-luxe-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <div className="font-medium text-luxe-900">{ingredient.name}</div>
                  <div className="text-sm text-luxe-500">{ingredient.benefit}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-luxe-900">How to Use</h2>
            <div className="space-y-2 text-gray-600">
              <p>1. After cleansing, prep skin with toner.</p>
              <p>2. Apply appropriate amount evenly across face.</p>
              <p>3. Gently pat to enhance absorption.</p>
              <p>4. Use morning and evening in your skincare routine.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail; 