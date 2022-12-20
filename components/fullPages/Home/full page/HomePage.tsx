import React from 'react'
import HomeFeed from '../components/HomeFeed/HomeFeed'
import LeftSidebar from '../components/Sidebars/Left-Sidebar/LeftSidebar'
import RightBar from '../components/Sidebars/Right-Sidebar/RightSideBar'

const HomePage = () => {
  return (
    <main
        className='w-full lg:w-[70%] h-[93vh] mt-[7vh] mb-[10vh] lg:mb-0 bg-green-300 flex flex-col justify-start items-center'
    >
        <HomeFeed />
    </main>
  )
}

export default HomePage