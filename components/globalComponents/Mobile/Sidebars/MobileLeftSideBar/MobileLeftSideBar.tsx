import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import style from "../../../../../styles/Home.module.css"

interface IProps {
  isLeftSidebarOpen: boolean
    setIsLeftSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileLeftSideBarMenu = ({isLeftSidebarOpen, setIsLeftSidebarOpen}:IProps) => {

// className={style.sidebarMenu }
  if (!isLeftSidebarOpen) return null  
  return (
    // <div className='lg:hidden w-[80vw] h-[100vh] bg-brandColor fixed left-0 top-[7vh] bottom-0 z-50  '>
    <div className={style.sidebarMenu}>
        
    </div>
  )
}

export default MobileLeftSideBarMenu