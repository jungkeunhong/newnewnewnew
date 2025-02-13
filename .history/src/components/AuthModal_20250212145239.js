import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Loader2 } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    console.log('로그인 버튼 클릭됨');
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Google 로그인 시도...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('로그인 성공:', result.user.email);
      
      // 로그인 성공 후 처리
      localStorage.setItem('user', JSON.stringify({
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      }));
      
      onClose();
      window.location.href = '/skin-analysis';
    } catch (error) {
      console.error('로그인 에러:', error);
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      
      switch (error.code) {
        case 'auth/popup-blocked':
          errorMessage = '팝업이 차단되었습니다. 팝업 차단을 해제해주세요.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = '로그인 창이 닫혔습니다. 다시 시도해주세요.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = '이전 로그인 요청이 진행 중입니다.';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
          onClick={handleGoogleLogin}
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