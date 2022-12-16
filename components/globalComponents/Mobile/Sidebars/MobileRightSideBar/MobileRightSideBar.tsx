import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../../../firebaseConfig'
import LoginButton from '../../../LoginButton/LoginButton'

interface IProps {
    isRightSidebarOpen: boolean
    setIsRightSidebarOpen : React.Dispatch<React.SetStateAction<boolean>> 
 }

const MobileRightSideBar = ({isRightSidebarOpen, setIsRightSidebarOpen}:IProps) => {


  if(!isRightSidebarOpen) return null  
  return (
    <div className='lg:hidden w-[80vw] h-[100vh] bg-midColor fixed right-0 top-[7vh] bottom-0 z-50'>
          <LoginButton />
         <button onClick={() => signOut(auth)}>  LOG OUT </button>
    </div>
  )
}

export default MobileRightSideBar