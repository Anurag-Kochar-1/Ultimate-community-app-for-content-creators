import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { auth, db, storage } from "../../../../../../firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { useSelector } from 'react-redux'
import { useRouter } from "next/router"
import { ICommunityData } from '../../../../../../customTypesAndInterfaces/communityInterfaces'
import { GrAdd } from 'react-icons/gr'
import { BsCameraVideo, BsImage, BsTextCenter } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface IProps {
    selectedCommunity: ICommunityData | null
    setSelectedCommunity: any
}




const CreatePostBox = ({ selectedCommunity, setSelectedCommunity }: IProps) => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const postsCollectionRef = collection(db, "posts")

    const [isPostPosting, setIsPostPosting] = useState<boolean>(false)
    const [postType, setPostType] = useState<string>("caption")
    const [postTitleInputValue, setPostTitleInputValue] = useState<string>("")
    const [postCaptionInputValue, setPostCaptionInputValue] = useState<string>("")
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


    // useEffect(() => {
    //     // setHydrated(true)
    //     // currentUserData?.subredditsJoinedID?.map((subreddit:any) => (
    //     //     setSubbreditsJoined([...subbreditsJoined , subreddit])
    //     // ))


    // },[user])


    // if(!hydrated) return null

    return (
        <div className='w-full h-[40vh] bg-lightColor flex flex-col justify-start items-center rounded-md shadow-xl shadow-midColor'>
            {/* <h1 className='text-xl' onClick={() => console.log(postMedia)}> postMedia </h1> */}
            {!isPostPosting && <div className='w-full' >
                <div className='flex justify-between items-center rounded-md '>
                    <button
                        type='button'
                        onClick={() => setPostType('caption')}
                        className={postType === "caption" ? "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-brandColor py-3 hover:cursor-pointer" : "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-b-gray-400 py-3 hover:cursor-pointer"}
                    >
                        <BsTextCenter className={postType === "caption" ? 'text-brandColor w-5 h-5' : 'text-darkColor w-5 h-5'} />
                        <span className={postType === "caption" ? 'font-medium text-brandColor text-base' : 'font-medium text-dakrColor text-base'}> Caption </span>
                    </button>

                    <button
                        type='button'
                        onClick={() => setPostType('image')}
                        className={postType === "image" ? "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-brandColor py-3 hover:cursor-pointer" : "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-b-gray-400 py-3 hover:cursor-pointer"}
                    >
                        <BsImage className={postType === "image" ? 'text-brandColor w-5 h-5' : 'text-darkColor w-5 h-5'} />
                        <span className={postType === "image" ? 'font-medium text-brandColor text-base' : 'font-medium text-dakrColor text-base'}>  Image  </span>
                    </button>

                    <button
                        type='button'
                        onClick={() => setPostType('video')}
                        className={postType === "video" ? "w-full h-full flex justify-center items-center space-x-3  border-b border-brandColor py-3 hover:cursor-pointer" : "w-full h-full flex justify-center items-center space-x-3 border-b border-b-gray-400 py-3 hover:cursor-pointer"}
                    >
                        <BsCameraVideo className={postType === "video" ? 'text-brandColor w-5 h-5' : 'text-darkColor w-5 h-5'} />
                        <span className={postType === "video" ? 'font-medium text-brandColor text-base' : 'font-medium text-dakrColor text-base'}>Video  </span>
                    </button>
                </div>


                {postType === "caption" && (
                    <div className='w-full bg-lightColor h-[40vh] flex flex-col items-center justify-between space-y-2 py-5 rounded-md'>

                        <div className='w-full h-full flex flex-col justify-start items-center space-y-2 bg-lightColor'>
                            <input
                                type="text"
                                placeholder='Title'
                                className='w-[90%] bg-lightColor h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                                value={postTitleInputValue}
                                onChange={(e) => setPostTitleInputValue(e.target.value)}
                            />
                            <textarea
                                placeholder='Caption'
                                className='w-[90%] bg-lightColor min-h-[70%] outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                                value={postCaptionInputValue}
                                onChange={(e) => setPostCaptionInputValue(e.target.value)}
                            />
                        </div>

                        <div className='w-full flex justify-end items-center px-5 py-2 rounded-md '>
                            <button
                                type='button'
                                onClick={() => {
                                    addPost(null, null)
                                }}
                                className='px-4 py-1 border-none outline-none bg-brandColor rounded-sm text-white font-medium text-base'
                            > Post </button>
                        </div>
                    </div>
                )}

                {postType === "image" && (
                    <div className='w-full h-[40vh]  flex flex-col items-center justify-between space-y-2 bg-lightColor rounded-xl py-5'>
                        <div className='w-full  flex flex-col justify-center items-center space-y-2'>
                            <input
                                type="text"
                                placeholder='Title'
                                className='w-[90%] bg-lightColor h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                                value={postTitleInputValue}
                                onChange={(e) => setPostTitleInputValue(e.target.value)}
                            />

                            <div className='w-full flex justify-center items-center py-2 bg-lightColor'>
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

                        </div>

                        <div className='w-full flex justify-end items-center px-5 py-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    uploadImage()
                                }}
                                className='px-4 py-1 border-none outline-none bg-brandColor rounded-sm text-white font-medium text-base'
                            > Post </button>
                        </div>
                    </div>
                )}

                {postType === "video" && (
                    <div className='w-full h-[40vh]  flex flex-col items-center justify-between space-y-2 bg-lightColor rounded-xl py-5'>
                        <div className='w-full  flex flex-col justify-center items-center space-y-2'>
                            <input
                                type="text"
                                placeholder='Title'
                                className='w-[90%] bg-lightColor h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                                value={postTitleInputValue}
                                onChange={(e) => setPostTitleInputValue(e.target.value)}
                            />

                            <div className='w-full flex justify-center items-center py-2 bg-lightColor'>
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

                        </div>

                        <div className='w-full flex justify-end items-center px-5 py-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    uploadVideo()
                                }}
                                className='px-4 py-1 border-none outline-none bg-brandColor rounded-sm text-white font-medium text-base'
                            > Post </button>
                        </div>
                    </div>
                )}
            </div>}




            {isPostPosting && (
                <div className='z-40 w-[100%] h-[100vh] fixed inset-0 flex flex-col justify-center items-center bg-lightColor space-y-5'>
                    <p className='text-4xl font-bold text-brandColor'> Posting... </p>
                    <AiOutlineLoading3Quarters className="w-10 h-10 text-brandColor animate-spin" />
                </div>
            )}
        </div>
    )
}

export default CreatePostBox

