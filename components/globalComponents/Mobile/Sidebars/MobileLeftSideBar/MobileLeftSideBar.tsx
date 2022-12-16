import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

interface IProps {
  isLeftSidebarOpen: boolean
    setIsLeftSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileLeftSideBarMenu = ({isLeftSidebarOpen, setIsLeftSidebarOpen}:IProps) => {


  if (!isLeftSidebarOpen) return null  
  return (
    <div className='lg:hidden w-[80vw] h-[100vh] bg-brandColor fixed left-0 top-[7vh] bottom-0 z-50  '>
        
    </div>
  )
}

export default MobileLeftSideBarMenu