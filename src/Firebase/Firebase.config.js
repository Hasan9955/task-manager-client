// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDekPk8NnY0EneadbNSf0hGnNdK_3g2eVA",
  authDomain: "task-master-client.firebaseapp.com",
  projectId: "task-master-client",
  storageBucket: "task-master-client.appspot.com",
  messagingSenderId: "411008390817",
  appId: "1:411008390817:web:f5154d35cf5e22e54182e0",
  measurementId: "G-XP09ZXTYW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export default app;