import React, {useState, useRef, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, storage } from '../../../../firebaseConfig'
import { useSelector } from 'react-redux'

import {BsTextCenter , BsImage, BsCameraVideo} from 'react-icons/bs'
import {GrAdd} from "react-icons/gr"
import { IAllSlicesState } from '../../../../customTypesAndInterfaces/allSlicesState'
import { ICommunityData } from '../../../../customTypesAndInterfaces/communityInterfaces'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from "uuid"


interface IProps {
  selectedCommunity: ICommunityData | null
  setSelectedCommunity: any
  userJoinedCommunitiesState: ICommunityData[]

}

const SmallScreenCreatePostContainer = ( {selectedCommunity, setSelectedCommunity, userJoinedCommunitiesState}: IProps ) => {
  const [ user ] = useAuthState(auth)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const [postType, setPostType] = useState<string>("caption")
  const [postTitleInputValue, setPostTitleInputValue ] = useState<string>("")
  const [postCaptionInputValue, setPostCaptionInputValue ] = useState<string>("")
  const [selectedCommunityID, setSelectedCommunityID] = useState<string>("")
  const [image, setImage] = useState<any[]>([])
  const [video, setVideo] = useState<any[]>([])


  const uploadImage = async () => {
    if(image[0][0]) {
      console.log(`---- Image found ----`)
      const imageRef = ref(storage, "postImages/" + uuidv4() + "--" + image[0][0]?.name)
      const uploadImageMedia = uploadBytesResumable(imageRef, image[0][0])

      uploadImageMedia.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`upload is ${progress}% done`);
      }, (error) => {
        alert(error)
      }, () => {
        getDownloadURL(uploadImageMedia.snapshot.ref).then((downloadURL) => {

          console.log(`URL IS ${downloadURL}`);
          
        })
      })
    }
  }

  const uploadVideo = async () => {
    if(video[0][0]) {
      console.log("---- Video found ----")
      const videoRef = ref(storage, "postVideos/" + uuidv4() + "---" + video[0][0].name )
      const uploadVideoMedia = uploadBytesResumable(videoRef, video[0][0])

      uploadVideoMedia.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`upload is ${progress}% done`);
      }, (error) => {
        alert(error)
      }, () => {
        getDownloadURL(uploadVideoMedia.snapshot.ref).then((downloadURL) => {

          console.log(`URL IS ${downloadURL}`);
          
        })
      })
    }
  }




  useEffect(() => {
    titleInputRef?.current?.focus
  },[])

  return (
    <div className='md:hidden w-full h-full mb-[9vh] lg:mb-0 flex flex-col justify-between items-center pt-5'>
   

    <div className='w-full flex space-x-2 justify-start items-center mb-4 bg-lightColor px-3'>
      <p className='text-sm font-poppins font-normal' onClick={() => console.log(video[0][0]?.name)}>Posting to VIDEO :</p>

      <select 
      title='select a community' 
      className="border font-medium border-brandColor outline-none bg-lightColor rounded-full text-sm focus:ring-0 focus:border-brandColor" 
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
              <input type="file" placeholder='image' accept="image/*" hidden
              onChange={(e) => {
                const imageFile = e.target.files
                setImage([imageFile])
                // setImage( URL.createObjectURL(imageFile[0]) )

              }}
              />
              <GrAdd className='text-xl' />


            </label>
          </div>
        </div>
      )}

      {postType === "video" && (
        <div className='w-full flex justify-start items-center'>
          <div className='w-32 h-32 rounded-sm border border-dashed bg-lightColor border-blue-300 flex justify-center items-center '>
              <label className='w-full h-full flex justify-center items-center hover:cursor-pointer'>
                <input type="file" placeholder='image' accept="video/*" hidden
                onChange={(e) => {
                  const videoFile = e.target.files
                  setVideo([videoFile])
                }}
                />
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
      <div className='md:hidden fixed bottom-0 z-30 px-5 w-full h-[15vh] border-t border-t-midColor bg-lightColor flex justify-between items-center'>
        <div className='w-full flex justify-start items-center space-x-2'>
          <button 
          type='button'
          onClick={() => setPostType("caption")}
          className={postType === "caption" ? "px-3 py-3 rounded-md bg-brandColor flex justify-center items-center active:bg-midColor space-x-2" : "px-3 py-3 rounded-md bg-gray-200 flex justify-center items-center active:bg-midColor space-x-2"}
          > 
            <BsTextCenter className={postType === "caption" ? 'text-lightColor opacity-70' : 'text-darkColor opacity-70' } />
            <span className={ postType === "caption" ? 'hidden sm:inline-block text-lightColor  text-sm font-normal font-poppins' : 'hidden text-darkColor sm:inline-block text-sm font-normal font-poppins'}> Caption </span>
          </button>

          <button 
          type='button'
          onClick={() => setPostType("image")}
          className={postType === "image" ? "px-3 py-3 rounded-md bg-brandColor flex justify-center items-center active:bg-midColor space-x-2" : "px-3 py-3 rounded-md bg-gray-200 flex justify-center items-center active:bg-midColor space-x-2"}
          > 
            <BsImage className={postType === "image" ? 'text-lightColor opacity-70' : 'text-darkColor opacity-70' } />
            <span className={ postType === "image" ? 'hidden sm:inline-block text-lightColor  text-sm font-normal font-poppins' : 'hidden text-darkColor sm:inline-block text-sm font-normal font-poppins'}> Image </span>
          </button>

          <button 
          type='button'
          onClick={() => setPostType("video")}
          className={postType === "video" ? "px-3 py-3 rounded-md bg-brandColor flex justify-center items-center active:bg-midColor space-x-2" : "px-3 py-3 rounded-md bg-gray-200 flex justify-center items-center active:bg-midColor space-x-2"}
          > 
            <BsCameraVideo className={postType === "video" ? 'text-lightColor opacity-70' : 'text-darkColor opacity-70' } />
            <span className={ postType === "video" ? 'hidden sm:inline-block text-lightColor  text-sm font-normal font-poppins' : 'hidden text-darkColor sm:inline-block text-sm font-normal font-poppins'}> Video </span>
          </button>
        </div>

        <button

        type='button'
        className='px-5 py-1 bg-brandColor text-lightColor font-poppins text-sm rounded-sm'
        onClick={() => {
          // if(image[0][0]) {
          //   uploadImage()
          // }

          // if(video[0][0]) {
          //   uploadVideo()
          // }
        }}
        > Post  </button>
      </div>
    )}
    
    </div>
  )
}

export default SmallScreenCreatePostContainer