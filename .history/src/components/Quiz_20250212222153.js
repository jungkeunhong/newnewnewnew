import React, { useState } from 'react';

const Quiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: '',
    ethnicity: '',
    skinType: '',
    concerns: [],
    products: {
      cleansers: [],
      treatments: [],
      makeup: []
    },
    goals: [],
    userInfo: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const questions = {
    1: {
      title: "Please select your age",
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
    2: {
      title: "What is your ethnicity?",
      options: [
        "Asian",
        "Black/African American",
        "Hispanic/Latino",
        "White",
        "Middle Eastern/North African",
        "Indian/South Asian",
        "Pacific Islander",
        "Other"
      ],
      type: "single"
    },
    3: {
      title: "What is your skin type?",
      options: [
        "Dry",
        "Oily",
        "Combination",
        "Normal",
        "Sensitive",
        "Don't know"
      ],
      type: "single"
    },
    4: {
      title: "What are your skin concerns?",
      options: [
        "Acne",
        "Hyperpigmentation",
        "Fine lines or Wrinkles",
        "Enlarged Pores",
        "Dryness",
        "Breakouts or blemishes",
        "Oiliness",
        "Lack of firmness",
        "Under-eye skin",
        "Clogged pores or blackheads",
        "Dullness",
        "Redness",
        "Uneven texture",
        "Sensitivity",
        "Scars or marks"
      ],
      type: "multiple"
    },
    5: {
      title: "What products do you use regularly?",
      sections: {
        cleansers: {
          title: "Cleansers",
          options: [
            "Rinse-off cleanser",
            "Micellar water",
            "Cleansing oil"
          ]
        },
        treatments: {
          title: "Treatments and moisturizers",
          options: [
            "Toner",
            "SPF",
            "Serum",
            "Scrub",
            "Face oil",
            "Mask",
            "Eye cream",
            "Moisturizer"
          ]
        },
        makeup: {
          title: "Makeup",
          options: [
            "Eye makeup",
            "Lip makeup",
            "Face makeup"
          ]
        }
      },
      type: "sections"
    },
    6: {
      title: "What are your skincare goals?",
      options: [
        "Graceful aging",
        "Extra hydration",
        "Firmer texture",
        "Smoother surface",
        "Softened wrinkles",
        "Reduced redness",
        "Reduced shine/oil",
        "Fewer dark spots",
        "Fewer blemishes",
        "Boosted glow"
      ],
      type: "multiple"
    },
    7: {
      title: "Your personalized skin analysis is here",
      type: "userInfo"
    }
  };

  const handleSingleSelect = (answer) => {
    const field = currentStep === 1 ? 'age' :
                 currentStep === 2 ? 'ethnicity' :
                 currentStep === 3 ? 'skinType' : '';
    
    setAnswers(prev => ({
      ...prev,
      [field]: answer
    }));
    setCurrentStep(prev => prev + 1);
  };

  const handleMultipleSelect = (answer) => {
    const field = currentStep === 4 ? 'concerns' :
                 currentStep === 6 ? 'goals' : '';
    
    setAnswers(prev => ({
      ...prev,
      [field]: prev[field].includes(answer)
        ? prev[field].filter(item => item !== answer)
        : [...prev[field], answer]
    }));
  };

  const handleProductSelect = (section, product) => {
    setAnswers(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [section]: prev.products[section].includes(product)
          ? prev.products[section].filter(item => item !== product)
          : [...prev.products[section], product]
      }
    }));
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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleComplete = () => {
    const { firstName, lastName, email } = answers.userInfo;
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    onComplete(answers);
  };

  const renderQuestion = () => {
    const question = questions[currentStep];

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="cormorant text-3xl mb-8 text-center">{question.title}</h2>

        {question.type === 'single' && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSingleSelect(option)}
                className="w-full p-4 text-left border rounded-lg hover:border-[#3E2723] transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'multiple' && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMultipleSelect(option)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  answers[currentStep === 4 ? 'concerns' : 'goals'].includes(option)
                    ? 'border-[#3E2723] bg-[#3E2723]/5'
                    : 'hover:border-[#3E2723]'
                }`}
              >
                {option}
              </button>
            ))}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="luxury-button"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {question.type === 'sections' && (
          <div className="space-y-8">
            {Object.entries(question.sections).map(([section, { title, options }]) => (
              <div key={section} className="space-y-4">
                <h3 className="text-xl font-medium mb-4">{title}</h3>
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleProductSelect(section, option)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      answers.products[section].includes(option)
                        ? 'border-[#3E2723] bg-[#3E2723]/5'
                        : 'hover:border-[#3E2723]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="luxury-button"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {question.type === 'userInfo' && (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="First Name"
              value={answers.userInfo.firstName}
              onChange={(e) => handleUserInfoChange('firstName', e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#3E2723]"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={answers.userInfo.lastName}
              onChange={(e) => handleUserInfoChange('lastName', e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#3E2723]"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={answers.userInfo.email}
              onChange={(e) => handleUserInfoChange('email', e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:border-[#3E2723]"
            />
            <button
              onClick={handleComplete}
              className="w-full luxury-button mt-8"
            >
              Complete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#3E2723]/20">
        <div 
          className="h-full bg-[#3E2723]"
          style={{ width: `${(currentStep / Object.keys(questions).length) * 100}%` }}
        />
      </div>

      {renderQuestion()}
    </div>
  );
};

export default Quiz; 