import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCxXmxxdswUrxfpPKHGuOpogMJqjStoQmQ",
  authDomain: "asentica-d473b.firebaseapp.com",
  projectId: "asentica-d473b",
  storageBucket: "asentica-d473b.firebasestorage.app",
  messagingSenderId: "508854638415",
  appId: "1:508854638415:web:81d800e62d3bfc9f6ed73a",
  measurementId: "G-MTEH6347GV"
};

console.log('Firebase 초기화 시작...');

try {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  console.log('Firebase 초기화 완료');
  console.log('Auth 초기화 완료');

  export { auth, googleProvider };
} catch (error) {
  console.error('Firebase 초기화 중 오류 발생:', error);
  throw error;
} 