import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React from 'react'
import { auth, db } from '../../../firebaseConfig'

const LoginButton = () => {
  const googleProvider = new GoogleAuthProvider()

  const googleLogin =  async() => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const userRef = doc(db, "users", result?.user.uid)
      const userDoc = await getDoc(userRef)

      if(userDoc.exists()) {
        console.log(`User already Exist => ${userDoc.id}`);
      } else {
        console.log(`Creating User !!!`)
        await setDoc(doc(db, "users", result?.user?.uid), {
          communitiesJoinedID: [],
          communitiesOwnedID: [],
          postsUpvoted: [],
          postsDownvoted: [],
          createdPostsID: []
        })
        
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
      <button
      type='button'
      className='px-5 py-1 bg-brandColor text-lightColor border-b-4 border-r-4 border-darkColor'
      onClick={googleLogin}
      >
        Log in
      </button>
  )
}

export default LoginButton