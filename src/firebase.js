import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBrLkvmPJBDcm8jGTZDB5GgqLSai0q96cg",
  authDomain: "linkedin-clone-9bafd.firebaseapp.com",
  projectId: "linkedin-clone-9bafd",
  storageBucket: "linkedin-clone-9bafd.appspot.com",
  messagingSenderId: "551028495706",
  appId: "1:551028495706:web:8277115ee850bdbc11cf63",
  measurementId: "G-GCSQD11DYP"
};


// const firebaseapp = firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};
export default db;