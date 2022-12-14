import React, {useState} from 'react'
import {AiFillHome , AiOutlineCompass, AiOutlineMessage} from "react-icons/ai"
import {MdOutlineTrendingUp} from "react-icons/md"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { RiAddFill } from 'react-icons/ri'
import Image from 'next/image'

import upload from "../../../../public/images/createDrawer/upload.png"
import building from "../../../../public/images/createDrawer/building.png"
import CreateOptionsBottomDrawer from './components/CreateOptionsBottomDrawer/CreateOptionsBottomDrawer'

const BottomBar = () => {
    const router = useRouter()
    const [isCreateOptionsDrawerOpen, setIsCreateOptionsDrawerOpen] = useState<boolean>(false)
    const [isCreateCommunityDrawerOpen, setIsCreateCommunityDrawerOpen] = useState<boolean>(false)
    // const [isUploadPostDrawerOpten]
  return (
    <div className='lg:hidden w-full h-[9vh] bg-lightColor border-t-2 border-t-midColor fixed bottom-0 flex justify-between items-center px-5'>
        <Link href={'/'} className="flex flex-col justify-between items-center space-y-2">
            <AiFillHome className={router.pathname === "/" ? "w-6 h-6 text-brandColor " : "w-6 h-6 text-darkColor " } /> 
        </Link>

        <Link href={'/explore'} className="flex flex-col justify-start items-center space-y-2">
            <AiOutlineCompass className={router.pathname === "/explore" ? 'w-6 h-6  text-brandColor ' : "w-6 h-6 text-darkColor"} /> 
        </Link>

        <RiAddFill 
            className={router.pathname === "/CreateCommunity"  ?  'w-6 h-6 text-brandColor' : "w-6 h-6 text-darkColor"}
            onClick={() => setIsCreateOptionsDrawerOpen(!isCreateOptionsDrawerOpen)} />


           {isCreateOptionsDrawerOpen &&  (
            <CreateOptionsBottomDrawer 
              isCreateOptionsDrawerOpen={isCreateOptionsDrawerOpen} 
              setIsCreateOptionsDrawerOpen={setIsCreateOptionsDrawerOpen}

              isCreateCommunityDrawerOpen={isCreateCommunityDrawerOpen}
              setIsCreateCommunityDrawerOpen={setIsCreateCommunityDrawerOpen}
            />
           )}




        <Link href={'/trending'} className="flex flex-col justify-start items-center space-y-2">
            <MdOutlineTrendingUp className={router.pathname === "/trending" ? 'w-6 h-6  text-brandColor ' : "w-6 h-6 text-darkColor "} /> 
        </Link>

        <Link href={'/trending'} className="flex flex-col justify-start items-center space-y-2">
            <AiOutlineMessage className={router.pathname === "/messages" ? 'w-6 h-6  text-brandColor ' : "w-6 h-6 text-darkColor "}/>
        </Link>

    </div>
  )
}

export default BottomBar