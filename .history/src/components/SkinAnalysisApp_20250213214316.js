//*
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Loader2, ChevronRight, Share2, MapPin, Star, Download, Instagram, MessageSquare, Video, Link, Menu, Home, Search, PlusSquare, Users, User, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DetailedAnalysis from './DetailedAnalysis';
import DoctorProfile from './DoctorProfile';
import ProductDetail from './ProductDetail';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import LandingPage from './LandingPage';
import QuizIntro from './QuizIntro';
import Quiz from './Quiz';
import MainPage from './MainPage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: "https://asentica-d473b-default-rtdb.firebaseio.com" // Realtime Database URL 추가
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Google Maps libraries를 상수로 선언
const libraries = ['places'];

const SkinAnalysisApp = () => {
  const [step, setStep] = useState('landing'); // Changed initial step to 'landing'
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
  const [quizCompleted, setQuizCompleted] = useState(() => {
    const saved = localStorage.getItem('quizCompleted');
    return saved ? JSON.parse(saved) : false;
  });
  const [quizAnswers, setQuizAnswers] = useState(() => {
    const saved = localStorage.getItem('quizAnswers');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    setQuizCompleted(false);
    setQuizAnswers(null);
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('quizAnswers');
    setCurrentTab('search');
  };

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

  // 퀴즈 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('quizCompleted', JSON.stringify(quizCompleted));
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
  }, [quizCompleted, quizAnswers]);

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

  // AI 분석 관련 컴포넌트 비활성화
  const AnalyzingScreen = () => null;
  const ResultsScreen = () => null;
  const DetailedAnalysis = () => null;
  const SearchScreen = () => null;

  // 하단 네비게이션 바 비활성화
  const BottomNav = () => null;

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
            AI Skin Insights,<br /> Backed by Top MDs
          </h1>
          <p className="text-luxe-400">Verified by top 5 MDs from NYC's leading medspas</p>
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

              <div className="p-4 rounded-xl">
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

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setStep('doctor');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setStep('product');
  };

  const handleDoctorProfileBack = () => {
    setSelectedDoctor(null);
    setStep('main');
  };

  const handleProductDetailBack = () => {
    setSelectedProduct(null);
    setStep('main');
  };

  const handleQuizComplete = (results) => {
    setQuizAnswers(results);
    setQuizCompleted(true);
    setCurrentTab('search');
  };

  const handleShareResults = () => {
    // Implement share functionality
    console.log('Sharing results');
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleSearch = (quizResults) => {
    // Implement search functionality
    console.log('Searching with filters:', quizResults);
  };

  const handleStartAnalysis = () => {
    setStep('upload');
  };

  const handleBackToLanding = () => {
    setStep('landing');
  };

  const handleBackToQuizIntro = () => {
    setStep('quiz-intro');
  };

  const handleBackToQuiz = () => {
    setStep('quiz');
  };

  const handleBackToMain = () => {
    setStep('main');
  };

  const handleBackToUpload = () => {
    setStep('upload');
  };

  const handleBackToResults = () => {
    setStep('results');
  };

  const handleBackToDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToDoctor = () => {
    setSelectedDoctor(null);
    setStep('main');
  };

  const handleBackToProduct = () => {
    setSelectedProduct(null);
    setStep('main');
  };

  const handleBackToSearch = () => {
    setCurrentTab('search');
    setStep('upload');
  };

  const handleBackToHome = () => {
    setCurrentTab('home');
    setStep('upload');
  };

  const handleBackToProfile = () => {
    // Implement profile navigation
    console.log('Navigating to profile');
  };

  const handleBackToSettings = () => {
    // Implement settings navigation
    console.log('Navigating to settings');
  };

  const handleBackToHelp = () => {
    // Implement help navigation
    console.log('Navigating to help');
  };

  const handleBackToAbout = () => {
    // Implement about navigation
    console.log('Navigating to about');
  };

  const handleBackToCommunity = () => {
    // Implement community navigation
    console.log('Navigating to community');
  };

  const handleBackToPost = () => {
    // Implement post navigation
    console.log('Navigating to post');
  };

  const handleBackToMyPage = () => {
    // Implement my page navigation
    console.log('Navigating to my page');
  };

  const handleBackToResultsDetailedAnalysis = () => {
    setStep('results');
  };

  const handleBackToResultsDoctor = () => {
    setSelectedDoctor(null);
    setStep('results');
  };

  const handleBackToResultsProduct = () => {
    setSelectedProduct(null);
    setStep('results');
  };

  const handleBackToResultsSearch = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsCommunity = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsPost = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsMyPage = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDoctor = () => {
    setSelectedDoctor(null);
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisProduct = () => {
    setSelectedProduct(null);
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisSearch = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunity = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPost = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPage = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisPostScreen = () => {
    setCurrentTab('post');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisMyPageScreen = () => {
    setCurrentTab('my-page');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisDetailedAnalysis = () => {
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisDoctorProfile = () => {
    setSelectedDoctor(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisProductDetail = () => {
    setSelectedProduct(null);
    setStep('detailed');
  };

  const handleBackToResultsDetailedAnalysisSearchScreen = () => {
    setCurrentTab('search');
    setStep('results');
  };

  const handleBackToResultsDetailedAnalysisCommunityScreen = () => {
    setCurrentTab('community');
    setStep('results');
  };

  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          {step !== 'landing' && (
            <button
              onClick={() => setStep('landing')}
              className="flex items-center space-x-2 text-luxe-500"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          <button 
            onClick={() => setStep('results')} 
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>
      <div className="max-w-md mx-auto min-h-screen bg-white">
        <div className="pb-20">
          <AnimatePresence mode="wait">
            {step === 'landing' && (
              <LandingPage 
                key="landing"
                onStartQuiz={() => setStep('quiz-intro')}
              />
            )}
            {step === 'quiz-intro' && (
              <QuizIntro
                key="quiz-intro"
                onStartQuiz={() => setStep('quiz')}
              />
            )}
            {step === 'quiz' && (
              <Quiz
                key="quiz"
                onComplete={(results) => {
                  setQuizAnswers(results);
                  setQuizCompleted(true);
                  setStep('main');
                }}
              />
            )}
            {step === 'main' && (
              <MainPage 
                key="main" 
                quizResults={quizAnswers} 
                onStartAnalysis={() => setStep('upload')} 
                onBack={() => setStep('quiz')}
                onDoctorClick={(doctor) => {
                  setSelectedDoctor(doctor);
                  setStep('doctor');
                }}
              />
            )}
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
                onBack={() => setStep('main')}
              />
            )}
            {step === 'product' && selectedProduct && (
              <ProductDetail
                key="product"
                product={selectedProduct}
                onBack={() => setStep('main')}
                skinMetrics={skinMetrics}
              />
            )}
          </AnimatePresence>
        </div>
        {step !== 'landing' && step !== 'quiz-intro' && step !== 'quiz' && <BottomNav />}
      </div>
    </div>
  );
};

export default SkinAnalysisApp; 