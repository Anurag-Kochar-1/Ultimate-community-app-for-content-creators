import React from 'react'
import { signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebaseConfig';

const ChoosePageDropdown = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
        <h3> Home </h3>
        {/* <h3 onClick={() => signOut(auth)} className='font-bold text-lg text-emerald-400'> {user?.displayName} </h3> */}
    </div>
  )
}

export default ChoosePageDropdown