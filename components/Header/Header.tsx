import Image from 'next/image'
import React from 'react'
import LogoWname from '../Branding/LogoWname'
import SearchBar from '../SearchBar/SearchBar'
import AccountDropdown from './AccountDropdown/AccountDropdown'
import LogInOrSignIn from './Buttons/Groups/LogInOrSignIn'
import LogIn from './Buttons/LogIn'
import SignUp from './Buttons/SignUp'
import ChoosePageDropdown from './ChoosePageDropdown/ChoosePageDropdown'
import HeaderButtonOptions from './HeaderButtonOptions/HeaderButtonOptions'
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from '../../firebaseConfig'



const Header = () => {
  const [user] = useAuthState(auth)

  return (
    <div className='w-full h-[6vh] bg-white py-4 px-3 flex justify-between items-center'>
      
      <LogoWname />
      <ChoosePageDropdown />
      <SearchBar />
      {user && <HeaderButtonOptions />}
      {!user && <LogInOrSignIn />}
      <AccountDropdown />

    </div>
  )
}

export default Header