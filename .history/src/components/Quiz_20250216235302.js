import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import Analytics from '../utils/analytics';
import ScrollToTop from '../components/ScrollToTop';

const Quiz = ({ onComplete, onBack }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [answers, setAnswers] = useState({
    age: '',
    ethnicity: '',
    skinAfterWashing: '',
    skinTexture: '',
    pores: '',
    fineLines: '',
    skinElasticity: '',
    goals: [],
    userInfo: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const questions = [
    {
      id: 'age',
      title: "Your age is",
      options: [
        "Under 20",
        "In my 20s",
        "In my 30s",
        "In my 40s",
        "In my 50s",
        "60 or over"
      ],
      type: "single"
    },
    {
      id: 'ethnicity',
      title: "Your background is",
      options: [
        "Asian",
        "Black/African",
        "Hispanic/Latino",
        "White",
        "Middle Eastern",
        "South Asian",
        "Pacific Islander",
        "Other"
      ],
      type: "single"
    },
    {
      id: 'skinAfterWashing',
      title: "Your skin after washing",
      options: [
        "Dry immediately",
        "Dry after a while",
        "Stays hydrated",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 'skinTexture',
      title: "Your skin texture feels",
      options: [
        "Smooth",
        "Rough",
        "Bumpy",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 'pores',
      title: "Your pores are",
      options: [
        "Barely visible",
        "Slightly enlarged",
        "Very visible",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 'fineLines',
      title: "Fine lines or wrinkles are",
      options: [
        "Not noticeable",
        "Starting to show",
        "Quite visible",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 'skinElasticity',
      title: "Pinch your cheek. It bounces back",
      options: [
        "Immediately",
        "Slowly",
        "Very slowly",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 'goals',
      title: "You want to achieve",
      options: [
        "Glowing skin",
        "Even tone",
        "Firmer skin",
        "Smoother texture",
        "Less wrinkles",
        "Less redness",
        "Oil control",
        "Fewer spots",
        "Clear skin",
        "Hydration"
      ],
      type: "multiple"
    }
  ];

  const handleSelect = (questionId, option) => {
    Analytics.track(`Quiz_${questionId}_Selection`, {
      question: questionId,
      selected_option: option
    });

    if (questions.find(q => q.id === questionId).type === 'multiple') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: prev[questionId].includes(option)
          ? prev[questionId].filter(item => item !== option)
          : [...prev[questionId], option]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: option
      }));
    }
  };

  const handleUserInfoChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [field]: value
      }
    }));
  };

  const isQuizComplete = () => {
    return Object.entries(answers).every(([key, value]) => {
      if (key === 'userInfo') return true;
      const question = questions.find(q => q.id === key);
      return question.type === 'multiple' ? value.length > 0 : value !== '';
    });
  };

  const isUserInfoComplete = () => {
    const { firstName, lastName, email } = answers.userInfo;
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
  };

  useEffect(() => {
    if (showUserInfo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showUserInfo]);

  if (showUserInfo) {
    return (
      <div className="min-h-screen bg-white/95">
        <ScrollToTop />
        {/* Top Logo */}
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
          <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-luxe-500"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button 
              className="cormorant text-2xl text-center text-[#3E2723]"
            >
              Asentica
            </button>
            <div className="w-10" />
          </div>
        </div>

        <div className="pt-24 px-4 max-w-md mx-auto space-y-8" id="userInfoTop">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-light text-[#1A1A1A]">
              Your personalized skin analysis is here
            </h2>
            <p className="text-[#1A1A1A]/70">
              We'll email you a tailored skin treatment plan shortly
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-[#1A1A1A]/70">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="First Name"
                value={answers.userInfo.firstName}
                onChange={(e) => handleUserInfoChange('firstName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-[#1A1A1A]/70">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Last Name"
                value={answers.userInfo.lastName}
                onChange={(e) => handleUserInfoChange('lastName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-[#1A1A1A]/70">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="Email Address"
                value={answers.userInfo.email}
                onChange={(e) => handleUserInfoChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
              />
            </div>
          </div>

          <motion.button
            onClick={() => isUserInfoComplete() && onComplete(answers)}
            className={`w-full py-4 px-6 rounded-full flex items-center justify-center space-x-2 transition-all
              ${isUserInfoComplete()
                ? 'bg-[#1A1A1A] text-white hover:opacity-90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            whileHover={isUserInfoComplete() ? { scale: 1.02 } : {}}
            whileTap={isUserInfoComplete() ? { scale: 0.98 } : {}}
          >
            <span>See your matches</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Mixpanel 트래킹을 위한 수정된 onComplete 핸들러 */}
          {isUserInfoComplete() && (
            <motion.button
              onClick={() => {
                // Mixpanel에 사용자 정보 트래킹
                Analytics.track('Quiz_User_Info_Submitted', {
                  first_name: answers.userInfo.firstName,
                  last_name: answers.userInfo.lastName,
                  email: answers.userInfo.email,
                  quiz_answers: answers
                });

                // Mixpanel 사용자 프로필 업데이트
                Analytics.identifyUser();
                mixpanel.people.set({
                  $first_name: answers.userInfo.firstName,
                  $last_name: answers.userInfo.lastName,
                  $email: answers.userInfo.email,
                  quiz_completion_date: new Date().toISOString(),
                  quiz_answers: answers
                });

                onComplete(answers);
              }}
              className="hidden"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/95">
      <ScrollToTop />
      {/* Top Logo */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-[#3E2723]/10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-luxe-500"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button 
            className="cormorant text-2xl text-center text-[#3E2723]"
          >
            Asentica
          </button>
          <div className="w-10" />
        </div>
      </div>

      <div className="pt-24 pb-10 px-4 max-w-screen-xl mx-auto">
        {questions.map((question) => (
          <div key={question.id} className="mb-8">
            <h3 className="text-xl font-light text-[#1A1A1A] mb-4">
              {question.title}
            </h3>
            <div className="overflow-x-auto">
              <div className={`flex ${question.id === 'concerns' || question.id === 'goals' 
                ? 'flex-wrap' 
                : 'flex-nowrap'} gap-2 min-w-min pb-2`}>
                {question.options.map((option) => {
                  const isSelected = question.type === 'multiple'
                    ? answers[question.id].includes(option)
                    : answers[question.id] === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(question.id, option)}
                      className={`px-4 py-2 rounded-xl text-sm shrink-0 transition-all
                        ${isSelected 
                          ? 'bg-[#1A1A1A] text-white' 
                          : 'bg-gray-100 text-[#1A1A1A] hover:bg-gray-200'}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <motion.button
          onClick={() => isQuizComplete() && setShowUserInfo(true)}
          className={`w-full py-4 px-6 rounded-full flex items-center justify-center space-x-2 transition-all
            ${isQuizComplete() 
              ? 'bg-[#1A1A1A] text-white hover:opacity-90' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          whileHover={isQuizComplete() ? { scale: 1.02 } : {}}
          whileTap={isQuizComplete() ? { scale: 0.98 } : {}}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Quiz; 