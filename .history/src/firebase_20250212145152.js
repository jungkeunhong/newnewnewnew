import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Firebase 환경 변수 로드 확인
console.log('Firebase API Key:', process.env.REACT_APP_FIREBASE_API_KEY);
console.log('Firebase Auth Domain:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log('Firebase Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log('Firebase Storage Bucket:', process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
console.log('Firebase Messaging Sender ID:', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log('Firebase App ID:', process.env.REACT_APP_FIREBASE_APP_ID);
console.log('Firebase Measurement ID:', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID);

console.log('Firebase 초기화 시작...');

const firebaseConfig = {
  apiKey: "AIzaSyCxXmxxdswUrxfpPKHGuOpogMJqjStoQmQ",
  authDomain: "asentica-d473b.firebaseapp.com",
  projectId: "asentica-d473b",
  storageBucket: "asentica-d473b.firebasestorage.app",
  messagingSenderId: "508854638415",
  appId: "1:508854638415:web:81d800e62d3bfc9f6ed73a",
  measurementId: "G-MTEH6347GV"
};

console.log('Firebase 설정:', {
  apiKey: firebaseConfig.apiKey ? '설정됨' : '미설정',
  authDomain: firebaseConfig.authDomain ? '설정됨' : '미설정',
  projectId: firebaseConfig.projectId ? '설정됨' : '미설정'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('Firebase 앱 초기화 성공');

// Auth 초기화
const auth = getAuth(app);
console.log('Firebase 인증 초기화 성공');

// Google 프로바이더 설정
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
console.log('Google 인증 프로바이더 설정 완료');

export { auth, googleProvider }; 