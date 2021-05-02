import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
     apiKey: "AIzaSyACUHZpKW-xCqjHNkcfPBBRLkoR2psidlM",
    authDomain: "virtual-study-resource-22246.firebaseapp.com",
    projectId: "virtual-study-resource-22246",
    storageBucket: "virtual-study-resource-22246.appspot.com",
    messagingSenderId: "292200384513",
    appId: "1:292200384513:web:339682794f5a171d38d800",
    measurementId: "G-P54RNR4GS2"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
  
  export default firebase 