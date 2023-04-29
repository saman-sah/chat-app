// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { 
  getDatabase, 
  ref, 
  onValue, 
  set,
  update,
  off,
  onChildAdded,
  onChildChanged
} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAtU2w1igIhVOMWTHM77o0ypdeleKMALVg",
  authDomain: "chat-app-32eff.firebaseapp.com",
  projectId: "chat-app-32eff",
  storageBucket: "chat-app-32eff.appspot.com",
  messagingSenderId: "733763316787",
  appId: "1:733763316787:web:c979541c2829e29dbfc746"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let auth= getAuth(firebaseApp);
let db= getDatabase(firebaseApp);
export { 
    auth, 
    db, 
    update,
    ref, 
    onValue, 
    set,
    off,
    onChildAdded,
    onChildChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
}