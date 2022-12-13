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



 



const Header = () => {
  return (
    <div className='w-full h-[7vh] bg-lightColor py-4 px-3 flex justify-between items-center fixed top-0 shadow-sm shadow-midColor'>
      <div className='flex justify-center items-center space-x-2'>
        <AiOutlineMenu className='lg:hidden w-6 h-6 text-darkColor hover:cursor-pointer'/>
        <Link href={'/'}>
          <Image src={offstaLogo} alt="logo" className='hidden lg:inline-block w-12 h-12 border border-gray-200 rounded-full md:inline-block' />
        </Link>
        <SearchBar />
      </div>

      <NavTabs />

      <div className='flex justify-center items-center space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6 2xl:space-x-6 lg:pr-7'>
        <CreateOptionsDropdown />
        <AiOutlineSearch className='md:hidden w-6 h-6 text-darkColor hover:cursor-pointer '/>
        <AiOutlineBell className='w-6 h-6 text-darkColor hover:cursor-pointer'/>
        <AiOutlineMessage className='hidden lg:inline-block w-6 h-6 text-darkColor hover:cursor-pointer'/>
      </div>
      

        
     
    </div>
  )
}

export default Header