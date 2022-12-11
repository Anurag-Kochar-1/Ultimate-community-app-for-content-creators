import Image from 'next/image'
import React from 'react'
import offstaLogo from "../../../public/images/offstaLogo.png"

// Icons
import {AiOutlineMenu, 
AiOutlineSearch, 
AiOutlineBell, 
AiOutlineUser

}   from "react-icons/ai"
 



const Header = () => {
  return (
    <div className='w-full h-[6vh] bg-gray-200 py-4 px-3 flex justify-between items-center fixed top-0'>
      <div className='flex justify-center items-center space-x-2'>
        <AiOutlineMenu className='lg:hidden w-6 h-6 text-darkColor hover:cursor-pointer'/>
        <Image src={offstaLogo} alt="logo" className='hidden lg:inline-block w-12 h-12 border border-gray-200 rounded-full md:inline-block' />
      </div>

      <div className='flex justify-center items-center space-x-2'>
        <AiOutlineSearch className='w-6 h-6 text-darkColor hover:cursor-pointer'/>
        <AiOutlineBell className='w-6 h-6 text-darkColor hover:cursor-pointer'/>
        <AiOutlineUser className='w-6 h-6 text-darkColor hover:cursor-pointer'/>

      </div>
      

        
     
    </div>
  )
}

export default Header