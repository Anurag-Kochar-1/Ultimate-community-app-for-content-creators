import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

interface IProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBarMenu = ({isSidebarOpen, setIsSidebarOpen}:IProps) => {
  return (
    <div className='lg:hidden w-[80vw] h-[100vh] bg-brandColor fixed left-0 top-[7vh] bottom-0 z-50'>
         {/* <AiOutlineMenu 
          className='lg:hidden w-6 h-6 text-darkColor hover:cursor-pointer' 
          onClick={() => { isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true) }}
          /> */}
    </div>
  )
}

export default SideBarMenu