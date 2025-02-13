import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Loader2 } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('AuthModal 컴포넌트가 렌더링되었습니다.');

  function handleClick() {
    console.log('버튼이 클릭되었습니다!');
    
    setIsLoading(true);
    setError(null);

    console.log('Google 로그인 시도 중...');
    
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log('로그인 성공:', result.user.email);
        // 로그인 성공 후 처리
        localStorage.setItem('user', JSON.stringify({
          email: result.user.email,
          displayName: result.user.displayName,
          uid: result.user.uid
        }));
        onClose();
        // SkinAnalysis 페이지로 이동
        window.location.href = '/skin-analysis';
      })
      .catch((error) => {
        console.error('로그인 에러:', error);
        setError('로그인 중 오류가 발생했습니다: ' + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-xl font-semibold text-luxe-900 mb-4">로그인 필요</h3>
        <p className="text-luxe-600 mb-6">
          계속하려면 Google 계정으로 로그인해주세요.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleClick}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-luxe-400 to-luxe-300 text-white p-4 rounded-xl flex items-center justify-center space-x-2 mb-4 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Google로 계속하기</span>
            </>
          )}
        </button>

        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full p-4 text-luxe-500 rounded-xl hover:bg-luxe-50"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default AuthModal; 