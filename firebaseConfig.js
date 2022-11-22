import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_APIKEY ,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET ,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID ,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app);




async function createUserDocument(result) {
  Firestore().collection("users").doc(result?.user?.uid)
  .set({
    uid: result?.user?.uid,
    L : result?.user?.displayName
  })

}


export {auth , db ,createUserDocument}