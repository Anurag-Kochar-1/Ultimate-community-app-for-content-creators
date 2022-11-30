import React from 'react'
import CreatePostContainer from '../../components/CreatePost/CreatePostContainer'
import Header from '../../components/Header/Header'
import HomePageLayout from '../../components/Layouts/HomePageLayout'

const index = () => {
  return (
    <HomePageLayout>
        <main
        className='w-full h-[93vh] mt-[7vh] bg-[#DAE0E6] flex justify-center items-start  px-3 space-x-3'
        >
            <CreatePostContainer />
        
        </main>       
    </HomePageLayout>
  )
}

export default index