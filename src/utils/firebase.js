import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const analytics = getAnalytics(app);

// Analytics helper functions
export const trackEvent = (eventName, eventParams = {}) => {
  logEvent(analytics, eventName, eventParams);
};

export const trackPageView = (pageName) => {
  logEvent(analytics, 'page_view', {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

export const trackUserAction = (actionName, actionParams = {}) => {
  logEvent(analytics, 'user_action', {
    action_name: actionName,
    ...actionParams
  });
};

export const trackQuizCompletion = (quizResults) => {
  logEvent(analytics, 'quiz_completed', {
    ...quizResults
  });
};

export const trackTreatmentView = (treatmentId, treatmentName) => {
  logEvent(analytics, 'treatment_view', {
    treatment_id: treatmentId,
    treatment_name: treatmentName
  });
};

export default analytics; 