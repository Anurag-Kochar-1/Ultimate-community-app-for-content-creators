import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../../firebaseConfig'
import LoginButton from '../../../SignInWithGoogleButton/SignInWithGoogleButton'

interface IProps {
    isRightSidebarOpen: boolean
    setIsRightSidebarOpen : React.Dispatch<React.SetStateAction<boolean>> 
 }

const MobileRightSideBar = ({isRightSidebarOpen, setIsRightSidebarOpen}:IProps) => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  if(!isRightSidebarOpen) return null  
  return (
    <div className='lg:hidden w-[80vw] h-[100vh] bg-midColor fixed right-0 top-[7vh] bottom-0 z-50 space-x-6'>
          <LoginButton />
         <button type='button' onClick={() => {
          signOut(auth)
          router.reload()
         } }>  LOG OUT </button>

         <button className='px-5 py-2 rounded-full bg-green-500 text-white' onClick={() => {
          console.log(user)
         }}>
            LOG USER
         </button>
    </div>
  )
}

export default MobileRightSideBar