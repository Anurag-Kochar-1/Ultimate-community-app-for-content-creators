import React from 'react'
import {AiFillHome , AiOutlineCompass} from "react-icons/ai"
import {MdOutlineTrendingUp} from "react-icons/md"
import { useRouter } from 'next/router'
import CreateOptionsDropdown from "../../Header/components/CreateOptionsDropdown/CreateOptionsDropdown"
import Link from 'next/link'

const BottomBar = () => {
    const router = useRouter()
  return (
    <div className='lg:hidden w-full h-[9vh] bg-lightColor border-t-2 border-t-midColor fixed bottom-0 flex justify-center items-center'>
        <Link href={'/'} className="flex-1 flex flex-col justify-between items-center space-y-">
            <AiFillHome className={router.pathname === "/" ? "w-7 h-7 text-brandColor " : "w-7 h-7 " } /> 
        </Link>

        <Link href={'/explore'} className=" flex-1 flex flex-col justify-start items-center space-y-2">
            <AiOutlineCompass className={router.pathname === "/explore" ? 'w-7 h-7  text-brandColor ' : "w-7 h-7"} /> 
        </Link>

       <CreateOptionsDropdown />


        <Link href={'/trending'} className=" flex-1 flex flex-col justify-start items-center space-y-2">
            <MdOutlineTrendingUp className={router.pathname === "/trending" ? 'w-7 h-7  text-brandColor ' : "w-7 h-7 "} /> 
        </Link>

    </div>
  )
}

export default BottomBar