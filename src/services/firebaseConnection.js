//firebase database
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyDlQ5xeVccXnyRZLfgcumTjESb8i4sC9-c",
  authDomain: "rpgficha-3f22d.firebaseapp.com",
  projectId: "rpgficha-3f22d",
  storageBucket: "rpgficha-3f22d.firebasestorage.app",
  messagingSenderId: "61510694513",
  appId: "1:61510694513:web:dcacb125f54036d6fc4dd0"

};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db}; 

