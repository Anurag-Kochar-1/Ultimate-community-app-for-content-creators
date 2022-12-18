import Link from 'next/link'
import React from 'react'

interface Props {
    isCreateOptionsDrawerOpen: boolean
    setIsCreateOptionsDrawerOpen : React.Dispatch<React.SetStateAction<boolean>>
    isCreateCommunityDrawerOpen: boolean
    setIsCreateCommunityDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateOptionsBottomDrawer = ({isCreateOptionsDrawerOpen ,setIsCreateOptionsDrawerOpen , isCreateCommunityDrawerOpen , setIsCreateCommunityDrawerOpen}:Props) => {
  return (
    <div className='w-full h-[40vh] fixed bottom-0 left-0 right-0 bg-midColor flex flex-col justify-between items-center rounded-t-2xl py-5'>

              <div className='w-full flex flex-col justify-start items-center rounded-t-2xl mt-5'>
            
                <div className='w-[80%] sm:w-[60%] md:w-[40%] flex justify-center items-center  px-3 py-3 text-center font-medium font-poppins bg-lightColor my-2 rounded-lg hover:cursor-pointer border-b-4 border-r-4 border-b-brandColor border-r-brandColor active:border-none hover:border-none '>
                  {/* <Image src={building} alt="community" className='w-14 h-14' /> */}
                  <Link href={'/CreateCommunity'} onClick={() => setIsCreateOptionsDrawerOpen(false)}>
                    <button type='button'> Create Community </button>
                  </Link>
                </div>

                <div className='w-[80%] sm:w-[60%] md:w-[40%] flex justify-center items-center  px-3 py-3 text-center font-medium font-poppins bg-lightColor my-2 rounded-lg hover:cursor-pointer border-b-4 border-r-4 border-b-brandColor border-r-brandColor active:border-none hover:border-none'>
                  {/* <Image src={upload} alt="community" className='w-14 h-14' /> */}
                  <button type='button'> Upload Post </button>
                </div>
              </div>

              <button 
                onClick={() => setIsCreateOptionsDrawerOpen(!isCreateOptionsDrawerOpen)} type="button"
                className='w-[60%] sm:w-[40%] md:w-[30%] px-4 py-2 rounded-lg bg-brandColor text-darkColor text-sm text-normal font-poppins border-b-4 border-r-4 border-b-darkColor border-r-darkColor active:border-none'
                >  
                Close 
              </button>
    </div>
  )
}

export default CreateOptionsBottomDrawer