import React from 'react'
import Tabs from '../../../components/Tabs/Tabs'
import TopSection from '../../../components/TopSection/TopSection'
import { ICommunity } from '../../../../../../customTypesAndInterfaces/communityInterfaces'

interface IProps {
  communityData: ICommunity
}

const CommunityHomePage = ({communityData}:IProps) => {
  return (
    <main
        className='w-[100%] xl:w-[70%] h-[90vh] px-5 bg-red-300 flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll '
    >
      <TopSection /> 
      <Tabs />

      <h1> {communityData.communityName} </h1>

    </main>
  )
}

export default CommunityHomePage