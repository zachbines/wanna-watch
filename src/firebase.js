import firebase from 'firebase';
// slightly different syntax 
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB0aHrAKmxEAVXqUsC8ploGlE7Evdx9sdI",
  authDomain: "wanna-watch-1bbd1.firebaseapp.com",
  databaseURL: "https://wanna-watch-1bbd1-default-rtdb.firebaseio.com",
  projectId: "wanna-watch-1bbd1",
  storageBucket: "wanna-watch-1bbd1.appspot.com",
  messagingSenderId: "323726731034",
  appId: "1:323726731034:web:e056e16773bc69c7e4aea3"
};

// initialize firebase 
firebase.initializeApp(firebaseConfig);

export default firebase;