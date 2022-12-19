import React, {useState, useRef, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebaseConfig'
import { useSelector } from 'react-redux'

import {BsTextCenter , BsImage, BsCameraVideo} from 'react-icons/bs'
import {GrAdd} from "react-icons/gr"
import { IAllSlicesState } from '../../../../customTypesAndInterfaces/allSlicesState'
import { ICommunityData } from '../../../../customTypesAndInterfaces/communityInterfaces'


interface IProps {
  selectedCommunity: ICommunityData | undefined
  setSelectedCommunity: any
  userJoinedCommunitiesState: ICommunityData[]

}

const SmallScreenCreatePostContainer = ( {selectedCommunity, setSelectedCommunity, userJoinedCommunitiesState}: IProps ) => {
  const [postType, setPostType] = useState<string>("")
  const [ user ] = useAuthState(auth)
  const titleInputRef = useRef<HTMLInputElement>(null)



  useEffect(() => {
    titleInputRef?.current?.focus
  },[])

  return (
    <div className='lg:hidden  w-full h-full mb-[9vh] lg:mb-0 flex flex-col justify-between items-center pt-5'>
   

    <div className='w-full flex space-x-2 justify-start items-center mb-4 bg-lightColor'>
      <p className='text-sm font-poppins font-normal' onClick={() => console.log(selectedCommunity)}>Posting to:</p>

      <select 
      title='select a community' 
      className="border border-brandColor outline-none bg-lightColor rounded-full text-sm" 
      value={selectedCommunity?.communityName} 
      onChange={(e) => setSelectedCommunity(e.target.value)}>

        {userJoinedCommunitiesState && (
          userJoinedCommunitiesState.map((community) => {
            return(
              <option
              key={community.communityID} 
              className='text-sm bg-lightColor text-darkColor'
              value={community.communityName}
              > 
                {community.communityName} 
              </option>
            )
          })
        )}
      </select>

    </div>
    
    <form className='w-full h-full space-y-3'>
      <input 
        type="text"
        placeholder="An interesting title"
        className='w-full border-none outline-none text-lg font-poppins font-medium bg-lightColor focus:ring-0'
        ref={titleInputRef}
        autoFocus
      />

      {postType === "caption" && (
        <textarea 
        typeof='text'
        placeholder='Add caption'
        className='w-full min-h-[75%] border-none outline-none font-poppins font-medium bg-lightColor focus:ring-0'
        />
      )}

      {postType === "image" && (
        <div className='w-full flex justify-start items-center'>
          <div className='w-32 h-32 rounded-sm border border-dashed bg-lightColor border-brandColor flex justify-center items-center '>
            <label className='w-full h-full flex justify-center items-center hover:cursor-pointer'>
              <input type="file" placeholder='image' accept="image/*" hidden />
              <GrAdd className='text-xl' />
            </label>
          </div>
        </div>
      )}

      {postType === "video" && (
        <div className='w-full flex justify-start items-center'>
          <div className='w-32 h-32 rounded-sm border border-dashed bg-lightColor border-blue-300 flex justify-center items-center '>
              <label className='w-full h-full flex justify-center items-center hover:cursor-pointer'>
                <input type="file" placeholder='image' accept="video/*" hidden />
              <GrAdd className='text-xl' />
            </label>
          </div>
        </div>
      )}

    </form>


    {false && <div className='w-full fixed bottom-0 z-30 space-y-2 px-3 py-5 flex flex-col justify-start items-start bg-lightColor border-t border-t-midColor'>
      <button 
        className='w-full py-2 px-2 flex items-center justify-start space-x-3 hover:cursor-pointer active:bg-midColor rounded-md' 
        type='button'
        onClick={() => setPostType("caption")}
        > 
        <BsTextCenter className='text-darkColor opacity-70' />
        <p className='text-sm text-darkColor font-poppins font-normal'> Text </p> 
      </button>

      <button 
        className='w-full py-2 px-2 flex items-center justify-start space-x-3 hover:cursor-pointer active:bg-midColor rounded-md' 
        type='button'
        onClick={() => setPostType("image")}
        > 
        <BsImage className='text-darkColor opacity-70' />
        <p className='text-sm text-darkColor font-poppins font-normal'> Image </p> 
      </button>
      
      <button 
        className='w-full py-2 px-2 flex items-center justify-start space-x-3 hover:cursor-pointer active:bg-midColor rounded-md ' 
        type='button'
        onClick={() => setPostType("video")}
        > 
        <BsCameraVideo className='text-darkColor opacity-70' />
        <p className='text-sm text-darkColor font-poppins font-normal'> Video </p> 
      </button>
    </div>}

    {true && (
      <div className='fixed bottom-0 z-30 px-5 w-full h-[15vh] border-t border-t-midColor bg-lightColor flex justify-between items-center'>
        <div className='w-full flex justify-start items-center space-x-2'>
          <button 
          type='button'
          onClick={() => setPostType("caption")}
          className="px-3 py-3 rounded-md bg-lightColor flex justify-center items-center"
          > 
            <BsTextCenter className='text-darkColor opacity-70' />
          </button>

          <button 
          type='button'
          onClick={() => setPostType("image")}
          className="px-3 py-3 rounded-md bg-lightColorflex justify-center items-center"
          > 
            <BsImage className='text-darkColor opacity-70' />
          </button>

          <button 
          type='button'
          onClick={() => setPostType("video")}
          className="px-3 py-3 rounded-md bg-lightColor flex justify-center items-center"
          > 
            <BsCameraVideo className='text-darkColor opacity-70' /> 
          </button>
        </div>

        <button
        type='button'
        className='px-5 py-1 bg-brandColor text-lightColor font-poppins text-sm rounded-sm'
        > Post  </button>
      </div>
    )}
    
    </div>
  )
}

export default SmallScreenCreatePostContainer