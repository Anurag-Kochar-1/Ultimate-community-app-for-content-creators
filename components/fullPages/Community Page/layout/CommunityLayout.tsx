import React from 'react'
import CommunityTabs from '../components/CommunityTabs/CommunityTabs'
import TopSection from "../components/TopSection/TopSection"


interface IProps {
  children: React.ReactNode
}

const CommunityLayout = ({children}:IProps) => {
  return (
    <div className='w-full lg:w-[60%] h-[93vh] mt-[7vh] mb-[10vh] lg:mb-[0vh] flex flex-col justify-start items-center overflow-x-hidden overflow-y-visible bg-green-900 '>
      <TopSection />
      <CommunityTabs />
      {children}
    </div>
  )
}

export default CommunityLayout