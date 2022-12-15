import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../firebaseConfig'

const LogOutButton = () => {
  return (
    <button
    type='button'
    onClick={() => signOut(auth)}
    >
        Log out
    </button>
  )
}

export default LogOutButton