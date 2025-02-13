import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Loader2 } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('=== Google 로그인 시작 ===');
    console.log('1. 버튼 클릭됨');
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('2. 로그인 시도 중...');
      console.log('auth 객체:', auth);
      console.log('googleProvider 객체:', googleProvider);
      
      const result = await signInWithPopup(auth, googleProvider);
      
      console.log('3. 로그인 성공!');
      console.log('사용자 정보:', {
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      });
      
      onClose();
    } catch (error) {
      console.error('=== 로그인 에러 발생 ===');
      console.error('에러 코드:', error.code);
      console.error('에러 메시지:', error.message);
      
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = '로그인 창이 닫혔습니다. 다시 시도해주세요.';
          break;
        case 'auth/popup-blocked':
          errorMessage = '팝업이 차단되었습니다. 팝업 차단을 해제해주세요.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = '이전 로그인 요청이 진행 중입니다.';
          break;
        case 'auth/network-request-failed':
          errorMessage = '네트워크 연결을 확인해주세요.';
          break;
        default:
          errorMessage = `로그인 실패: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      console.log('4. 로그인 프로세스 종료');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-luxe-900 mb-4">로그인 필요</h3>
        <p className="text-luxe-600 mb-6">
          계속하려면 Google 계정으로 로그인해주세요.
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        <motion.button
          onClick={handleGoogleSignIn}
          className="w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2 mb-4 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Google로 계속하기</span>
            </>
          )}
        </motion.button>
        <motion.button
          onClick={onClose}
          className="w-full p-4 text-luxe-500 rounded-xl hover:bg-luxe-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          취소
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal; 