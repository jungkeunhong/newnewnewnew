import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Analytics from '../utils/analytics';

const Quiz = ({ onComplete }) => {
  const [answers, setAnswers] = useState({
    age: '',
    ethnicity: '',
    skinType: '',
    concerns: [],
    goals: []
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
      id: 'skinType',
      title: "Your skin is",
      options: [
        "Dry",
        "Oily",
        "Combination",
        "Normal",
        "Sensitive",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 'concerns',
      title: "You're concerned about",
      options: [
        "Acne",
        "Dark spots",
        "Fine lines",
        "Large pores",
        "Dryness",
        "Breakouts",
        "Oiliness",
        "Sagging",
        "Under-eye",
        "Blackheads",
        "Dullness",
        "Redness",
        "Texture",
        "Sensitivity"
      ],
      type: "multiple"
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

  const isComplete = () => {
    return Object.entries(answers).every(([key, value]) => {
      const question = questions.find(q => q.id === key);
      return question.type === 'multiple' ? value.length > 0 : value !== '';
    });
  };

  return (
    <div className="min-h-screen bg-white/95 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-12">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <h3 className="text-xl font-light text-[#1A1A1A]">
              {question.title}
            </h3>
            <div className="overflow-x-auto pb-4">
              <div className="flex flex-wrap gap-2 min-w-max">
                {question.options.map((option) => {
                  const isSelected = question.type === 'multiple'
                    ? answers[question.id].includes(option)
                    : answers[question.id] === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(question.id, option)}
                      className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap
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
          onClick={() => isComplete() && onComplete(answers)}
          className={`w-full py-4 px-6 rounded-full flex items-center justify-center space-x-2 transition-all
            ${isComplete() 
              ? 'bg-[#1A1A1A] text-white hover:opacity-90' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          whileHover={isComplete() ? { scale: 1.02 } : {}}
          whileTap={isComplete() ? { scale: 0.98 } : {}}
        >
          <span>See your matches</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Quiz; 