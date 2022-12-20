import React, {useState , useEffect} from 'react'
import dynamic from 'next/dynamic'
import {auth, db, storage} from "../../../../../../firebaseConfig"
import { ref , uploadBytesResumable , getDownloadURL} from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { useSelector } from 'react-redux'
import {useRouter} from "next/router"
import { ICommunityData } from '../../../../../../customTypesAndInterfaces/communityInterfaces'
import { GrAdd } from 'react-icons/gr'
import { BsCameraVideo, BsImage, BsTextCenter } from 'react-icons/bs'

interface IProps {
    selectedCommunity : ICommunityData | null
    setSelectedCommunity : any
  }

 enum addPostStatuses {
        SUCCESS,
        LOADING,
        ERROR,
        IDLE ,
}


const CreatePostBox =  ({selectedCommunity, setSelectedCommunity}:IProps) => {
    let status = addPostStatuses.IDLE
    const [hydrated, setHydrated] = useState<boolean>(false);
    const [user, loading] = useAuthState(auth)
    // const {currentUserData} = useSelector((state:any) => state?.user)
    const [ uploadType, setUploadType ] = useState<string>('caption')

    // const [selectedSubredditID, setSelectedSubredditID] = useState<string>("")
    const [postTitleInput, setPostTitleInput ] = useState<string>("")
    const [postCaptionInput, setPostCaptionInput ] = useState<string>("")
    const [postURLInput, setPostURLInput ] = useState<string>("")

    const [postMedia, setPostMedia] = useState<any>(null)
    const [mediaURLstate, setMediaURLstate] = useState<string>("")
    const [postingStatus, setPostingStatus] = useState<string>("IDLE")

    const router = useRouter()
   


    const [subbreditsJoined, setSubbreditsJoined] = useState<any>([])
    const postsCollectionRef = collection(db, "posts")

    // const postCollectionRef = collection(db, "posts")
    // const userDocRef = doc(db, "users" , user?.uid as string)
    // const subbreditDocRef = doc(db, "subreddits", selectedSubredditID)
    
    
    
    // const uploadMedia = async () => {
    //     console.log(`---------------- uploadMedia is running ------------------`)
    //     if( postMedia ) {
    //         setPostingStatus("LOADING")
    //         console.log(`---- post media founded -----`)
    //         const mediaRef = ref(storage, 'posts/' + uuidv4() + "--" + postMedia[0].name)
    //         const uploadMedia = uploadBytesResumable(mediaRef, postMedia[0])
        
    //         uploadMedia.on("state_changed" , (snapshot) => {
    //                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                     console.log(`upload is ${progress}% done`);
                        
    //         },
    //         (error) => {
    //             alert(error)
    //         }, 
    //         () => {
    //             getDownloadURL(uploadMedia.snapshot.ref).then((downloadURL) => {
    //                 // setMediaURLstate((prev) => {
    //                 //         return prev = downloadURL
    //                 // })
    //                 // console.log('File available at', mediaURLstate);
    //                 setTimeout(() => {
    //                     console.log(`====== setTimeout ======`);
                        
    //                     addPost(downloadURL)
                        
    //                 }, 3000);
    //             });
                
                
    //         }) 


            
    //     }
    //     else if (postMedia == null) {
    //         console.log(`---- NO post media -----`)
    //         addPost(null)
    //     }
                    
    // }

    

    // const addPost = async (downloadURL:any) => {
    //     console.log(`--------------- addPost is running ------------------`);
        
    //     try {
    //             setPostingStatus("LOADING")
    //             const postDoc = await addDoc(postsCollectionRef, {
    //                 postID: "",
    //                 postTitle : postTitleInput,
    //                 postCaption : postCaptionInput,
    //                 postedAtSubbredditID : selectedCommunity2[0].subredditID,
    //                 postedAtSubbredditName : selectedCommunity2[0].subredditName,
    //                 postedAtSubbredditLogo : selectedCommunity2[0].logo,
    //                 postURL : postURLInput,
    //                 creatorUserID : user?.uid,

    //                 mediaURL: downloadURL,
    //                 // mediaURL: mediaURLstate ? mediaURLstate : null,

    //                 creatorUsername : user?.displayName,
    //                 upvotedBy: [],
    //                 downvotedBy: [],
    //                 comments: []
    //             })
    
    //             // ---- adding post to subreddit posts sub-collection ----
    //             const subredditPostsSubCollectionRef = doc(db, `subreddits/${selectedCommunity2[0].subredditID as string}/subredditPosts/${postDoc.id}`); 
    //             await setDoc(subredditPostsSubCollectionRef, {
    //                 postID: "",
    //                 postTitle : postTitleInput,
    //                 postCaption : postCaptionInput,
    //                 postedAtSubbredditID : selectedCommunity2[0].subredditID,
    //                 postedAtSubbredditName : selectedCommunity2[0].subredditName,
    //                 postedAtSubbredditLogo : selectedCommunity2[0].logo,
    //                 postURL : postURLInput,
    //                 creatorUserID : user?.uid,

    //                 mediaURL: downloadURL,

    //                 creatorUsername : user?.displayName,
    //                 upvotedBy: [],
    //                 downvotedBy: [],
    //                 comments: []
    //             })
    
    //             // ---- Upadating User ----
    //             const userRef = doc(db, "users" , user?.uid as string)
    //             await updateDoc(userRef, {
    //                 createdPostsID: arrayUnion(postDoc.id)
    //             })


    //             // ---- Changing ID ---- 
    //             const currentPostRef = doc(db, "posts", postDoc.id)
    //             await updateDoc(currentPostRef, {
    //                 postID: postDoc.id
    //             })
    
    
    //             // ---- Reseting States ----

    //             router.push("/")

    //             setPostTitleInput("")
    //             setPostCaptionInput("")
    //             setSelectedCommunity2([])
    //             setPostURLInput("")
    //             setPostMedia(null)
    //             setMediaURLstate("")

    //             setPostingStatus("IDLE")

    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    



    useEffect(() => {
        // setHydrated(true)
        // currentUserData?.subredditsJoinedID?.map((subreddit:any) => (
        //     setSubbreditsJoined([...subbreditsJoined , subreddit])
        // ))

        
    },[user])


    // if(!hydrated) return null

  return (
    <div className='w-full h-[40vh] bg-lightColor flex flex-col justify-start items-center rounded-md shadow-xl shadow-midColor'>
        {/* <h1 className='text-xl' onClick={() => console.log(postMedia)}> postMedia </h1> */}
        {postingStatus === "IDLE" && <div className='w-full' >
            <div className='flex justify-between items-center rounded-md '>
                <button 
                    type='button' 
                    onClick={() => setUploadType('caption')}
                    className={uploadType === "caption" ? "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-brandColor py-3 hover:cursor-pointer" : "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-b-gray-400 py-3 hover:cursor-pointer"}    
                > 
                    <BsTextCenter className={uploadType === "caption" ? 'text-brandColor w-5 h-5' : 'text-darkColor w-5 h-5'} />
                    <span className={uploadType === "caption" ? 'font-medium text-brandColor text-base' : 'font-medium text-dakrColor text-base' }> Caption </span>
                </button>
    
                <button 
                    type='button' 
                    onClick={() => setUploadType('image')}
                    className={uploadType === "image" ? "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-brandColor py-3 hover:cursor-pointer" : "w-full h-full flex justify-center items-center space-x-3 border-r border-b border-r-gray-300  border-b-gray-400 py-3 hover:cursor-pointer"}   
                >
                    <BsImage className={uploadType === "image" ? 'text-brandColor w-5 h-5' : 'text-darkColor w-5 h-5'} />
                    <span className={uploadType === "image" ? 'font-medium text-brandColor text-base' : 'font-medium text-dakrColor text-base' }>  Image  </span> 
                </button>

                <button 
                    type='button' 
                    onClick={() => setUploadType('video')}
                    className={uploadType === "video" ? "w-full h-full flex justify-center items-center space-x-3  border-b border-brandColor py-3 hover:cursor-pointer" : "w-full h-full flex justify-center items-center space-x-3 border-b border-b-gray-400 py-3 hover:cursor-pointer"}
                > 
                    <BsCameraVideo className={uploadType === "video" ? 'text-brandColor w-5 h-5' : 'text-darkColor w-5 h-5'} />
                    <span className={uploadType === "video" ? 'font-medium text-brandColor text-base' : 'font-medium text-dakrColor text-base' }>Video  </span>
                </button>
            </div>


            {uploadType === "caption" &&  (
                <div className='w-full bg-lightColor h-[40vh] flex flex-col items-center justify-between space-y-2 py-5 rounded-md'>
                    
                    <div className='w-full h-full flex flex-col justify-start items-center space-y-2 bg-lightColor'>
                        <input
                            type="text" 
                            placeholder='Title'    
                            className='w-[90%] bg-lightColor h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                            value={postTitleInput}
                            onChange={(e) => setPostTitleInput(e.target.value)}
                        />
                        <textarea 
                            placeholder='Caption'
                            className='w-[90%] bg-lightColor min-h-[70%] outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                        />
                    </div>

                    <div className='w-full flex justify-end items-center px-5 py-2 rounded-md '>
                        <button
                            type='button'
                            onClick={() => {
                                // uploadMedia()
                            }}
                            className='px-4 py-1 border-none outline-none bg-brandColor rounded-sm text-white font-medium text-base'
                        > Post </button>
                    </div>       
                </div>
            )}

            {uploadType === "image" &&  (
                <div className='w-full h-[40vh]  flex flex-col items-center justify-between space-y-2 bg-lightColor rounded-xl py-5'> 
                    <div className='w-full  flex flex-col justify-center items-center space-y-2'>
                        <input
                            type="text" 
                            placeholder='Title'    
                            className='w-[90%] bg-lightColor h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                            value={postTitleInput}
                            onChange={(e) => setPostTitleInput(e.target.value)}
                        />
                        
                        <div className='w-full flex justify-center items-center py-2 bg-lightColor'>
                                <div className='w-32 h-32 rounded-sm border border-dashed bg-lightColor border-brandColor flex justify-center items-center '>
                                    <label className='w-full h-full flex justify-center items-center hover:cursor-pointer'>
                                    <input type="file" placeholder='image' accept="image/*" hidden />
                                    <GrAdd className='text-xl' />
                                    </label>
                                </div>
                        </div>
                        
                    </div>

                    <div className='w-full flex justify-end items-center px-5 py-2'>
                        <button
                            type='button'
                            onClick={() => {
                                // uploadMedia()
                            }}
                            className='px-4 py-1 border-none outline-none bg-brandColor rounded-sm text-white font-medium text-base'
                        > Post </button>
                    </div> 
                </div>
            )}

            {uploadType === "video" &&  (
                <div className='w-full h-[40vh]  flex flex-col items-center justify-between space-y-2 bg-lightColor rounded-xl py-5'> 
              <div className='w-full  flex flex-col justify-center items-center space-y-2'>
                  <input
                      type="text" 
                      placeholder='Title'    
                      className='w-[90%] bg-lightColor h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-darkColor focus:ring-0 focus:border-gray-200 font-poppins font-medium'
                      value={postTitleInput}
                      onChange={(e) => setPostTitleInput(e.target.value)}
                  />
                  
                  <div className='w-full flex justify-center items-center py-2 bg-lightColor'>
                          <div className='w-32 h-32 rounded-sm border border-dashed bg-lightColor border-blue-300 flex justify-center items-center '>
                              <label className='w-full h-full flex justify-center items-center hover:cursor-pointer'>
                              <input type="file" placeholder='image' accept="video/*" hidden />
                              <GrAdd className='text-xl' />
                              </label>
                          </div>
                  </div>
                  
              </div>

              <div className='w-full flex justify-end items-center px-5 py-2'>
                  <button
                      type='button'
                      onClick={() => {
                          // uploadMedia()
                      }}
                      className='px-4 py-1 border-none outline-none bg-brandColor rounded-sm text-white font-medium text-base'
                  > Post </button>
              </div> 
                </div>
            )}
        </div>}




        {postingStatus == "LOADING" && (
            <div>
                <h1 className='text-5xl'> POSTING..... </h1>
            </div>
        )}
    </div>
  )
}

export default CreatePostBox


{/* <div className="flex items-center justify-center w-full bg-purple-500" >   
                                <label 
                                    htmlFor="dropzone-file" 
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-transparent ">
                                    {!mediaURLstate && <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-transparent">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>}

                           

                                    <input 
                                        id="dropzone-file" 
                                        type="file" 
                                        accept='image/png , image/jpeg'
                                        className="hidden" 
                                        onChange={(e) => {
                                            setPostMedia((prev:any) => {
                                                return prev = e.target.files
                                            })

                                      

                                        />
                                </label>
                            </div>  */}