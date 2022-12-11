import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'

const LogInOrSignIn = () => {
  return (
    <div className=' hidden lg:inline-flex space-x-2 '>
        <SignUp />
        <LogIn />
    </div>
  )
}

export default LogInOrSignIn