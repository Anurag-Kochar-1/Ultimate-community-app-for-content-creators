import React from 'react'
import HomeFeed from '../components/HomeFeed/HomeFeed'
import LeftSidebar from '../components/Sidebars/Left-Sidebar/LeftSidebar'
import RightBar from '../components/Sidebars/Right-Sidebar/RightSideBar'

const HomePage = () => {
  return (
    <main
        className='w-full h-[42vh] mt-[7vh] bg-lightColor flex justify-between items-center space-x-2'
    >
        <LeftSidebar/>
        <HomeFeed />
        <RightBar />
    </main>
  )
}

export default HomePage