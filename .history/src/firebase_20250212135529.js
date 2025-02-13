import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxXmxxdswUrxfpPKHGuOpogMJqjStoQmQ",
  authDomain: "asentica-d473b.firebaseapp.com",
  projectId: "asentica-d473b",
  storageBucket: "asentica-d473b.firebasestorage.app",
  messagingSenderId: "508854638415",
  appId: "1:508854638415:web:81d800e62d3bfc9f6ed73a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };
export default app; 