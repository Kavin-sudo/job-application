// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5s3k7fPi5w5DGLBjjF4yAP8xFLS6dHBI",
    authDomain: "job-application-f9db0.firebaseapp.com",
    projectId: "job-application-f9db0",
    storageBucket: "job-application-f9db0.appspot.com",
    messagingSenderId: "615442184352",
    appId: "1:615442184352:web:e8f4309b8d1ba7d39271c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };