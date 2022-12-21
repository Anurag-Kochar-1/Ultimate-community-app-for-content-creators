import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { auth, db } from '../../../firebaseConfig'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setIsLoginModalOpen } from '../../../redux/slices/modalSlices'

const SignInWithGoogleButton = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const googleProvider = new GoogleAuthProvider()
  

  const googleLogin =  async() => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const userRef = doc(db, "users", result?.user.uid)
      const userDoc = await getDoc(userRef)

      if(userDoc.exists()) {
        console.log(`User already Exist => ${userDoc.id}`);
      } else {
        console.log(`!!! Creating User !!!`)
        await setDoc(doc(db, "users", result?.user?.uid), {
          communitiesJoinedID: [],
          communitiesOwnedID: [],
          createdPostsID: [],
          
          upvotedPostsID: [],
          downvotedPostsID: [],
        })
      }

      dispatch(setIsLoginModalOpen(false))
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="w-[80%] py-2 flex justify-center items-center space-x-3 rounded-full bg-lightColor border border-gray-300 hover:cursor-pointer" onClick={googleLogin}>
        <FcGoogle className="text-lg" /> 
        <span className="text-darkColor text-base"> Sign in with Google </span>
      </div>
  )
}

export default SignInWithGoogleButton