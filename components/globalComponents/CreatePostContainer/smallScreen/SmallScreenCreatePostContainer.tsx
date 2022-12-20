import React, {useState, useRef, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../../../../firebaseConfig'
import { useSelector } from 'react-redux'

import {BsTextCenter , BsImage, BsCameraVideo} from 'react-icons/bs'
import {GrAdd} from "react-icons/gr"
import { IAllSlicesState } from '../../../../customTypesAndInterfaces/allSlicesState'
import { ICommunityData } from '../../../../customTypesAndInterfaces/communityInterfaces'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from "uuid"
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/router'


interface IProps {
  selectedCommunity: ICommunityData | null
  setSelectedCommunity: any
  userJoinedCommunitiesState: ICommunityData[]
}



const SmallScreenCreatePostContainer = ( {selectedCommunity, setSelectedCommunity, userJoinedCommunitiesState}: IProps ) => {
  const [ user ] = useAuthState(auth)
  const router = useRouter()
  const titleInputRef = useRef<HTMLInputElement>(null)
  const postsCollectionRef = collection(db, "posts")

  const [isPostPosting, setIsPostPosting] = useState<boolean>(false)
  const [postType, setPostType] = useState<string>("caption")
  const [postTitleInputValue, setPostTitleInputValue ] = useState<string>("")
  const [postCaptionInputValue, setPostCaptionInputValue ] = useState<string>("")
  const [image, setImage] = useState<any[]>([])
  const [video, setVideo] = useState<any[]>([])


  const uploadImage = async () => {
    if(image[0][0]) {
      setIsPostPosting(true)
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
          addPost(downloadURL, null)
          console.log(`URL IS ${downloadURL}`);
        })
      })
    }
  }

  const uploadVideo = async () => {
    if(video[0][0]) {
      setIsPostPosting(true)
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
          addPost(null, downloadURL)
          console.log(`URL IS ${downloadURL}`);
          
        })
      })
    }
  }


  const addPost = async ( imageURL:string|null, videoURL:string|null  ) => {
        try {
          setIsPostPosting(true)
          // --- Adding post to Posts's Collection
          const postDoc = await addDoc(postsCollectionRef, {
            postID: "",
            postTitle: postTitleInputValue,
            postCaption: postCaptionInputValue || null,
            postImageURL: imageURL || null,
            postVideoURL: videoURL || null,
            postCreatorID: user?.uid,
            postCreatorName: user?.displayName,
            postCreateAtCommunityID: selectedCommunity,
            upvotedByUserID: [],
            downvotedByUserID: []
          })


          // Upading post to add ID manually
          const postDocRef = doc(db, "posts", postDoc.id)
          await updateDoc(postDocRef, {
            postID: postDoc.id
          })

          // Adding postID to user's createdPostsID array
          const userRef = doc(db, "users", user?.uid as string)
          await updateDoc(userRef, {
            createdPostsID: arrayUnion(postDoc.id)
          })

          // Adding postID to communiy's postsID
            const communityDocRef = doc(db, "communities", selectedCommunity as any)
            await updateDoc(communityDocRef, {
              postsID: arrayUnion(postDoc.id)
            })

          
          // ---- Resetting states ---- 
          setPostTitleInputValue("")
          setPostCaptionInputValue("")
          setImage([])
          setVideo([])
          setIsPostPosting(false)
          // setImageURL("")
          // setVideoURL("")
          router.push(`place/${selectedCommunity}`)
          
        } catch (error) {
          console.log(error);
          setIsPostPosting(false)
        }
    
  }
  



  useEffect(() => {
    titleInputRef?.current?.focus
    setSelectedCommunity(userJoinedCommunitiesState[0]?.communityID)
  },[userJoinedCommunitiesState])

  return (
    <>
      {!isPostPosting && <div className='md:hidden w-full h-full mb-[9vh] lg:mb-0 flex flex-col justify-between items-center pt-5'>
        <div className='w-full flex space-x-2 justify-start items-center mb-4 bg-lightColor px-3'>
          <p className='text-sm font-poppins font-normal' onClick={() => console.log( 1 )}>Posting to  </p>
          {/* <p className='text-sm font-poppins font-normal' onClick={() => console.log( selectedCommunity )}> LOG selectedCommunity  </p> */}

          <select 
          title='select a community' 
          className="w-[50%] border font-medium border-brandColor outline-none bg-lightColor rounded-full text-sm focus:ring-0 focus:border-brandColor" 
          value={userJoinedCommunitiesState[0]?.communityID} 
          onChange={(e) => setSelectedCommunity(e.target.value)}>

            {userJoinedCommunitiesState && (
              userJoinedCommunitiesState.map((community) => {
                return(
                  <option
                  key={community.communityID} 
                  className='text-sm bg-lightColor text-darkColor'
                  value={community?.communityID}
                  > 
                    {community?.communityName} 
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
            onChange={(e) => setPostTitleInputValue(e.target.value) }
            value={postTitleInputValue}
          />

          {postType === "caption" && (
            <textarea 
            typeof='text'
            placeholder='Add caption'
            className='w-full min-h-[75%] border-none outline-none font-poppins font-medium bg-lightColor focus:ring-0'
            onChange={(e) => setPostCaptionInputValue(e.target.value)}
            value={postCaptionInputValue}
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

        <div className='md:hidden fixed bottom-0 z-30 px-5 w-full h-[15vh] border-t border-t-midColor bg-lightColor flex justify-between items-center'>
            <div className='w-full flex justify-start items-center space-x-2'>
              <button 
              type='button'
              onClick={() => {
                setPostType("caption")
                setImage([])
                setVideo([])
              }}
              className={postType === "caption" ? "px-3 py-3 rounded-md bg-brandColor flex justify-center items-center active:bg-midColor space-x-2" : "px-3 py-3 rounded-md bg-gray-200 flex justify-center items-center active:bg-midColor space-x-2"}
              > 
                <BsTextCenter className={postType === "caption" ? 'text-lightColor opacity-70' : 'text-darkColor opacity-70' } />
                <span className={ postType === "caption" ? 'hidden sm:inline-block text-lightColor  text-sm font-normal font-poppins' : 'hidden text-darkColor sm:inline-block text-sm font-normal font-poppins'}> Caption </span>
              </button>

              <button 
              type='button'
              onClick={() => {
                setPostType("image")
                setPostCaptionInputValue("")
                setVideo([])
              }}
              className={postType === "image" ? "px-3 py-3 rounded-md bg-brandColor flex justify-center items-center active:bg-midColor space-x-2" : "px-3 py-3 rounded-md bg-gray-200 flex justify-center items-center active:bg-midColor space-x-2"}
              > 
                <BsImage className={postType === "image" ? 'text-lightColor opacity-70' : 'text-darkColor opacity-70' } />
                <span className={ postType === "image" ? 'hidden sm:inline-block text-lightColor  text-sm font-normal font-poppins' : 'hidden text-darkColor sm:inline-block text-sm font-normal font-poppins'}> Image </span>
              </button>

              <button 
              type='button'
              onClick={() => {
                setPostType("video")
                setPostCaptionInputValue("")
                setImage([])
              }}
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
              if(postType === "caption") {
                addPost(null, null)
              } else if (postType === "image") {
                uploadImage()
              } else if (postType === "video") {
                uploadVideo()
              }
            }}
            > Post  </button>
        </div>
      </div>}

      {isPostPosting && (
        <div className='z-40 w-[100%] h-[100vh] fixed inset-0 flex flex-col justify-center items-center bg-lightColor space-y-5'> 
          <p className='text-4xl font-bold text-brandColor'> Posting... </p>
          <AiOutlineLoading3Quarters className="w-10 h-10 text-brandColor animate-spin" />
      </div>
      )}
    </>

  )
}

export default SmallScreenCreatePostContainer






// ============ OLD CHOOSE POST TYPE BOTTOM DRAWER ====================

// {false && <div className='w-full fixed bottom-0 z-30 space-y-2 px-3 py-5 flex flex-col justify-start items-start bg-lightColor border-t border-t-midColor'>
// <button 
//   className='w-full py-2 px-2 flex items-center justify-start space-x-3 hover:cursor-pointer active:bg-midColor rounded-md' 
//   type='button'
//   onClick={() => setPostType("caption")}
//   > 
//   <BsTextCenter className='text-darkColor opacity-70' />
//   <p className='text-sm text-darkColor font-poppins font-normal'> Text </p> 
// </button>

// <button 
//   className='w-full py-2 px-2 flex items-center justify-start space-x-3 hover:cursor-pointer active:bg-midColor rounded-md' 
//   type='button'
//   onClick={() => setPostType("image")}
//   > 
//   <BsImage className='text-darkColor opacity-70' />
//   <p className='text-sm text-darkColor font-poppins font-normal'> Image </p> 
// </button>

// <button 
//   className='w-full py-2 px-2 flex items-center justify-start space-x-3 hover:cursor-pointer active:bg-midColor rounded-md ' 
//   type='button'
//   onClick={() => setPostType("video")}
//   > 
//   <BsCameraVideo className='text-darkColor opacity-70' />
//   <p className='text-sm text-darkColor font-poppins font-normal'> Video </p> 
// </button>
// </div>}