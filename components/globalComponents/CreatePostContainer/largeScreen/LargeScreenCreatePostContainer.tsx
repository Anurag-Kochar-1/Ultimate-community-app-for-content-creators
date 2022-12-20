import React, { useState, useEffect } from 'react'
import { ICommunityData } from '../../../../customTypesAndInterfaces/communityInterfaces'
import ChooseCommunityDropdown from '../../../fullPages/Submit Page/components/chooseCommunityDropdown/ChooseCommunityDropdown'
import CreatePostBox from './components/box/CreatePostBox'

interface IProps {
  selectedCommunity: ICommunityData | null
  setSelectedCommunity: any
  userJoinedCommunitiesState: ICommunityData[]

}

const LargeScreenCreatePostContainer = ( {selectedCommunity, setSelectedCommunity, userJoinedCommunitiesState}: IProps ) => {

  


  useEffect(() => {
    setSelectedCommunity(userJoinedCommunitiesState[0]?.communityID)
  },[userJoinedCommunitiesState])

  return (
    <div className='hidden md:w-[80%] lg:w-[90%] xl:w-[70%] bg-lightColor md:flex flex-col justify-start items-start mt-20 space-y-4'>
      <div className='w-full py-2 space-y-2'>
            <p className='text-lg font-medium text-gray-800'>Create a post {selectedCommunity?.communityName}</p>
            <hr/>
      </div>

      <div className='w-full flex py-2 px-2 justify-start items-center space-x-3'>
        <p className='text-base font-poppins font-medium' onClick={() => console.log(1)}> Posting to : </p>

        <select 
        title='select a community' 
        className="border border-brandColor outline-none bg-lightColor rounded-full font-medium text-base focus:ring-0 focus:border-brandColor" 
        value={userJoinedCommunitiesState[0]?.communityID} 
        onChange={(e) => setSelectedCommunity(e.target.value)}>

          {userJoinedCommunitiesState && (
            userJoinedCommunitiesState.map((community) => {
              return(
                <option
                key={community.communityID} 
                className='text-base bg-lightColor text-darkColor'
                value={community?.communityID}
                > 
                  {community.communityName} 
                </option>
              )
            })
          )}
        </select>
      </div>

      <CreatePostBox 
        selectedCommunity={selectedCommunity} 
        setSelectedCommunity={setSelectedCommunity}  
      />

    </div>
  )
}

export default LargeScreenCreatePostContainer