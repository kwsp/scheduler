import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7KL0c2Dy944au_0LyeyuSocnrSRe9y7g",
  authDomain: "scheduler-4cf6f.firebaseapp.com",
  databaseURL: "https://scheduler-4cf6f-default-rtdb.firebaseio.com",
  projectId: "scheduler-4cf6f",
  storageBucket: "scheduler-4cf6f.appspot.com",
  messagingSenderId: "888288068435",
  appId: "1:888288068435:web:c76a3cd7cce546d0f197a6",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
