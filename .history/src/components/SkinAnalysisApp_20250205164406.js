import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, ChevronRight, Share2, MapPin, Star } from 'lucide-react';

const SkinAnalysisApp = () => {
  const [step, setStep] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
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

  const AnalyzingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="relative">
        {selectedImage && (
          <div className="w-64 h-64 rounded-2xl overflow-hidden mb-8">
            <img src={selectedImage} alt="Analyzing" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Analyzing...</h2>
          </div>
        </div>
      </div>
    </div>
  );

  const UploadScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4">
      {showMessage && (
        <div className="absolute top-8 left-4 right-4 bg-white rounded-xl p-4 shadow-lg animate-fade-in">
          <p className="text-center text-purple-800">Take a clear selfie in good lighting for best results! 📸</p>
        </div>
      )}
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Skin Analysis
          </h1>
          <p className="text-gray-600">Get your personalized skincare analysis in seconds</p>
        </div>
        
        {selectedImage && (
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="space-y-3">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Upload size={20} />
            <span>Upload Photo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center space-x-2 border border-purple-200 bg-white p-4 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <Camera size={20} />
            <span>Take Photo</span>
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">✨</span>
            <p className="text-sm text-purple-900">Professional-grade skin analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">🔒</span>
            <p className="text-sm text-purple-900">Private and secure</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚡️</span>
            <p className="text-sm text-purple-900">Results in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="flex-1 overflow-auto p-4 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden">
              <img src={selectedImage} alt="Your photo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Overall Score: 7.2/10
              </h2>
              <div className="mt-2">Skin Age: <span className="font-semibold">27</span></div>
              <div className="text-sm text-purple-600">Skin Type: Combination</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(skinMetrics).map(([key, value], i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{value.emoji}</span>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {value.score}/10
                </div>
              </div>
              <div className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className="text-sm text-gray-600">{value.description}</div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {/* Navigate to detailed analysis */}}
          className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
        >
          <span className="font-medium">View Detailed Analysis</span>
          <ChevronRight className="w-5 h-5 text-purple-400" />
        </button>

        <div className="bg-white rounded-xl p-4">
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
              <button key={i} className="w-full flex items-center p-3 border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors">
                <span className="text-2xl mr-2">{product.icon}</span>
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
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
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
              <button key={i} className="w-full flex items-center p-3 border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors">
                <span className="text-2xl mr-2">{clinic.icon}</span>
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
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {/* Share functionality */}}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 mb-6"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Results</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {step === 'upload' && <UploadScreen />}
      {step === 'analyzing' && <AnalyzingScreen />}
      {step === 'results' && <ResultsScreen />}
    </div>
  );
};

export default SkinAnalysisApp; 