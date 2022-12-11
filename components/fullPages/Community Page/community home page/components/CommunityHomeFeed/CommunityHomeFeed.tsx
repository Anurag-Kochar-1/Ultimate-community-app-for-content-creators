import React from 'react'
import Tabs from '../../../components/Tabs/Tabs'
import TopSection from '../../../components/TopSection/TopSection'

const CommunityHomePage = () => {
  return (
    <main
        className='w-[100%] xl:w-[70%] h-[90vh] px-5 bg-red-300 flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll '
    >
      <TopSection /> 
      <Tabs />

    </main>
  )
}

export default CommunityHomePage