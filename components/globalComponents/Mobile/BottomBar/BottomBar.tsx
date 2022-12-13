import React, {useState} from 'react'
import {AiFillHome , AiOutlineCompass, AiOutlineMessage} from "react-icons/ai"
import {MdOutlineTrendingUp} from "react-icons/md"
import { useRouter } from 'next/router'

import Link from 'next/link'
import CreateOptionsDropdownMobile from './components/CreateOptionsDropdownMobile.tsx/CreateOptionsDropdownMobile'
import { RiAddFill } from 'react-icons/ri'

const BottomBar = () => {
    const router = useRouter()
    const [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState<boolean>(false)
  
    function closeModal() {
      setIsCreateCommunityModalOpen(false)
    }
  
    function openModal() {
      setIsCreateCommunityModalOpen(true)
    }
  return (
    <div className='lg:hidden w-full h-[9vh] bg-lightColor border-t-2 border-t-midColor fixed bottom-0 flex justify-center items-center'>
        <Link href={'/'} className="flex-1 flex flex-col justify-between items-center space-y-">
            <AiFillHome className={router.pathname === "/" ? "w-6 h-6 text-brandColor " : "w-6 h-6 text-darkColor " } /> 
        </Link>

        <Link href={'/explore'} className=" flex-1 flex flex-col justify-start items-center space-y-2">
            <AiOutlineCompass className={router.pathname === "/explore" ? 'w-6 h-6  text-brandColor ' : "w-6 h-6 text-darkColor"} /> 
        </Link>

        <RiAddFill 
            className='w-6 h-6 text-darkColor'
            onClick={() => setIsCreateCommunityModalOpen(!isCreateCommunityModalOpen)} />
        <CreateOptionsDropdownMobile 
            isCreateCommunityModalOpen={isCreateCommunityModalOpen} 
            openModal={openModal} 
            closeModal={closeModal} 
        />

        <Link href={'/trending'} className=" flex-1 flex flex-col justify-start items-center space-y-2">
            <MdOutlineTrendingUp className={router.pathname === "/trending" ? 'w-6 h-6  text-brandColor ' : "w-6 h-6 text-darkColor "} /> 
        </Link>

        <Link href={'/trending'} className=" flex-1 flex flex-col justify-start items-center space-y-2">
            <AiOutlineMessage className={router.pathname === "/messages" ? 'w-6 h-6  text-brandColor ' : "w-6 h-6 text-darkColor "}/>
        </Link>

    
`
    </div>
  )
}

export default BottomBar