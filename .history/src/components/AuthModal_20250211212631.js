import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const AuthModal = ({ onClose }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting Google sign in...');
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      console.log('Initiating popup...');
      const result = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', result.user.email);
      
      onClose();
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-luxe-900 mb-4">Sign In</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <span className="animate-spin mr-2">⌛</span>
          ) : (
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          )}
          <span>{isLoading ? '로그인 중...' : 'Continue with Google'}</span>
        </motion.button>
        <motion.button
          onClick={onClose}
          disabled={isLoading}
          className={`w-full mt-4 p-3 text-luxe-600 hover:text-luxe-800 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal; 