import React, { useState } from 'react'
import { ICommunityData } from '../../../../../customTypesAndInterfaces/communityInterfaces'
import ChooseCommunityDropdown from '../chooseCommunityDropdown/ChooseCommunityDropdown'
import CreatePostBox from '../createPostBox/CreatePostBox'



const CreatePostContainer = ( {userJoinedCommunitiesState}: {userJoinedCommunitiesState: ICommunityData[]} ) => {
  const [selectedCommunity , setSelectedCommunity] = useState<any[]>([])
  const [selectedCommunity2 , setSelectedCommunity2] = useState<any[]>([])

  return (
    <div className='hidden lg:w-[70%] xl:w-[60%] h-[50vh] rounded-xl lg:flex flex-col justify-start items-start space-y-5 mt-20 py-'>
        <div>
            <p className='text-lg font-medium text-gray-800'>Create a post {selectedCommunity}</p>
            <hr/>
        </div>

        <div className='w-full'>
            <ChooseCommunityDropdown 
              selectedCommunity={selectedCommunity} 
              setSelectedCommunity={setSelectedCommunity}  

              selectedCommunity2={selectedCommunity2} 
              setSelectedCommunity2={setSelectedCommunity2}  

              userJoinedCommunitiesState={userJoinedCommunitiesState}
              />
            <h1 onClick={() => console.log(1)}>  { selectedCommunity2[0] && selectedCommunity2[0]?.subredditName} </h1>
        </div>

        <CreatePostBox 
          selectedCommunity={selectedCommunity} 
          setSelectedCommunity={setSelectedCommunity} 

          selectedCommunity2={selectedCommunity2} 
          setSelectedCommunity2={setSelectedCommunity2}  
          />

    </div>
  )
}

export default CreatePostContainer