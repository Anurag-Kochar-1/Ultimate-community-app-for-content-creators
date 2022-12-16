import {useState} from "react"
import Image from 'next/image'
import React from 'react'
import offstaLogo from "../../../public/images/offstaLogo.png"
import Link from 'next/link'
// Icons
import {AiOutlineMenu, 
AiOutlineSearch, 
AiOutlineBell, 
AiOutlineUser,
AiOutlineMessage
}   from "react-icons/ai"
import {RiAddFill} from "react-icons/ri"

import SearchBar from './components/SearchBar/SearchBar'
import CreateOptionsDropdown from './components/CreateOptionsDropdown/CreateOptionsDropdown'
import AccountDropdown from './components/AccountDropdown/AccountDropdown'
import NavTabs from './components/NavTabs/NavTabs'
import LoginButton from '../LoginButton/LoginButton'
import LogOutButton from '../LogOutButton/LogOutButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebaseConfig'
import SideBarMenu from "../Mobile/Sidebars/MobileLeftSideBar/MobileLeftSideBar"


 
interface IProps {
  isLeftSidebarOpen: boolean
  setIsLeftSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  isRightSidebarOpen: boolean
  setIsRightSidebarOpen : React.Dispatch<React.SetStateAction<boolean>> 
}


const Header =  ({isLeftSidebarOpen, setIsLeftSidebarOpen, isRightSidebarOpen, setIsRightSidebarOpen}:IProps) => {
  const [user] = useAuthState(auth)


  return (
    <div className='w-full h-[7vh] bg-lightColor py-4 px-3 flex justify-between items-center fixed top-0 shadow-sm shadow-midColor'>
      <div className='flex justify-center items-center space-x-2'>
        <AiOutlineMenu 
          className='lg:hidden w-6 h-6 text-darkColor hover:cursor-pointer' 
          onClick={() => { isLeftSidebarOpen ? setIsLeftSidebarOpen(false) : setIsLeftSidebarOpen(true) }}
        />


        <Link href={'/'}>
          <Image src={offstaLogo} alt="logo" className='hidden lg:inline-block w-12 h-12 border border-gray-200 rounded-full md:inline-block' />
        </Link>
        <SearchBar />
      </div>

      <NavTabs />

      <div className='flex justify-center items-center space-x-4 md:space-x-3 lg:space-x-4 xl:space-x-6 2xl:space-x-6 lg:pr-7'>
        {/* {!user && <LoginButton />} */}
        {/* <LogOutButton /> */}
        <CreateOptionsDropdown />
        <AiOutlineSearch className='md:hidden w-6 h-6 text-darkColor hover:cursor-pointer '/>
        <AiOutlineBell className='w-6 h-6 text-darkColor hover:cursor-pointer'/>
        {!user && <AiOutlineUser className='lg:hidden w-6 h-6 text-darkColor hover:cursor-pointer' onClick={() => isRightSidebarOpen ? setIsRightSidebarOpen(false) : setIsRightSidebarOpen(true)}/>}
        {user && (
          <img
          className='w-6 h-6 rounded-full aspect-square'
          src={user.photoURL as string}
          alt="DP"
          onClick={() => isRightSidebarOpen ? setIsRightSidebarOpen(false) : setIsRightSidebarOpen(true)}
          />
        )}

        {/* {user && <AccountDropdown />} */}
        <AiOutlineMessage className='hidden lg:inline-block w-6 h-6 text-darkColor hover:cursor-pointer'/>
      </div>
      

        
     
    </div>
  )
}

export default Header