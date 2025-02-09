import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Loader2, ChevronRight, Share2, MapPin, Star, Download, Instagram, MessageSquare, Video, Link, Menu, Home, Search, PlusSquare, Users, User, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import DetailedAnalysis from './DetailedAnalysis';
import DoctorProfile from './DoctorProfile';
import ProductDetail from './ProductDetail';
import AuthModal from './AuthModal';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const SkinAnalysisApp = () => {
  const [user, loading] = useAuthState(auth);
  const [step, setStep] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const savedStep = params.get('step');
    return savedStep || 'upload';
  });
  const [selectedImage, setSelectedImage] = useState(() => {
    return sessionStorage.getItem('selectedImage') || null;
  });
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedMedSpa, setSelectedMedSpa] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isMobile] = React.useState(window.innerWidth <= 768);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    language: 'en'
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Handle authentication state changes
  useEffect(() => {
    if (user && !loading) {
      const params = new URLSearchParams(window.location.search);
      const redirectStep = params.get('step');
      const savedImage = sessionStorage.getItem('selectedImage');
      const isAnalysisComplete = sessionStorage.getItem('analysisComplete') === 'true';
      
      if (redirectStep === 'detailed' && savedImage && isAnalysisComplete) {
        setSelectedImage(savedImage);
        setAnalysisComplete(true);
        setStep('detailed');
      }
    }
  }, [user, loading]);

  // 세션 스토리지 초기화 함수 추가
  useEffect(() => {
    // 앱 시작시 세션 스토리지 초기화
    sessionStorage.removeItem('selectedImage');
    sessionStorage.removeItem('analysisComplete');
  }, []);

  const handleImageUpload = (event) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageResult = reader.result;
        setSelectedImage(imageResult);
        sessionStorage.setItem('selectedImage', imageResult);
        setStep('analyzing');
        
        // Clear the input value to allow selecting the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        setTimeout(() => {
          setStep('results');
          setAnalysisComplete(true);
          sessionStorage.setItem('analysisComplete', 'true');
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageResult = reader.result;
        setSelectedImage(imageResult);
        sessionStorage.setItem('selectedImage', imageResult);
        setStep('analyzing');
        
        // Clear the input value to allow selecting the same file again
        if (cameraInputRef.current) {
          cameraInputRef.current.value = '';
        }
        
        setTimeout(() => {
          setStep('results');
          setAnalysisComplete(true);
          sessionStorage.setItem('analysisComplete', 'true');
        }, 3000);
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
            <Loader2 className="h-8 w-8 animate-spin text-luxe-600 mx-auto mb-4" />
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
          <p className="text-center text-luxe-500">
            {user ? "Take a clear selfie in good lighting for best results! 📸" : "Please sign in to analyze your skin 🔒"}
          </p>
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
          <p className="text-luxe-400">Unlock your personalized skin report & treatment guide</p>
        </motion.div>
        
        {user ? (
          <>
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
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl hover:opacity-90 transition-opacity"
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
                className="w-full flex items-center justify-center space-x-2 border border-luxe-200 bg-white p-4 rounded-xl hover:bg-luxe-50 transition-colors"
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
          </>
        ) : (
          <motion.button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </motion.button>
        )}

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-luxe-100 rounded-lg">
              <span className="text-xl">✨</span>
            </div>
            <p className="text-sm text-luxe-900">Analysis by Medical Professional</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-luxe-100 rounded-lg">
              <span className="text-xl">🔒</span>
            </div>
            <p className="text-sm text-luxe-900">Private and secure</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-luxe-100 rounded-lg">
              <span className="text-xl">⚡️</span>
            </div>
            <p className="text-sm text-luxe-900">Results in 5 seconds</p>
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
      window.history.replaceState({}, '', `${window.location.pathname}?step=detailed`);
    } else {
      // Store current state before authentication
      sessionStorage.setItem('selectedImage', selectedImage);
      sessionStorage.setItem('analysisComplete', 'true');
      setShowAuthModal(true);
    }
  };

  // Reset function for home button
  const resetToHome = () => {
    setStep('upload');
    setSelectedImage(null);
    setAnalysisComplete(false);
    sessionStorage.removeItem('selectedImage');
    sessionStorage.removeItem('analysisComplete');
    window.history.replaceState({}, '', window.location.pathname);
  };

  const ResultsScreen = () => (
    <motion.div 
      className="flex flex-col min-h-screen bg-white pb-20"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div id="results-content" className="flex-1 overflow-auto p-4 space-y-6">
        <motion.div 
          className="bg-gradient-to-br from-luxe-100 to-luxe-50 rounded-2xl p-6 shadow-sm border border-luxe-200"
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
                className="text-2xl font-bold bg-gradient-to-r from-luxe-400 to-luxe-300 bg-clip-text text-transparent"
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
                className="text-sm text-luxe-600"
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
              className="bg-white p-4 rounded-xl shadow-sm border border-luxe-200"
              variants={fadeIn}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-luxe-100 to-luxe-50 rounded-lg">
                  <span className="text-xl">{value.emoji}</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-luxe-400 to-luxe-300 bg-clip-text text-transparent">
                  {value.score}/10
                </div>
              </div>
              <div className="font-medium mt-2">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className="text-sm text-luxe-600">{value.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          onClick={handleDetailedAnalysisClick}
          className="w-full bg-gradient-to-r from-luxe-500 to-luxe-400 text-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <span className="font-medium">View Detailed Analysis</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>

        <motion.div 
          className="bg-white rounded-xl p-4 border border-luxe-200"
          variants={fadeIn}
          transition={{ delay: 0.9 }}
        >
          <h2 className="font-semibold mb-3 text-luxe-900">Skincare for your acne</h2>
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
                className="w-full flex items-center p-3 border border-luxe-100 rounded-xl hover:bg-luxe-50 transition-colors"
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
                  <div className="text-sm text-luxe-600">{product.brand}</div>
                  <div className="flex items-center text-sm text-yellow-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">{product.rating}</span>
                    <span className="text-luxe-500 ml-1">({product.reviews})</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-luxe-400" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-4 border border-luxe-200"
          variants={fadeIn}
          transition={{ delay: 1.1 }}
        >
          <h2 className="font-semibold mb-3 text-luxe-900">Clinics for your pores</h2>
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
                className="w-full flex items-center p-3 border border-luxe-100 rounded-xl hover:bg-luxe-50 transition-colors"
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
                  <div className="text-sm text-luxe-600">{clinic.specialty}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1">{clinic.rating}</span>
                      <span className="text-luxe-500 ml-1">({clinic.reviews})</span>
                    </div>
                    <div className="text-sm text-luxe-600 flex items-center">
                      <span>{clinic.distance}mi</span>
                      <MapPin className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-luxe-400" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="sticky bottom-0 bg-white p-4 border-t border-luxe-200">
        <div className="flex gap-3">
          <motion.button 
            onClick={handleSaveReport}
            className="flex-1 bg-gradient-to-br from-luxe-50 to-luxe-100 text-luxe-500 border border-luxe-200 p-4 rounded-xl flex items-center justify-center space-x-2"
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
            className="flex-1 bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2"
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
                className="p-3 border border-luxe-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </motion.button>
              <motion.button
                className="p-3 border border-luxe-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>iMessage</span>
              </motion.button>
              <motion.button
                className="p-3 border border-luxe-200 rounded-xl flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Video className="w-5 h-5" />
                <span>TikTok</span>
              </motion.button>
              <motion.button
                className="p-3 border border-luxe-200 rounded-xl flex items-center space-x-2"
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
              className="w-full mt-4 p-3 text-luxe-600 rounded-xl"
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

  const MenuOverlay = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowMenu(false)}
    >
      <motion.div
        className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-luxe-900">Menu</h2>
            <button 
              onClick={() => setShowMenu(false)}
              className="text-luxe-500 hover:text-luxe-700"
            >
              ✕
            </button>
          </div>
          {['Profile', 'Settings', 'Help', 'About'].map((item, i) => (
            <motion.button
              key={i}
              className="w-full text-left p-3 rounded-lg hover:bg-luxe-50 text-luxe-700"
              whileHover={{ x: 5 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-luxe-200 px-6 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <motion.button
          className={`flex flex-col items-center space-y-1 ${currentTab === 'home' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTab('home')}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </motion.button>
        <motion.button
          className={`flex flex-col items-center space-y-1 ${currentTab === 'search' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTab('search')}
        >
          <Search size={24} />
          <span className="text-xs">Search</span>
        </motion.button>
        <motion.button
          className={`flex flex-col items-center space-y-1 ${currentTab === 'post' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTab('post')}
        >
          <PlusSquare size={24} />
          <span className="text-xs">Post</span>
        </motion.button>
        <motion.button
          className={`flex flex-col items-center space-y-1 ${currentTab === 'community' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTab('community')}
        >
          <Users size={24} />
          <span className="text-xs">Community</span>
        </motion.button>
        <motion.button
          className={`flex flex-col items-center space-y-1 ${currentTab === 'mypage' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTab('mypage')}
        >
          <User size={24} />
          <span className="text-xs">My Page</span>
        </motion.button>
      </div>
    </div>
  );

  const SearchScreen = () => {
    const [map, setMap] = React.useState(null);
    const mapRef = React.useRef(null);
    const [center, setCenter] = React.useState({ lat: 37.5665, lng: 126.9780 });
    const [zoom, setZoom] = React.useState(13);
    const [searchInput, setSearchInput] = React.useState("");
    const [filteredMedspas, setFilteredMedspas] = React.useState([]);
    const [placesService, setPlacesService] = React.useState(null);
    const [userLocation, setUserLocation] = React.useState(null);
    const [isSearching, setIsSearching] = React.useState(false);

    // Get current location
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(pos);
            setCenter(pos);
            if (mapRef.current) {
              mapRef.current.panTo(pos);
              mapRef.current.setZoom(14);
            }
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      }
    };

    // Initialize Places service
    const initPlacesService = (map) => {
      if (window.google && map) {
        const service = new window.google.maps.places.PlacesService(map);
        setPlacesService(service);
      }
    };

    // Search places
    const searchPlaces = (query) => {
      if (!placesService) {
        console.error('Places service not initialized');
        return;
      }

      setIsSearching(true);

      const request = {
        location: center,
        radius: '5000',
        query: `${query} dermatology clinic`,
        type: ['doctor', 'health'],
        language: 'en'
      };

      placesService.textSearch(request, (results, status) => {
        setIsSearching(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const filteredResults = results.filter(place => 
            place.name.toLowerCase().includes('clinic') ||
            place.name.toLowerCase().includes('dermatology') ||
            place.types.includes('doctor')
          );
          
          const medspas = filteredResults.map(place => ({
            id: place.place_id,
            name: place.name,
            rating: place.rating || 0,
            reviews: place.user_ratings_total || 0,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            image: place.photos?.[0]?.getUrl() || "https://via.placeholder.com/150",
            address: place.formatted_address
          }));

          setFilteredMedspas(medspas);

          if (medspas.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            medspas.forEach(({ location }) => bounds.extend(location));
            mapRef.current?.fitBounds(bounds);
          }
        } else {
          console.error('Places search failed:', status);
          setFilteredMedspas([]);
        }
      });
    };

    const handleSearch = (e) => {
      e.preventDefault();
      if (!searchInput.trim()) {
        return;
      }
      searchPlaces(searchInput.trim());
    };

    const mapOptions = {
      disableDefaultUI: true,
      zoomControl: !isMobile,
      gestureHandling: 'greedy',
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#8c5836" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#f8f5f2" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{ color: "#f8f5f2" }]
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [{ color: "#e9ddd2" }]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#d4bba6" }]
        }
      ],
      language: 'en'
    };

    const onLoad = React.useCallback((map) => {
      mapRef.current = map;
      initPlacesService(map);
      getCurrentLocation();
    }, []);

    const onUnmount = React.useCallback(() => {
      mapRef.current = null;
    }, []);

    if (!isLoaded) {
      return (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-luxe-500" />
        </div>
      );
    }

    return (
      <motion.div 
        className="min-h-screen bg-white pb-20"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-4 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search clinics..."
              className="w-full p-4 pl-12 pr-20 rounded-xl border border-luxe-200 focus:outline-none focus:ring-2 focus:ring-luxe-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-luxe-400" />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-luxe-500 text-white rounded-lg text-sm disabled:opacity-50"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </form>
          
          <div className="h-[calc(100vh-400px)] rounded-xl relative overflow-hidden">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={zoom}
              options={mapOptions}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#4285F4"/>
                        <circle cx="12" cy="12" r="6" fill="white"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(24, 24)
                  }}
                />
              )}

              {filteredMedspas.map((medspa) => (
                <Marker
                  key={medspa.id}
                  position={medspa.location}
                  onClick={() => {
                    setSelectedMedSpa(medspa);
                    if (mapRef.current) {
                      mapRef.current.panTo(medspa.location);
                      if (isMobile) {
                        mapRef.current.setZoom(15);
                      }
                    }
                  }}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#8c5836"/>
                        <circle cx="20" cy="20" r="8" fill="white"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                />
              ))}
            </GoogleMap>

            <button
              onClick={getCurrentLocation}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
            >
              <MapPin className="w-5 h-5 text-luxe-500" />
            </button>
          </div>

          {/* Search Results */}
          {filteredMedspas.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-luxe-900">Search Results</h2>
              {filteredMedspas.map((medspa) => (
                <motion.div
                  key={medspa.id}
                  className="bg-white rounded-xl border border-luxe-200 p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-semibold text-luxe-900">{medspa.name}</h3>
                  <p className="text-sm text-luxe-600">{medspa.address}</p>
                  {medspa.rating > 0 && (
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1">{medspa.rating}</span>
                      <span className="text-luxe-500 ml-1">({medspa.reviews} reviews)</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const DetailedAnalysis = ({ onBack, skinMetrics, selectedImage }) => (
    <motion.div 
      className="min-h-screen bg-white p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center space-x-2 text-luxe-500 mb-6"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Results</span>
      </motion.button>

      <motion.div 
        className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-2xl p-6 shadow-sm border border-luxe-200 mb-6"
        variants={fadeIn}
        transition={{ delay: 0.1 }}
      >
        {/* ... rest of the DetailedAnalysis component ... */}
      </motion.div>
    </motion.div>
  );

  // Add Community Screen Component
  const CommunityScreen = () => {
    const [selectedFilters, setSelectedFilters] = useState({
      region: 'all',
      treatment: 'all',
      ageGroup: 'all'
    });
    
    const [posts, setPosts] = useState([
      {
        id: 1,
        title: "My skin transformation journey",
        author: "Sarah K.",
        content: "After 3 months of consistent skincare routine...",
        likes: 245,
        comments: 56,
        views: 1200,
        region: "Seoul",
        treatment: "Acne",
        ageGroup: "20s",
        image: "https://images.unsplash.com/photo-1521510186458-bbbda7aef46b"
      },
      {
        id: 2,
        title: "Best products for sensitive skin",
        author: "Mike R.",
        content: "I've tried many products and these worked best...",
        likes: 189,
        comments: 43,
        views: 980,
        region: "Busan",
        treatment: "Sensitive Skin",
        ageGroup: "30s",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03"
      },
      {
        id: 3,
        title: "My anti-aging routine",
        author: "Emma L.",
        content: "The perfect combination of products...",
        likes: 320,
        comments: 89,
        views: 1500,
        region: "Incheon",
        treatment: "Anti-aging",
        ageGroup: "40s",
        image: "https://images.unsplash.com/photo-1521510186458-bbbda7aef46b"
      }
    ]);

    const topPosts = posts
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    const filteredPosts = posts.filter(post => {
      return (
        (selectedFilters.region === 'all' || post.region === selectedFilters.region) &&
        (selectedFilters.treatment === 'all' || post.treatment === selectedFilters.treatment) &&
        (selectedFilters.ageGroup === 'all' || post.ageGroup === selectedFilters.ageGroup)
      );
    });

    return (
      <motion.div className="min-h-screen bg-white pb-20">
        <div className="p-4 space-y-4">
          {/* 필터 섹션 */}
          <div className="bg-white rounded-xl border border-luxe-200 p-4">
            <h3 className="font-semibold text-luxe-900 mb-3">Filters</h3>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={selectedFilters.region}
                onChange={(e) => setSelectedFilters({...selectedFilters, region: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Regions</option>
                <option value="seoul">Seoul</option>
                <option value="busan">Busan</option>
                <option value="incheon">Incheon</option>
              </select>
              
              <select
                value={selectedFilters.treatment}
                onChange={(e) => setSelectedFilters({...selectedFilters, treatment: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Treatments</option>
                <option value="acne">Acne</option>
                <option value="anti-aging">Anti-aging</option>
                <option value="sensitive">Sensitive Skin</option>
              </select>
              
              <select
                value={selectedFilters.ageGroup}
                onChange={(e) => setSelectedFilters({...selectedFilters, ageGroup: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Ages</option>
                <option value="20s">20s</option>
                <option value="30s">30s</option>
                <option value="40s">40s</option>
              </select>
            </div>
          </div>

          {/* Top 3 Posts */}
          <div className="bg-white rounded-xl border border-luxe-200 p-4">
            <h3 className="font-semibold text-luxe-900 mb-3">Top Posts</h3>
            <div className="space-y-3">
              {topPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="flex items-center space-x-3 p-3 bg-luxe-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-luxe-500">#{index + 1}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-luxe-600">{post.views} views</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 필터된 포스트 목록 */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl border border-luxe-200 overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm bg-luxe-100 text-luxe-600 px-2 py-1 rounded-full">
                      {post.region}
                    </span>
                    <span className="text-sm bg-luxe-100 text-luxe-600 px-2 py-1 rounded-full">
                      {post.treatment}
                    </span>
                    <span className="text-sm bg-luxe-100 text-luxe-600 px-2 py-1 rounded-full">
                      {post.ageGroup}
                    </span>
                  </div>
                  <h3 className="font-semibold text-luxe-900">{post.title}</h3>
                  <p className="text-sm text-luxe-600 mt-1">Posted by {post.author}</p>
                  <p className="text-luxe-700 mt-2">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <button className="flex items-center space-x-1 text-luxe-500">
                      <Star className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-luxe-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <span className="text-luxe-400">{post.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Add Post Screen Component
  const PostScreen = () => {
    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    return (
      <motion.div 
        className="min-h-screen bg-white pb-20"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold text-luxe-900">Create Post</h2>
          
          <div className="space-y-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your skincare journey..."
              className="w-full h-32 p-4 rounded-xl border border-luxe-200 focus:outline-none focus:ring-2 focus:ring-luxe-300"
            />
            
            <div className="flex space-x-2">
              <button className="p-3 border border-luxe-200 rounded-xl">
                <Camera className="w-5 h-5 text-luxe-500" />
              </button>
              <button className="p-3 border border-luxe-200 rounded-xl">
                <Video className="w-5 h-5 text-luxe-500" />
              </button>
            </div>

            <button className="w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl">
              Post
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Add MyPage Screen Component
  const MyPageScreen = () => {
    // 피부 지표 데이터
    const timelineData = {
      hydration: [65, 68, 72, 75, 78, 80],
      elasticity: [70, 72, 75, 78, 80, 82],
      acne: [40, 45, 55, 65, 75, 85],
      texture: [60, 65, 70, 75, 78, 80],
      pores: [55, 60, 65, 70, 75, 78],
      pigment: [50, 55, 60, 70, 75, 80],
      skinAge: [32, 31, 30, 29, 28, 27] // 스킨 나이 추가
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    return (
      <motion.div 
        className="min-h-screen bg-white pb-20"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={user?.photoURL || 'https://via.placeholder.com/64'} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-luxe-900">{user?.displayName || 'User'}</h2>
              <p className="text-luxe-600">Skin Progress Report</p>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(timelineData).map(([metric, values]) => (
              <motion.div
                key={metric}
                className="bg-white rounded-xl border border-luxe-200 p-4"
                variants={fadeIn}
              >
                <h3 className="font-semibold text-luxe-900 capitalize mb-4">
                  {metric === 'skinAge' ? 'Skin Age' : metric}
                </h3>
                <div className="h-40 relative">
                  <svg className="w-full h-full">
                    {/* 라인 그리기 */}
                    <path
                      d={`M ${values.map((value, i) => 
                        `${(i * (100 / 5))}% ${100 - value}%`).join(' L ')}`}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                    />
                    
                    {/* 데이터 포인트 (원) */}
                    {values.map((value, i) => (
                      <circle
                        key={i}
                        cx={`${i * (100 / 5)}%`}
                        cy={`${100 - value}%`}
                        r="4"
                        className="fill-luxe-500"
                      />
                    ))}
                    
                    {/* 그라데이션 정의 */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="stop-color-luxe-400" />
                        <stop offset="100%" className="stop-color-luxe-300" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* x축 레이블 */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                    {months.map(month => (
                      <div key={month} className="text-xs text-luxe-600">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-luxe-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={resetToHome}
            className="text-xl font-bold text-luxe-500 hover:opacity-80 transition-opacity"
          >
            Asentica
          </button>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-luxe-100">
                  <img 
                    src={user.photoURL || 'https://via.placeholder.com/32'} 
                    alt={user.displayName || 'User'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/32';
                    }}
                  />
                </div>
                <span className="text-sm text-luxe-400">{user.displayName || 'User'}</span>
              </div>
            )}
            <button
              onClick={() => setShowMenu(true)}
              className="p-2 hover:bg-luxe-50 rounded-lg"
            >
              <Menu className="w-6 h-6 text-luxe-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <AnimatePresence mode="wait">
          {showMenu && <MenuOverlay key="menu" />}
          {currentTab === 'home' && (
            <>
              {step === 'upload' && <UploadScreen key="upload" />}
              {step === 'analyzing' && <AnalyzingScreen key="analyzing" />}
              {step === 'results' && analysisComplete && <ResultsScreen key="results" />}
              {step === 'detailed' && user && analysisComplete && (
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
            </>
          )}
          {currentTab === 'search' && <SearchScreen key="search" />}
          {currentTab === 'community' && <CommunityScreen key="community" />}
          {currentTab === 'post' && <PostScreen key="post" />}
          {currentTab === 'mypage' && <MyPageScreen key="mypage" />}
          {showAuthModal && (
            <AuthModal key="auth" onClose={() => setShowAuthModal(false)} />
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
};

export default SkinAnalysisApp; 