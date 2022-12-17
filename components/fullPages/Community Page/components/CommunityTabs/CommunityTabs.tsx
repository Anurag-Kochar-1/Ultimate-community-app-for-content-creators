import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CommunityTabs = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className='w-full bg-midColor flex flex-row items-end justify-center space-x-2 px-4 sticky top-0' onClick={() => console.log(router )}>
        
    
        <Link href={`/place/${id}/`} className='w-14 h-full flex flex-col justify-end items-center'>
          <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer' > Posts  </p>
          { router.asPath === `/place/${id}` && <div className='bg-brandColor h-1 w-full rounded-md' />}
        </Link>


        <Link href={`/place/${id}/textChannels/first`} className='w-14 h-full flex flex-col justify-end items-center'>
          <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer' > Chat </p>
          { router.asPath === `/place/${id}/textChannels/first` && <div className='bg-brandColor h-1 w-full rounded-md' />}
        </Link>
        
        <Link href={`/place/${id}/about`} className='w-14 h-full flex flex-col justify-end items-center'>
          <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer'> About </p>
          { router.asPath === `/place/${id}/about` && <div className='bg-brandColor h-1 w-full rounded-md' />}
        </Link>

    </div>
  )
}

export default CommunityTabs