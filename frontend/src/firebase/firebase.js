import firebase from 'firebase/app'
import 'firebase/storage'

let firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "recipedia-edabe.firebaseapp.com",
  projectId: "recipedia-edabe",
  storageBucket: "recipedia-edabe.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export  {
  storage, firebase as default
}
