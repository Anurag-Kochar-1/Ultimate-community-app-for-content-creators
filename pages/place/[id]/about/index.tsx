import React from 'react'
import { useSelector } from 'react-redux'
import CommunityLayout from '../../../../components/fullPages/Community Page/layout/CommunityLayout'
import { IAllSlicesState } from '../../../../customTypesAndInterfaces/allSlicesState'
import { ICommunityData } from '../../../../customTypesAndInterfaces/communityInterfaces'

const about = () => {
  const communityData:ICommunityData = useSelector((state:IAllSlicesState) => state.community.communityData)
  return (
    <CommunityLayout>
      <main className='w-[100%] bg-lightColor flex flex-col justify-start items-center '>
        <h1 className='text-3xl font-medium px-40'> {communityData?.communityDescription} </h1>
      </main> 
    </CommunityLayout>
  )
}

export default about