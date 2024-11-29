import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAmUaktQo9TV_aV_ceMZARESpJfBHZXuQ",
  authDomain: "cashcompass-8dc83.firebaseapp.com",
  projectId: "cashcompass-8dc83",
  storageBucket: "cashcompass-8dc83.appspot.com",
  messagingSenderId: "425419848378",
  appId: "1:425419848378:web:b24a74d0fbfeef87c36083",
  measurementId: "G-12Z114T00E"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app)

export {db, app, analytics, auth}