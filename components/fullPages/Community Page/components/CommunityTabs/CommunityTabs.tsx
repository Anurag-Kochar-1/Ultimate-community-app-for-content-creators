import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CommunityTabs = () => {
  const router = useRouter()

  return (
    <div
        className='w-full bg-lightColor flex flex-row items-center justify-start space-x-5 px-4'
       
    >
        <p className={ router.pathname === `/place/[id]` ? 'h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2 border-b-[#0079D3]' : 'h-full py-2 text-center font-semibold text-sm hover:cursor-pointer' }  onClick={() => console.log(router)}> Posts </p>
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2'> Chat </p>
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2 '> Events </p>
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2'> About </p>
    </div>
  )
}

export default CommunityTabs