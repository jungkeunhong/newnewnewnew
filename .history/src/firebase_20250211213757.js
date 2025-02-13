import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxXmxxdswUrxfpPKHGuOpogMJqjStoQmQ",
  authDomain: "asentica-d473b.firebaseapp.com",
  projectId: "asentica-d473b",
  storageBucket: "asentica-d473b.firebasestorage.app",
  messagingSenderId: "508854638415",
  appId: "1:508854638415:web:81d800e62d3bfc9f6ed73a",
  measurementId: "G-MTEH6347GV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
export default app; 