// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_9UDpyDE7Inggml_e2V6weWIWGYMXuWI",
  authDomain: "study-app-95acc.firebaseapp.com",
  projectId: "study-app-95acc",
  storageBucket: "study-app-95acc.firebasestorage.app",
  messagingSenderId: "593562012357",
  appId: "1:593562012357:web:cb8f4324daa4e1ec637eac",
  measurementId: "G-3V0WY50F1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
