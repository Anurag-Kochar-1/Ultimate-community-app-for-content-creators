import Image from 'next/image'
import React, {useState} from 'react'
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
import CreateCommunityModal from '../Community/Create/CreateCommunityModal'



const Header = () => {
  let [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState<boolean>(false)

  function closeModal() {
    setIsCreateCommunityModalOpen(false)
  }

  function openModal() {
    setIsCreateCommunityModalOpen(true)
  }
  const [user] = useAuthState(auth)
  console.log(user);
  

  return (
    <div className='w-full h-[6vh] bg-white py-4 px-3 flex justify-between items-center fixed top-0'>
      
      <LogoWname />
      <ChoosePageDropdown openModal={openModal} />
      <SearchBar />
      {user && <HeaderButtonOptions />}
      {!user && <LogInOrSignIn />}
      <CreateCommunityModal  
          isCreateCommunityModalOpen={isCreateCommunityModalOpen} 
          openModal={openModal} 
          closeModal={closeModal} 
        />
      <AccountDropdown />

    </div>
  )
}

export default Header