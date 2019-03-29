import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5EoRoyOP1q9MAmB2DaHgbEW-QV_pro98",
    authDomain: "chat-ebuka-geo.firebaseapp.com",
    databaseURL: "https://chat-ebuka-geo.firebaseio.com",
    projectId: "chat-ebuka-geo",
    storageBucket: "chat-ebuka-geo.appspot.com",
    messagingSenderId: "24840535418"
  };
  
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  //Export firestore so that we can make use of it outside this component.
  export default firebaseApp.firestore();