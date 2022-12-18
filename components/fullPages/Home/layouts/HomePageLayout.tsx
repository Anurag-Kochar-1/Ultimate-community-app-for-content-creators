import {useState} from 'react'
import Head from 'next/head'
import Header from '../../../globalComponents/Header/Header'
import BottomBar from '../../../globalComponents/Mobile/BottomBar/BottomBar'
import MobileLeftSideBarMenu from '../../../globalComponents/Mobile/Sidebars/MobileLeftSideBar/MobileLeftSideBar'
import MobileRightSideBar from '../../../globalComponents/Mobile/Sidebars/MobileRightSideBar/MobileRightSideBar'
import LeftSidebar from '../components/Sidebars/Left-Sidebar/LeftSidebar'
import RightSideBar from '../components/Sidebars/Right-Sidebar/RightSideBar'

interface Props {
    children: React.ReactNode
}

const HomePageLayout = ({children}:Props) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false)
  return (
    <div className='w-full flex justify-between items-start max-h-screen overflow-hidden'>
        <Head>
            <title>Offsta</title>
            <meta name="description" content="the ultimate community app for content creators" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header 
          isLeftSidebarOpen={isLeftSidebarOpen} 
          setIsLeftSidebarOpen={setIsLeftSidebarOpen}
          isRightSidebarOpen={isRightSidebarOpen}
          setIsRightSidebarOpen={setIsRightSidebarOpen}
        />

        {isLeftSidebarOpen &&  <MobileLeftSideBarMenu isLeftSidebarOpen={isLeftSidebarOpen} setIsLeftSidebarOpen={setIsLeftSidebarOpen} />}
        {isRightSidebarOpen &&  <MobileRightSideBar isRightSidebarOpen={isRightSidebarOpen} setIsRightSidebarOpen={setIsRightSidebarOpen} />}

        <LeftSidebar />
        {children}
        <RightSideBar />
        <BottomBar />
    </div>
  )
}

export default HomePageLayout