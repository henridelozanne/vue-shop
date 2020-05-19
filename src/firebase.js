import firebase from 'firebase';
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAEYhCIcyZJRUSgd0Ll8wOUdDtyhVG15is",
  authDomain: "vue-shop-411af.firebaseapp.com",
  databaseURL: "https://vue-shop-411af.firebaseio.com",
  projectId: "vue-shop-411af",
  storageBucket: "vue-shop-411af.appspot.com",
  messagingSenderId: "587837220159",
  appId: "1:587837220159:web:f520c133fea09627735f8a",
  measurementId: "G-PW0MW5EQS9"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db }
