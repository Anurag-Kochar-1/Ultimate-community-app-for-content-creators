import React from 'react'
import { signInWithPopup , GoogleAuthProvider } from "firebase/auth"
import {auth, db} from "../../../../../../firebaseConfig"
import { Firestore , doc, addDoc, collection, setDoc, getDoc} from 'firebase/firestore'
import { useDispatch } from "react-redux"
import { setUser } from "../../../../../../redux/slices/userSlice"

const LogIn = () => {
  const dispatch = useDispatch()
  const googleProvider = new GoogleAuthProvider()

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider) 
      const specificUsersDocRef = doc(db, "users" , result?.user?.uid as string)
      const specificUserDocSnap = await getDoc(specificUsersDocRef)
      

      if(specificUserDocSnap.exists()) {
        console.log("Document data:", specificUserDocSnap.data());
        console.log(`user already exists`)
      }else {
        console.log("creating user!");
        await setDoc(doc(db, "users", result.user.uid), {
          subredditsOwnedID: [],
          subredditsJoinedID: [],
          createdPostsID: [],
          upvotedPostsID: [],
          downvotedPostsID: []
        });  
      } 

        // dispatch(setUser(specificUserDocSnap.data()))
      


     
    } catch (error) {
      console.log(error);   
    }
  }


  

  return (
    <button type='button' className='w-20 lg:w-32 bg-[#0079D3] border-2 border-[#0079D3] text-white rounded-full px-7 mx-1 py-1 font-bold hover:cursor-pointer box-border' onClick={GoogleLogin} >
        Log In
    </button>
  )
}

export default LogIn