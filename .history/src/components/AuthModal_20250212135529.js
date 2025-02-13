import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthModal = ({ onClose }) => {
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        console.log('로그인 성공:', result.user.email);
        onClose();
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-xl font-semibold text-luxe-900 mb-4">Sign In</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
        <button
          onClick={onClose}
          className="w-full mt-4 p-3 text-luxe-600 hover:text-luxe-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal; 