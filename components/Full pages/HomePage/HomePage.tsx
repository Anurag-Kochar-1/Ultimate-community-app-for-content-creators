import React from 'react'
import HomeFeed from '../../HomeFeed/HomeFeed'
import LeftSidebar from '../../Sidebars/LeftSidebar/LeftSidebar'
import RightBar from '../../Sidebars/RightBar/RightBar'

const HomePage = () => {
  return (
    <main
        className='w-full h-[92vh] mt-[7vh] bg-white flex justify-between items-center px-3 space-x-3'
    >
        <LeftSidebar/>
        <HomeFeed />
        <RightBar />
    </main>
  )
}

export default HomePage