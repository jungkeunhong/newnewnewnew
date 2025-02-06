import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Loader2, ChevronRight, Share2, MapPin, Star, Download, Instagram, MessageSquare, Video, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import DetailedAnalysis from './DetailedAnalysis';
import DoctorProfile from './DoctorProfile';
import ProductDetail from './ProductDetail';
import AuthModal from './AuthModal';

const SkinAnalysisApp = () => {
  const [user, loading] = useAuthState(auth);
  const [step, setStep] = useState(() => {
    // Check URL parameters for initial state
    const params = new URLSearchParams(window.location.search);
    const savedStep = params.get('step');
    
    // If we have a user and step is detailed, show detailed view
    if (savedStep === 'detailed') {
      return 'detailed';
    }
    return 'upload';
  });
  const [selectedImage, setSelectedImage] = useState(() => {
    // Try to get image from session storage instead of local storage
    return sessionStorage.getItem('selectedImage') || null;
  });
  const [showMessage, setShowMessage] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Save selectedImage to sessionStorage when it changes
  useEffect(() => {
    if (selectedImage) {
      sessionStorage.setItem('selectedImage', selectedImage);
    }
  }, [selectedImage]);

  // Handle authentication state changes
  useEffect(() => {
    if (user && !loading) {
      const params = new URLSearchParams(window.location.search);
      const redirectStep = params.get('step');
      
      if (redirectStep === 'detailed') {
        setStep('detailed');
        // Clean up URL but keep the step parameter
        window.history.replaceState({}, '', `${window.location.pathname}?step=detailed`);
      }
    }
  }, [user, loading]);

  // Clean up function when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('selectedImage');
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setStep('analyzing');
        // 상태 변경 후 타이머 설정
        const timer = setTimeout(() => {
          setStep('results');
        }, 3000);
        // 컴포넌트가 언마운트되면 타이머 정리
        return () => clearTimeout(timer);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setStep('analyzing');
        // 상태 변경 후 타이머 설정
        const timer = setTimeout(() => {
          setStep('results');
        }, 3000);
        // 컴포넌트가 언마운트되면 타이머 정리
        return () => clearTimeout(timer);
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
      className="flex flex-col items-center justify-center min-h-screen bg-white"
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
      className="flex flex-col items-center justify-center min-h-screen bg-white px-4"
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
          <h1 className="text-3xl font-bold gotu-regular">
            AI Skin Diagnosis
          </h1>
          <p className="text-gray-600">Unlock your personalized skin report & treatment guide</p>
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
            onClick={() => cameraInputRef.current?.click()}
            className="w-full flex items-center justify-center space-x-2 border border-purple-200 bg-white p-4 rounded-xl hover:bg-purple-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Camera size={20} />
            <span>Take Photo</span>
          </motion.button>
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleCameraCapture}
            accept="image/*"
            capture="user"
            className="hidden"
          />
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
            <p className="text-sm text-purple-900">Analysis by Medical Professional</p>
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
            <p className="text-sm text-purple-900">Results in 5 seconds</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const handleSaveReport = async () => {
    try {
      const content = document.getElementById('results-content');
      if (!content) return;

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollY: -window.scrollY
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('skin-analysis-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleDetailedAnalysisClick = () => {
    if (loading) return;
    
    if (user) {
      setStep('detailed');
      // Update URL when changing to detailed view
      window.history.replaceState({}, '', `${window.location.pathname}?step=detailed`);
    } else {
      setShowAuthModal(true);
    }
  };

  const ResultsScreen = () => (
    <motion.div 
      className="flex flex-col min-h-screen bg-white"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div id="results-content" className="flex-1 overflow-auto p-4 space-y-6">
        <motion.div 
          className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-pink-100"
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
              className="bg-white p-4 rounded-xl shadow-sm border border-pink-100"
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
          onClick={handleDetailedAnalysisClick}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <span className="font-medium">View Detailed Analysis</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>

        <motion.div 
          className="bg-white rounded-xl p-4 border border-pink-100"
          variants={fadeIn}
          transition={{ delay: 0.9 }}
        >
          <h2 className="font-semibold mb-3 text-purple-900">Skincare for your acne</h2>
          <div className="space-y-3">
            {[
              {
                name: "Hyaluronic Acid Serum",
                brand: "Torriden",
                rating: 4.5,
                reviews: 2062,
                image: "https://m.media-amazon.com/images/I/41z2cf+o0mL._SY300_SX300_.jpg"
              },
              {
                name: "Vitamin C Serum",
                brand: "Asterwood",
                rating: 4.4,
                reviews: 1561,
                image: "https://m.media-amazon.com/images/I/71irav7XAsL._SX679_.jpg"
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
                onClick={() => {
                  setSelectedProduct(product);
                  setStep('product');
                }}
              >
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
          className="bg-white rounded-xl p-4 border border-pink-100"
          variants={fadeIn}
          transition={{ delay: 1.1 }}
        >
          <h2 className="font-semibold mb-3 text-purple-900">Clinics for your pores</h2>
          <div className="space-y-3">
            {[
              {
                name: "Dr. Smith",
                specialty: "Dermatologist",
                distance: "0.5",
                rating: 4.9,
                reviews: 523,
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww"
              },
              {
                name: "Dr. Johnson",
                specialty: "Skin Specialist",
                distance: "0.9",
                rating: 4.7,
                reviews: 428,
                image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww"
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
      </div>

      <div className="sticky bottom-0 bg-white p-4 border-t border-pink-100">
        <div className="flex gap-3">
          <motion.button 
            onClick={handleSaveReport}
            className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50 text-purple-600 border border-pink-200 p-4 rounded-xl flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fadeIn}
            transition={{ delay: 1.3 }}
          >
            <Download className="w-5 h-5" />
            <span>Save Report</span>
          </motion.button>

          <motion.button 
            onClick={() => setShowShareModal(true)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={fadeIn}
            transition={{ delay: 1.3 }}
          >
            <Share2 className="w-5 h-5" />
            <span>Share Results</span>
          </motion.button>
        </div>
      </div>

      {showShareModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Share Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                className="p-3 border border-purple-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </motion.button>
              <motion.button
                className="p-3 border border-purple-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>iMessage</span>
              </motion.button>
              <motion.button
                className="p-3 border border-purple-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Video className="w-5 h-5" />
                <span>TikTok</span>
              </motion.button>
              <motion.button
                className="p-3 border border-purple-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // Add toast notification here
                }}
              >
                <Link className="w-5 h-5" />
                <span>Copy Link</span>
              </motion.button>
            </div>
            <motion.button
              className="w-full mt-4 p-3 text-gray-600 rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowShareModal(false)}
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-pink-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => {
              setStep('upload');
              setSelectedImage(null);
              localStorage.removeItem('selectedImage');
              window.history.replaceState({}, '', window.location.pathname);
            }}
            className="text-xl font-bold text-black hover:opacity-80 transition-opacity"
          >
            Asentica
          </button>
          {user && (
            <div className="flex items-center space-x-2">
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-600">{user.displayName}</span>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {step === 'upload' && <UploadScreen key="upload" />}
        {step === 'analyzing' && <AnalyzingScreen key="analyzing" />}
        {step === 'results' && <ResultsScreen key="results" />}
        {step === 'detailed' && user && (
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
        {step === 'product' && selectedProduct && (
          <ProductDetail
            key="product"
            product={selectedProduct}
            onBack={() => setStep('results')}
            skinMetrics={skinMetrics}
          />
        )}
        {showAuthModal && (
          <AuthModal key="auth" onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkinAnalysisApp; 