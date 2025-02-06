import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signInWithRedirect, signInWithPopup, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Loader2 } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        setIsLoading(true);
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Successfully signed in:', result.user.email);
          // Keep the URL parameters intact for SkinAnalysisApp to handle
          onClose();
        }
      } catch (error) {
        console.error('Error signing in with Google:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    handleRedirectResult();
  }, [onClose]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Preserve the current URL with parameters for the redirect
        const currentUrl = window.location.href;
        googleProvider.setCustomParameters({
          login_hint: 'user@gmail.com',
          prompt: 'select_account',
          redirect_uri: currentUrl
        });
        await signInWithRedirect(auth, googleProvider);
        return;
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Successfully signed in:', result.user.email);
        onClose();
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
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
        <h3 className="text-xl font-semibold text-purple-900 mb-4">Sign in Required</h3>
        <p className="text-gray-600 mb-6">
          Please sign in with your Google account to view the detailed analysis.
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error === 'auth/popup-closed-by-user' 
              ? 'Sign in was cancelled. Please try again.' 
              : error}
          </div>
        )}
        <motion.button
          onClick={handleGoogleSignIn}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 mb-4 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </>
          )}
        </motion.button>
        <motion.button
          onClick={onClose}
          className="w-full p-4 text-gray-600 rounded-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal; 