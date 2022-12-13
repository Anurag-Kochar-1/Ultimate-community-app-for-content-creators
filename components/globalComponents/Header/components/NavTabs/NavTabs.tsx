import React from 'react'
import {AiFillHome , AiOutlineCompass} from "react-icons/ai"
import {MdOutlineTrendingUp} from "react-icons/md"
import { useRouter } from 'next/router'
import Link from 'next/link'


const NavTabs = () => {
    const router = useRouter()
    // const { asPath } = useRouter()

  return (
    <div className='hidden lg:inline-flex w-[40%] h-[7vh] justify-around items-end space-x-2'>
        {/* <h1 onClick={() => console.log(asPath)}> LOG PATH </h1> */}

        <Link href={'/'} className="h-full flex-1 flex flex-col justify-between items-center">
            <div className={router.pathname === "/" ? 'w-full h-full flex justify-center items-center rounded-md' : "w-full h-full flex justify-center items-center rounded-md hover:bg-midColor my-1" }>
                <AiFillHome className={router.pathname === "/" ? "w-7 h-7 mt-5 text-brandColor " : "w-7 h-7 mt-5 " } /> 
            </div>
            {router.pathname === "/" && <div className='bg-brandColor w-full h-1 rounded-full' />}
        </Link>

        <Link href={'/explore'} className="h-full flex-1 flex flex-col justify-start items-center space-y-2">
            <div className={router.pathname === "/explore" ? 'w-full h-full flex justify-center items-center rounded-md' : "w-full h-full flex justify-center items-center rounded-md hover:bg-midColor my-1" }>
                <AiOutlineCompass className={router.pathname === "/explore" ? 'w-7 h-7 mt-7 text-brandColor ' : "w-7 h-7 mt-5"} /> 
            </div>
            {router.pathname === "/explore" && <div className='bg-brandColor w-full h-1 rounded-full' />}
        </Link>

        <Link href={'/trending'} className="h-full flex-1 flex flex-col justify-start items-center space-y-2">
            <div className={router.pathname === "/trending" ? 'w-full h-full flex justify-center items-center rounded-md' : "w-full h-full flex justify-center items-center rounded-md hover:bg-midColor my-1" }>
                <MdOutlineTrendingUp className={router.pathname === "/trending" ? 'w-7 h-7 mt-7 text-brandColor ' : "w-7 h-7 mt-5"} /> 
            </div>
            {router.pathname === "/trending" && <div className='bg-brandColor w-full h-1 rounded-full' />}
        </Link>

    </div>
  )
}

export default NavTabs