import React, { useState } from 'react'
import ChooseCommunityDropdown from './ChooseCommunityDropdown'
import CreatePostBox from './CreatePostBox'


const CreatePostContainer = () => {
  const [selectedCommunity , setSelectedCommunity] = useState<any[]>([])
  const [selectedCommunity2 , setSelectedCommunity2] = useState<any[]>([])

  return (
    <div className='w-[50%] h-[50vh] rounded-xl flex flex-col justify-start items-start space-y-5 mt-20'>
        <div>
            <p className='text-lg font-medium text-gray-800'>Create a post : {selectedCommunity}</p>
            <hr/>
        </div>

        <div className='w-full'>
            <ChooseCommunityDropdown 
              selectedCommunity={selectedCommunity} 
              setSelectedCommunity={setSelectedCommunity}  

              selectedCommunity2={selectedCommunity2} 
              setSelectedCommunity2={setSelectedCommunity2}  
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