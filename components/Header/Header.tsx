import Image from 'next/image'
import React from 'react'
import LogoWname from '../Branding/LogoWname'
import SearchBar from '../SearchBar/SearchBar'
import AccountDropdown from './AccountDropdown/AccountDropdown'
import LogIn from './Buttons/LogIn'
import SignUp from './Buttons/SignUp'
import ChoosePageDropdown from './ChoosePageDropdown/ChoosePageDropdown'



const Header = () => {
  return (
    <div className='w-full h-[6vh] bg-white py-4 px-3 flex justify-between items-center'>
      
      <LogoWname />
      <ChoosePageDropdown />
      <SearchBar />
      <SignUp />
      <LogIn />
      <AccountDropdown />

    </div>
  )
}

export default Header