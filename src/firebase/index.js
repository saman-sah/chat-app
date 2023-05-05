// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { 
  getStorage, 
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { 
  getDatabase, 
  ref, 
  onValue, 
  set,
  update,
  off,
  push,
  get,
  child,
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
let storage= getStorage(firebaseApp)
export { 
    auth, 
    db, 
    storage,
    update,
    ref, 
    onValue, 
    set,
    off,
    push,
    get,
    child,
    onChildAdded,
    onChildChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    storageRef,
    uploadBytes,
    getDownloadURL,
}