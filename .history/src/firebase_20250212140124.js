import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxXmxxdswUrxfpPKHGuOpogMJqjStoQmQ",
  authDomain: "asentica-d473b.firebaseapp.com",
  projectId: "asentica-d473b",
  storageBucket: "asentica-d473b.appspot.com", // 수정된 부분
  messagingSenderId: "508854638415",
  appId: "1:508854638415:web:81d800e62d3bfc9f6ed73a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };
export default app;