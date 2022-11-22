import React from 'react'
import { signInWithPopup , GoogleAuthProvider } from "firebase/auth"
import {auth} from "../../../firebaseConfig"

const LogIn = () => {

  const googleProvider = new GoogleAuthProvider()

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider) 
      console.log(result);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <button className='hidden lg:block w-20 lg:w-32 bg-[#0079D3] border-2 border-[#0079D3] text-white rounded-full px-7 mx-1 py-1 font-bold hover:cursor-pointer box-border' onClick={GoogleLogin} >
        Log In
    </button>
  )
}

export default LogIn