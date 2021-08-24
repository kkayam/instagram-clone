import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDQUz3MB_OjF6eXyYj3rbk730YMOLdUHO0",
    authDomain: "koraystagram-a410c.firebaseapp.com",
    projectId: "koraystagram-a410c",
    storageBucket: "koraystagram-a410c.appspot.com",
    messagingSenderId: "212576333821",
    appId: "1:212576333821:web:954ef406803d5fdc9c3394"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;