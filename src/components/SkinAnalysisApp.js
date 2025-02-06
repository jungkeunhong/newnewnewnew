import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, ChevronRight, Share2, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DetailedAnalysis from './DetailedAnalysis';
import DoctorProfile from './DoctorProfile';

const SkinAnalysisApp = () => {
  const [step, setStep] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const fileInputRef = useRef(null);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setStep('analyzing');
        setTimeout(() => setStep('results'), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const skinMetrics = {
    hydration: { score: 7, emoji: "💧", description: "Well hydrated" },
    elasticity: { score: 8, emoji: "✨", description: "Very elastic" },
    acne: { score: 6, emoji: "🔬", description: "Mild acne" },
    texture: { score: 7, emoji: "🧬", description: "Slightly uneven" },
    pores: { score: 8, emoji: "👁️", description: "Minimally visible" },
    pigment: { score: 7, emoji: "🎯", description: "Even tone" }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const AnalyzingScreen = () => (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative">
        {selectedImage && (
          <motion.div 
            className="w-64 h-64 rounded-2xl overflow-hidden mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={selectedImage} alt="Analyzing" className="w-full h-full object-cover" />
          </motion.div>
        )}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Analyzing...</h2>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const UploadScreen = () => (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {showMessage && (
        <motion.div 
          className="absolute top-8 left-4 right-4 bg-white rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <p className="text-center text-purple-800">Take a clear selfie in good lighting for best results! 📸</p>
        </motion.div>
      )}
      
      <div className="w-full max-w-md space-y-8">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Skin Analysis
          </h1>
          <p className="text-gray-600">Get your personalized skincare analysis in seconds</p>
        </motion.div>
        
        {selectedImage && (
          <motion.div 
            className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
          </motion.div>
        )}
        
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload size={20} />
            <span>Upload Photo</span>
          </motion.button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <motion.button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center space-x-2 border border-purple-200 bg-white p-4 rounded-xl hover:bg-purple-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Camera size={20} />
            <span>Take Photo</span>
          </motion.button>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg">
              <span className="text-xl">✨</span>
            </div>
            <p className="text-sm text-purple-900">Professional-grade skin analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg">
              <span className="text-xl">🔒</span>
            </div>
            <p className="text-sm text-purple-900">Private and secure</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg">
              <span className="text-xl">⚡️</span>
            </div>
            <p className="text-sm text-purple-900">Results in seconds</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const ResultsScreen = () => (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-pink-50"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex-1 overflow-auto p-4 space-y-6">
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <motion.div 
              className="w-24 h-24 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={selectedImage} alt="Your photo" className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Overall Score: 7.2/10
              </motion.h2>
              <motion.div 
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Skin Age: <span className="font-semibold">27</span>
              </motion.div>
              <motion.div 
                className="text-sm text-purple-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Skin Type: Combination
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(skinMetrics).map(([key, value], i) => (
            <motion.div
              key={i}
              className="bg-white p-4 rounded-xl shadow-sm"
              variants={fadeIn}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                  <span className="text-xl">{value.emoji}</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {value.score}/10
                </div>
              </div>
              <div className="font-medium mt-2">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className="text-sm text-gray-600">{value.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          onClick={() => setStep('detailed')}
          className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <span className="font-medium">View Detailed Analysis</span>
          <ChevronRight className="w-5 h-5 text-purple-400" />
        </motion.button>

        <motion.div 
          className="bg-white rounded-xl p-4"
          variants={fadeIn}
          transition={{ delay: 0.9 }}
        >
          <h2 className="font-semibold mb-3 text-purple-900">Recommended Products</h2>
          <div className="space-y-3">
            {[
              {
                name: "Hydrating Serum",
                brand: "SkinCare Pro",
                icon: "🧴",
                rating: 4.8,
                reviews: 1234,
                image: "https://via.placeholder.com/48"
              },
              {
                name: "Retinol Cream",
                brand: "DermaSolutions",
                icon: "🧪",
                rating: 4.6,
                reviews: 856,
                image: "https://via.placeholder.com/48"
              }
            ].map((product, i) => (
              <motion.button
                key={i}
                className="w-full flex items-center p-3 border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (i * 0.1) }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mr-3">
                  <span className="text-xl">{product.icon}</span>
                </div>
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 px-3 text-left">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.brand}</div>
                  <div className="flex items-center text-sm text-yellow-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">{product.rating}</span>
                    <span className="text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-4"
          variants={fadeIn}
          transition={{ delay: 1.1 }}
        >
          <h2 className="font-semibold mb-3 text-purple-900">Recommended Clinics</h2>
          <div className="space-y-3">
            {[
              {
                name: "Dr. Smith",
                specialty: "Dermatologist",
                icon: "🏥",
                distance: "0.5",
                rating: 4.9,
                reviews: 523,
                image: "https://via.placeholder.com/48"
              },
              {
                name: "Dr. Johnson",
                specialty: "Skin Specialist",
                icon: "👨‍⚕️",
                distance: "0.9",
                rating: 4.7,
                reviews: 428,
                image: "https://via.placeholder.com/48"
              }
            ].map((clinic, i) => (
              <motion.button
                key={i}
                className="w-full flex items-center p-3 border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + (i * 0.1) }}
                onClick={() => {
                  setSelectedDoctor(clinic);
                  setStep('doctor');
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mr-3">
                  <span className="text-xl">{clinic.icon}</span>
                </div>
                <img src={clinic.image} alt={clinic.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1 px-3 text-left">
                  <div className="font-medium">{clinic.name}</div>
                  <div className="text-sm text-gray-600">{clinic.specialty}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1">{clinic.rating}</span>
                      <span className="text-gray-500 ml-1">({clinic.reviews})</span>
                    </div>
                    <div className="text-sm text-purple-600 flex items-center">
                      <span>{clinic.distance}mi</span>
                      <MapPin className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button 
          onClick={() => {/* Share functionality */}}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 mb-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={fadeIn}
          transition={{ delay: 1.3 }}
        >
          <Share2 className="w-5 h-5" />
          <span>Share Results</span>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <AnimatePresence mode="wait">
        {step === 'upload' && <UploadScreen key="upload" />}
        {step === 'analyzing' && <AnalyzingScreen key="analyzing" />}
        {step === 'results' && <ResultsScreen key="results" />}
        {step === 'detailed' && (
          <DetailedAnalysis 
            key="detailed"
            onBack={() => setStep('results')}
            skinMetrics={skinMetrics}
            selectedImage={selectedImage}
          />
        )}
        {step === 'doctor' && selectedDoctor && (
          <DoctorProfile
            key="doctor"
            doctor={selectedDoctor}
            onBack={() => setStep('results')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkinAnalysisApp; 