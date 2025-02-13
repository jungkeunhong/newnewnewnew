import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthModal = ({ onClose }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.email);
        onClose();
      }
    });

    return () => unsubscribe();
  }, [onClose]);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('Starting Google sign in...');
      const provider = new GoogleAuthProvider();
      
      // 팝업 차단 해제를 위해 사용자 상호작용 직후 바로 실행
      const result = await signInWithPopup(auth, provider);
      console.log('Sign in result:', result);
      
    } catch (error) {
      console.error('Google sign in error:', error);
      if (error.code === 'auth/popup-blocked') {
        setError('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('로그인이 취소되었습니다.');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-luxe-900 mb-4">Sign In</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        <motion.button
          onClick={handleGoogleSignIn}
          className="w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </motion.button>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-full mt-4 p-3 text-luxe-600 hover:text-luxe-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal; 