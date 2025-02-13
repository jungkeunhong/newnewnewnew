import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Loader2, ChevronRight, Share2, MapPin, Star, Download, Instagram, MessageSquare, Video, Link, Menu, Home, Search, PlusSquare, Users, User, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DetailedAnalysis from './DetailedAnalysis';
import DoctorProfile from './DoctorProfile';
import ProductDetail from './ProductDetail';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// Google Maps libraries를 상수로 선언
const libraries = ['places'];

const SkinAnalysisApp = () => {
  const [step, setStep] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTab, setCurrentTab] = useState('search');
  const [selectedMedSpa, setSelectedMedSpa] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    language: 'en'
  });

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
        const imageResult = reader.result;
        setSelectedImage(imageResult);
        sessionStorage.setItem('selectedImage', imageResult);
        setStep('analyzing');
        
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
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageResult = reader.result;
        setSelectedImage(imageResult);
        sessionStorage.setItem('selectedImage', imageResult);
        setStep('analyzing');
        
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
    hydration: { 
      score: 7, 
      emoji: "💧", 
      description: "Well hydrated",
      treatments: ["Hydrafacial", "Aquagold"]
    },
    elasticity: { 
      score: 8, 
      emoji: "✨", 
      description: "Very elastic",
      treatments: ["Ultherapy", "RF Microneedling"] 
    },
    acne: { 
      score: 6, 
      emoji: "🔬", 
      description: "Mild acne",
      treatments: ["Chemical Peel", "LED Therapy"]
    },
    texture: { 
      score: 7, 
      emoji: "🧬", 
      description: "Slightly uneven",
      treatments: ["Microdermabrasion", "CO2 Laser"]
    },
    pores: { 
      score: 8, 
      emoji: "👁️", 
      description: "Minimally visible",
      treatments: ["Fractional Laser", "Microneedling"]
    },
    pigment: { 
      score: 7, 
      emoji: "🎯", 
      description: "Even tone",
      treatments: ["IPL", "Picosure Laser"]
    }
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
            📸 Select and take a close-up photo of your concern area (forehead, nose, cheeks, etc.)
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
            Expert Level AI Analysis
          </h1>
          <p className="text-luxe-400">Verified by top 5 MDs from NYC's leading aesthetic clinics</p>
        </motion.div>
        
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

          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-4">
              <div className="p-4 bg-luxe-50 rounded-xl">
                <h3 className="font-medium text-luxe-900 mb-2">📸 Photo Guide</h3>
                <ul className="space-y-2 text-sm text-luxe-600">
                  <li className="flex items-center">
                    <span className="mr-2">🎯</span>
                    <span>Take a close-up photo of your concern area (forehead, nose, cheeks, etc.)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌟</span>
                    <span>For overall analysis, take a full face photo in bright lighting</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🧹</span>
                    <span>Clean your camera lens before taking photos</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-luxe-50 rounded-xl">
                <h3 className="font-medium text-luxe-900 mb-2">🔒 Privacy Protection</h3>
                <p className="text-sm text-luxe-600">
                  Your photos are used only for skin analysis and will never be stored.
                </p>
              </div>
            </div>
          </motion.div>
        </>
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
    setStep('detailed');
    window.history.replaceState({}, '', `${window.location.pathname}?step=detailed`);
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
              <div className="text-xs text-luxe-500 mt-1">Recommended: {value.treatments.join(", ")}</div>
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
          className={`flex flex-col items-center space-y-1 ${currentTab === 'search' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTab('search')}
        >
          <Search size={24} />
          <span className="text-xs">Search</span>
        </motion.button>
        <motion.button
          className={`flex flex-col items-center space-y-1 ${currentTab === 'home' ? 'text-luxe-500' : 'text-luxe-300'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentTab('home');
            setStep('upload');
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" 
            fill="currentColor"/>
          </svg>
          <span className="text-xs">My Skin</span>
        </motion.button>
      </div>
    </div>
  );

  const SearchScreen = ({ quizResults }) => {
    const [selectedFilters, setSelectedFilters] = useState({
      ethnicity: quizResults?.ethnicity || 'all',
      skinType: quizResults?.skinType || 'all',
      skinConcern: quizResults?.concerns?.[0] || 'all',
      ageGroup: quizResults?.ageGroup || 'all'
    });

    const recommendedClinics = [
      {
        id: 1,
        name: "Dr. Sarah Kim",
        specialty: "Dermatologist",
        expertise: ["Acne", "Laser", "Anti-aging"],
        rating: 4.9,
        reviews: 528,
        distance: "0.8",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
        recommendation: "Specialized in treating combination skin with advanced laser therapy",
        bestTreatment: "Aquagold + LED Therapy"
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Cosmetic Dermatologist",
        expertise: ["Skin Texture", "Pigmentation", "Facial Contouring"],
        rating: 4.8,
        reviews: 423,
        distance: "1.2",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
        recommendation: "Highly rated for treating Asian skin concerns",
        bestTreatment: "Fractional Laser + PRP"
      },
      {
        id: 3,
        name: "Dr. Emily Parker",
        specialty: "Medical Aesthetician",
        expertise: ["Hydration", "Sensitive Skin", "Rejuvenation"],
        rating: 4.7,
        reviews: 389,
        distance: "1.5",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
        recommendation: "Expert in customized skincare for sensitive skin",
        bestTreatment: "Hydrafacial + RF Treatment"
      }
    ];

    return (
      <motion.div 
        className="min-h-screen bg-white pb-20"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-4 space-y-6">
          <div className="bg-gradient-to-br from-luxe-50 to-luxe-100 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-luxe-900 mb-2">Recommended for Your Skin</h2>
            <p className="text-sm text-luxe-600">Based on people like you who achieved great results</p>
          </div>

          {/* Top 3 Recommended Clinics */}
          <div className="space-y-4">
            {recommendedClinics.map((clinic, index) => (
              <motion.div
                key={clinic.id}
                className="bg-white rounded-xl border border-luxe-200 p-4 hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <img src={clinic.image} alt={clinic.name} className="w-20 h-20 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-luxe-900">{clinic.name}</h3>
                    <p className="text-sm text-luxe-600">{clinic.specialty}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm">{clinic.rating}</span>
                      <span className="text-luxe-500 ml-1 text-sm">({clinic.reviews} reviews)</span>
                      <span className="text-luxe-600 ml-2 text-sm">{clinic.distance}mi</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-luxe-500">{clinic.recommendation}</p>
                      <p className="text-xs text-luxe-400 mt-1">Best Treatment: {clinic.bestTreatment}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {clinic.expertise.map((exp, i) => (
                        <span key={i} className="text-xs bg-luxe-50 text-luxe-600 px-2 py-1 rounded-full">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-luxe-200 p-4">
            <h3 className="font-semibold text-luxe-900 mb-3">Find Your Perfect Match</h3>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedFilters.ethnicity}
                onChange={(e) => setSelectedFilters({...selectedFilters, ethnicity: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Ethnicities</option>
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="Hispanic">Hispanic</option>
                <option value="White">White</option>
                <option value="Mixed">Mixed</option>
              </select>
              
              <select
                value={selectedFilters.skinType}
                onChange={(e) => setSelectedFilters({...selectedFilters, skinType: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Skin Types</option>
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Normal">Normal</option>
              </select>
              
              <select
                value={selectedFilters.skinConcern}
                onChange={(e) => setSelectedFilters({...selectedFilters, skinConcern: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Concerns</option>
                <option value="Acne">Acne & Breakouts</option>
                <option value="Aging">Anti-aging</option>
                <option value="Pigmentation">Pigmentation</option>
                <option value="Texture">Texture</option>
                <option value="Pores">Pores</option>
              </select>
              
              <select
                value={selectedFilters.ageGroup}
                onChange={(e) => setSelectedFilters({...selectedFilters, ageGroup: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Age Groups</option>
                <option value="20s">20s</option>
                <option value="30s">30s</option>
                <option value="40s">40s</option>
                <option value="50s">50s</option>
                <option value="60+">60+</option>
              </select>
            </div>
          </div>

          {/* AI Diagnosis CTA */}
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-br from-luxe-400 to-luxe-300 rounded-xl text-white text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-2">Want More Personalized Recommendations?</h3>
            <p className="text-sm mb-4">Get AI-powered skin analysis for treatments perfectly matched to your needs</p>
            <motion.button
              onClick={() => setCurrentTab('home')}
              className="bg-white text-luxe-500 px-6 py-3 rounded-lg font-medium hover:bg-luxe-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start AI Skin Analysis
            </motion.button>
          </motion.div>
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
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img src={selectedImage} alt="Analysis" className="w-24 h-24 rounded-xl object-cover" />
            <div>
              <h2 className="text-2xl font-bold text-luxe-900">Detailed Analysis</h2>
              <p className="text-luxe-600">Based on your latest skin scan</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(skinMetrics).map(([key, value], index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{value.emoji}</span>
                  <h3 className="font-medium capitalize">{key}</h3>
                </div>
                <div className="text-3xl font-bold text-luxe-500">{value.score}/10</div>
                <p className="text-sm text-luxe-600 mt-1">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-luxe-900">Recommendations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl">
                <h4 className="font-medium mb-2">Treatments</h4>
                <ul className="space-y-2 text-sm text-luxe-600">
                  <li>• LED Light Therapy</li>
                  <li>• Hydrating Facial</li>
                  <li>• Micro-needling</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <h4 className="font-medium mb-2">Products</h4>
                <ul className="space-y-2 text-sm text-luxe-600">
                  <li>• Vitamin C Serum</li>
                  <li>• Hyaluronic Acid</li>
                  <li>• Niacinamide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Add Community Screen Component
  const CommunityScreen = () => {
    const [selectedFilters, setSelectedFilters] = useState({
      ethnicity: 'all',
      treatment: 'all',
      ageGroup: 'all',
      skinType: 'all'
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
        ethnicity: "Asian",
        treatment: "Acne",
        ageGroup: "20s",
        skinType: "Combination"
      },
      {
        id: 2,
        title: "Best products for sensitive skin",
        author: "Mike R.",
        content: "I've tried many products and these worked best...",
        likes: 189,
        comments: 43,
        views: 980,
        ethnicity: "Hispanic",
        treatment: "Sensitive Skin",
        ageGroup: "30s",
        skinType: "Sensitive"
      },
      {
        id: 3,
        title: "My anti-aging routine",
        author: "Emma L.",
        content: "The perfect combination of products...",
        likes: 320,
        comments: 89,
        views: 1500,
        ethnicity: "White",
        treatment: "Anti-aging",
        ageGroup: "40s",
        skinType: "Dry"
      }
    ]);

    const topPosts = posts
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    const filteredPosts = posts.filter(post => {
      return (
        (selectedFilters.ethnicity === 'all' || post.ethnicity === selectedFilters.ethnicity) &&
        (selectedFilters.treatment === 'all' || post.treatment === selectedFilters.treatment) &&
        (selectedFilters.ageGroup === 'all' || post.ageGroup === selectedFilters.ageGroup) &&
        (selectedFilters.skinType === 'all' || post.skinType === selectedFilters.skinType)
      );
    });

    return (
      <motion.div className="min-h-screen bg-white pb-20">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl border border-luxe-200 p-4">
            <h3 className="font-semibold text-luxe-900 mb-3">Filters</h3>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedFilters.ethnicity}
                onChange={(e) => setSelectedFilters({...selectedFilters, ethnicity: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Ethnicities</option>
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="Hispanic">Hispanic</option>
                <option value="White">White</option>
                <option value="Mixed">Mixed</option>
                <option value="Other">Other</option>
              </select>
              
              <select
                value={selectedFilters.skinType}
                onChange={(e) => setSelectedFilters({...selectedFilters, skinType: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Skin Types</option>
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Normal">Normal</option>
                <option value="Acne-Prone">Acne-Prone</option>
                <option value="Mature">Mature</option>
                <option value="Dehydrated">Dehydrated</option>
              </select>
              
              <select
                value={selectedFilters.treatment}
                onChange={(e) => setSelectedFilters({...selectedFilters, treatment: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">Skin Concerns</option>
                <option value="acne">Acne & Breakouts</option>
                <option value="wrinkles">Wrinkles & Firmness</option>
                <option value="pigmentation">Pigmentation</option>
                <option value="pores">Pores</option>
                <option value="tmj">TMJ & Facial Tension</option>
                <option value="lip">Lip Volume</option>
                <option value="dryness">Dryness & Dehydration</option>
                <option value="redness">Redness & Sensitivity</option>
                <option value="sagging">Sagging & Elasticity</option>
                <option value="texture">Texture</option>
              </select>
              
              <select
                value={selectedFilters.ageGroup}
                onChange={(e) => setSelectedFilters({...selectedFilters, ageGroup: e.target.value})}
                className="p-2 border border-luxe-200 rounded-lg"
              >
                <option value="all">All Age Groups</option>
                <option value="10s">Teens</option>
                <option value="20s">20s</option>
                <option value="30s">30s</option>
                <option value="40s">40s</option>
                <option value="50s">50s</option>
                <option value="60+">60+</option>
              </select>
            </div>
          </div>

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
                      {post.ethnicity}
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
    const timelineData = {
      skinAge: [35, 34, 32, 29, 28, 25],
      hydration: [2, 3, 2, 5, 7, 8],
      elasticity: [5, 6, 7, 6, 6, 7],
      acne: [4, 5, 5, 6, 5, 5],
      texture: [2, 3, 2, 5, 7, 8],
      pores: [5, 6, 5, 7, 5, 7],
      pigment: [5, 5, 6, 7, 7, 8]
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Calculate improvements
    const improvements = {
      skinAge: ((35 - 25) / 35 * 100).toFixed(1),
      hydration: ((8 - 2) / 2 * 100).toFixed(1),
      texture: ((8 - 2) / 2 * 100).toFixed(1)
    };

    return (
      <motion.div 
        className="min-h-screen bg-white pb-20"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-4 space-y-6">
          <div className="bg-white rounded-xl border border-luxe-200 p-6">
            <h2 className="text-xl font-semibold text-luxe-900 mb-4">How My Skin Changed</h2>
            
            {/* Before & After Photos */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=800&auto=format&fit=crop"
                  alt="First Analysis" 
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <p className="text-center text-sm text-luxe-600">January 1, 2024</p>
              </div>
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1552699611-c7c2d8a5d829?w=800&auto=format&fit=crop"
                  alt="Latest Analysis" 
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <p className="text-center text-sm text-luxe-600">June 15, 2024</p>
              </div>
            </div>

            {/* Encouraging Message */}
            <div className="text-center mb-6 bg-luxe-50 p-3 rounded-lg">
              <p className="text-sm text-luxe-600">
                ✨ Amazing progress in just 6 months! Keep going!
              </p>
            </div>

            {/* Improvements Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium text-luxe-800 mb-2">Key Improvements</h3>
                <ul className="list-disc list-inside text-luxe-600">
                  <li>Skin age reduced by 10 years</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-luxe-800 mb-2">Areas for Improvement</h3>
                <ul className="list-disc list-inside text-luxe-600">
                  <li>Maintain UV protection routine</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(timelineData).map(([metric, values], index) => (
              <motion.div
                key={metric}
                className="bg-white rounded-xl border border-luxe-200 p-4"
                variants={fadeIn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-luxe-900 capitalize mb-4">
                  {metric === 'skinAge' ? 'Skin Age' : metric}
                </h3>
                <div className="h-40 relative">
                  <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between">
                    {metric === 'skinAge' ? 
                      [50, 40, 30, 20, 10, 0].map(value => (
                        <div key={value} className="text-xs text-luxe-600">{value}</div>
                      )) :
                      [10, 8, 6, 4, 2, 0].map(value => (
                        <div key={value} className="text-xs text-luxe-600">{value}</div>
                      ))
                    }
                  </div>

                  <div className="ml-8 h-full">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      {[0, 1, 2, 3, 4, 5].map((_, i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={`${i * 20}%`}
                          x2="100%"
                          y2={`${i * 20}%`}
                          stroke="#f8f5f2"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Smooth Line Graph */}
                      <path
                        d={`M ${values.map((value, i) => {
                          const x = i * (100 / (values.length - 1));
                          const y = metric === 'skinAge' ? 
                            (100 - (value / 50 * 100)) : 
                            (100 - (value / 10 * 100));
                          return `${x},${y}`;
                        }).join(' C ')}`.replace(/L/g, '')}
                        fill="none"
                        stroke={`url(#gradient-${metric})`}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data Points */}
                      {values.map((value, i) => {
                        const x = i * (100 / (values.length - 1));
                        const y = metric === 'skinAge' ? 
                          (100 - (value / 50 * 100)) : 
                          (100 - (value / 10 * 100));
                        return (
                          <g key={i}>
                            <circle
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="4"
                              className="fill-luxe-500"
                            />
                            <text
                              x={`${x}%`}
                              y={`${y}%`}
                              dy="-10"
                              textAnchor="middle"
                              className="text-xs fill-luxe-600"
                            >
                              {value}
                            </text>
                          </g>
                        );
                      })}

                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id={`gradient-${metric}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#b37a4e" />
                          <stop offset="100%" stopColor="#c49a7a" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* X-axis Labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                      {months.map(month => (
                        <div key={month} className="text-xs text-luxe-600">
                          {month}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Add SkinQuizScreen Component
  const SkinQuizScreen = ({ onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleBack = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else {
        setCurrentTab('search');
        setStep('upload');
      }
    };

    const questions = [
      {
        id: 1,
        question: "What is your primary skin goal?",
        options: ["Clear Acne", "Anti-aging", "Even Skin Tone", "Hydration", "Pore Refinement"]
      },
      {
        id: 2,
        question: "Which facial area concerns you the most?",
        options: ["Forehead", "Under Eyes", "Cheeks", "Jaw Line", "Nose Area"]
      },
      {
        id: 3,
        question: "What type of treatments interest you?",
        options: ["Topical Products", "Facial Treatments", "Injectables", "Laser Treatments", "Natural Remedies"]
      },
      {
        id: 4,
        question: "How would you describe your skin's texture?",
        options: ["Smooth", "Rough", "Bumpy", "Uneven", "Fine Lines"]
      },
      {
        id: 5,
        question: "What's your biggest skincare challenge?",
        options: ["Breakouts", "Aging Signs", "Sensitivity", "Dryness", "Oiliness"]
      },
      {
        id: 6,
        question: "Which skin improvement would make you most confident?",
        options: ["Brighter Complexion", "Fewer Wrinkles", "Less Acne", "Smaller Pores", "Even Tone"]
      },
      {
        id: 7,
        question: "How often do you receive professional skin treatments?",
        options: ["Never", "Few times a year", "Monthly", "Bi-weekly", "Weekly"]
      },
      {
        id: 8,
        question: "What's your preferred treatment method?",
        options: ["Quick & Effective", "Natural & Gentle", "High-tech", "Traditional", "Combination"]
      },
      {
        id: 9,
        question: "How much time do you spend on skincare daily?",
        options: ["5 minutes", "10-15 minutes", "15-30 minutes", "30+ minutes", "Varies"]
      },
      {
        id: 10,
        question: "What's your investment priority in skincare?",
        options: ["Prevention", "Treatment", "Maintenance", "Enhancement", "Recovery"]
      }
    ];

    const handleAnswer = (answer) => {
      setAnswers({...answers, [currentQuestion]: answer});
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completed - analyze results and move to analysis
        const quizResults = analyzeQuizResults(answers);
        onComplete(quizResults);
      }
    };

    const analyzeQuizResults = (answers) => {
      // 퀴즈 결과를 분석하여 맞춤형 추천을 생성하는 로직
      // 이 부분은 실제 비즈니스 로직에 맞게 구현해야 합니다
      return {
        skinType: "Combination",
        concerns: ["Acne", "Hydration"],
        recommendations: {
          treatments: ["Chemical Peel", "LED Therapy"],
          products: ["Salicylic Acid Cleanser", "Hyaluronic Acid Serum"]
        }
      };
    };

    return (
      <motion.div 
        className="min-h-screen bg-white p-4"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          onClick={handleBack}
          className="flex items-center space-x-2 text-luxe-500 mb-6"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-luxe-900 mb-2">Skin Quiz</h2>
            <p className="text-luxe-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>

          <motion.div 
            className="bg-white rounded-xl border border-luxe-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-medium text-luxe-900 mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="w-full p-4 text-left rounded-xl border border-luxe-200 hover:bg-luxe-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center">
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentQuestion ? 'bg-luxe-500' : 'bg-luxe-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // 페이지 변경시 스크롤 위치 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, currentTab]);

  // 퀴즈 완료 핸들러 추가
  const handleQuizComplete = (results) => {
    setQuizAnswers(results);
    setCurrentTab('search');
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
        </div>
      </div>

      <div className="pb-20">
        <AnimatePresence mode="wait">
          {currentTab === 'search' && quizAnswers && <SearchScreen key="search" quizResults={quizAnswers} />}
          {currentTab === 'search' && !quizAnswers && <SkinQuizScreen key="quiz" onComplete={handleQuizComplete} />}
          {currentTab === 'home' && (
            <>
              {step === 'upload' && <UploadScreen key="upload" />}
              {step === 'analyzing' && <AnalyzingScreen key="analyzing" />}
              {step === 'results' && analysisComplete && <ResultsScreen key="results" />}
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
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
};

export default SkinAnalysisApp; 