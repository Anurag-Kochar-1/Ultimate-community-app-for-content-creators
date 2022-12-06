import React, { useState } from 'react'
import ChooseCommunityDropdown from './ChooseCommunityDropdown'
import CreatePostBox from './CreatePostBox'


const CreatePostContainer = () => {
  const [selectedCommunityID , setSelectedCommunityID] = useState<string>("")

  return (
    <div className='w-[50%] h-[50vh] rounded-xl flex flex-col justify-start items-start space-y-5 mt-20'>
        <div>
            <p className='text-lg font-medium text-gray-800'>Create a post : {selectedCommunityID}</p>
            <hr/>
        </div>

        <div className='w-full'>
            <ChooseCommunityDropdown selectedCommunityID={selectedCommunityID} setSelectedCommunityID={setSelectedCommunityID}  />
        </div>

        <CreatePostBox selectedCommunityID={selectedCommunityID} setSelectedCommunityID={setSelectedCommunityID} />

    </div>
  )
}

export default CreatePostContainer