import React, {useState , useEffect} from 'react'
import dynamic from 'next/dynamic'
import {RiFileList2Line , RiImage2Fill } from "react-icons/ri"
import { TfiLink } from "react-icons/tfi"
import {auth, db, storage} from "../../../../../firebaseConfig"
import { ref , uploadBytesResumable , getDownloadURL} from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { useSelector } from 'react-redux'
import {useRouter} from "next/router"


interface IProps {
    selectedCommunity : any[]
    setSelectedCommunity : React.Dispatch<React.SetStateAction<any[]>>
    selectedCommunity2 : any[]
    setSelectedCommunity2 : React.Dispatch<React.SetStateAction<any[]>>
  }

 enum addPostStatuses {
        SUCCESS,
        LOADING,
        ERROR,
        IDLE ,
    }


const CreatePostBox =  ({selectedCommunity, setSelectedCommunity, selectedCommunity2 , setSelectedCommunity2}:IProps) => {
    let status = addPostStatuses.IDLE
    const [hydrated, setHydrated] = useState<boolean>(false);
    const [user] = useAuthState(auth)
    // const {currentUserData} = useSelector((state:any) => state?.user)
    const [ uploadType, setUploadType ] = useState<string>('post')

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
    
    
    
    const uploadMedia = async () => {
        console.log(`---------------- uploadMedia is running ------------------`)
        if( postMedia ) {
            setPostingStatus("LOADING")
            console.log(`---- post media founded -----`)
            const mediaRef = ref(storage, 'posts/' + uuidv4() + "--" + postMedia[0].name)
            const uploadMedia = uploadBytesResumable(mediaRef, postMedia[0])
        
            uploadMedia.on("state_changed" , (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log(`upload is ${progress}% done`);
                        
            },
            (error) => {
                alert(error)
            }, 
            () => {
                getDownloadURL(uploadMedia.snapshot.ref).then((downloadURL) => {
                    // setMediaURLstate((prev) => {
                    //         return prev = downloadURL
                    // })
                    // console.log('File available at', mediaURLstate);
                    setTimeout(() => {
                        console.log(`====== setTimeout ======`);
                        
                        addPost(downloadURL)
                        
                    }, 3000);
                });
                
                
            }) 


            
        }
        else if (postMedia == null) {
            console.log(`---- NO post media -----`)
            addPost(null)
        }
                    
    }

    

    const addPost = async (downloadURL:any) => {
        console.log(`--------------- addPost is running ------------------`);
        
        try {
                setPostingStatus("LOADING")
                const postDoc = await addDoc(postsCollectionRef, {
                    postID: "",
                    postTitle : postTitleInput,
                    postCaption : postCaptionInput,
                    postedAtSubbredditID : selectedCommunity2[0].subredditID,
                    postedAtSubbredditName : selectedCommunity2[0].subredditName,
                    postedAtSubbredditLogo : selectedCommunity2[0].logo,
                    postURL : postURLInput,
                    creatorUserID : user?.uid,

                    mediaURL: downloadURL,
                    // mediaURL: mediaURLstate ? mediaURLstate : null,

                    creatorUsername : user?.displayName,
                    upvotedBy: [],
                    downvotedBy: [],
                    comments: []
                })
    
                // ---- adding post to subreddit posts sub-collection ----
                const subredditPostsSubCollectionRef = doc(db, `subreddits/${selectedCommunity2[0].subredditID as string}/subredditPosts/${postDoc.id}`); 
                await setDoc(subredditPostsSubCollectionRef, {
                    postID: "",
                    postTitle : postTitleInput,
                    postCaption : postCaptionInput,
                    postedAtSubbredditID : selectedCommunity2[0].subredditID,
                    postedAtSubbredditName : selectedCommunity2[0].subredditName,
                    postedAtSubbredditLogo : selectedCommunity2[0].logo,
                    postURL : postURLInput,
                    creatorUserID : user?.uid,

                    mediaURL: downloadURL,

                    creatorUsername : user?.displayName,
                    upvotedBy: [],
                    downvotedBy: [],
                    comments: []
                })
    
                // ---- Upadating User ----
                const userRef = doc(db, "users" , user?.uid as string)
                await updateDoc(userRef, {
                    createdPostsID: arrayUnion(postDoc.id)
                })


                // ---- Changing ID ---- 
                const currentPostRef = doc(db, "posts", postDoc.id)
                await updateDoc(currentPostRef, {
                    postID: postDoc.id
                })
    
    
                // ---- Reseting States ----

                router.push("/")

                setPostTitleInput("")
                setPostCaptionInput("")
                setSelectedCommunity2([])
                setPostURLInput("")
                setPostMedia(null)
                setMediaURLstate("")

                setPostingStatus("IDLE")

        } catch (error) {
            console.log(error);
            
        }
    }

    



    useEffect(() => {
        setHydrated(true)
        // currentUserData?.subredditsJoinedID?.map((subreddit:any) => (
        //     setSubbreditsJoined([...subbreditsJoined , subreddit])
        // ))
    },[])


    if(!hydrated) return null

  return (
    <div className='w-full bg-white h-full rounded-xl shadow-lg py-0  '>
        {/* <h1 className='text-xl' onClick={() => console.log(postMedia)}> postMedia </h1> */}
        {postingStatus === "IDLE" && <div className='w-auto h-auto' >
            <div className='flex justify-between items-center rounded-xl border-b border-b-gray-400'>
                <button 
                    type='button' 
                    onClick={() => setUploadType('post')}
                    className="w-full h-full flex justify-center items-center space-x-3 border-r border-r-gray-400  rounded-sm py-3 hover:cursor-pointer"    
                    
                > 
                    <RiFileList2Line className='text-gray-700 w-5 h-5'/>
                    <span className='font-medium text-gray-700 text-base'> Post </span>
                </button>
    
                <button 
                    type='button' 
                    onClick={() => setUploadType('imagesAndVideo')}
                    className="w-full h-full flex justify-center items-center space-x-3 border-r border-r-gray-400  rounded-sm py-3 hover:cursor-pointer"    
                >
                    <RiImage2Fill className='text-gray-700 w-5 h-5'/>
                    <span className='font-medium text-gray-700 text-base'> Images & Video  </span> 
                </button>

                <button 
                    type='button' 
                    onClick={() => setUploadType('link')}
                    className="w-full h-full flex justify-center items-center space-x-3 rounded-sm py-3 hover:cursor-pointer"    
                > 
                    <TfiLink className='text-gray-700 w-5 h-5'/>
                    <span className='font-medium text-gray-700 text-base'> Link  </span>
                </button>
            </div>


            {uploadType === "post" &&  (
                <div
                    className='w-full h-full  flex flex-col items-center justify-between space-y-2 bg-red-100 rounded-xl py-5'
                > 
                    <div className='w-full flex flex-col justify-center items-center space-y-2'>
                        <input
                            type="text" 
                            placeholder='Title'    
                            className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 focus:border focus:border-gray-400'
                            value={postTitleInput}
                            onChange={(e) => setPostTitleInput(e.target.value)}
                        />
                        <textarea 
                            placeholder='Caption'
                            className='w-[90%] h-24 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 focus:border focus:border-gray-400'
                        />
                    </div>

                    <div className='w-full flex justify-end items-center px-5 py-1'>
                        <button
                            type='button'
                            onClick={() => {
                                uploadMedia()
                            }}
                            className='px-4 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
                        > Post </button>
                    </div>

                            
                </div>
            )}

            {uploadType === "imagesAndVideo" &&  (
                <div
                className='w-full h-full  flex flex-col items-center justify-between space-y-2 bg-red-400 rounded-xl py-5'

                > 
                <div className='w-full flex flex-col justify-center items-center space-y-2'>
                    <input
                        type="text" 
                        placeholder='Title'    
                        className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 focus:border focus:border-gray-400'
                        value={postTitleInput}
                        onChange={(e) => setPostTitleInput(e.target.value)}
                    />
                    
                    <div className='w-[90%] h-full p-2 bg-gray-100 flex justify-center items-center outline-none border border-gray-200 rounded-md'>

                        {/* <div onClick={() => console.log(1)}> LOG --- addPostStatuses : {addPostStatuses} </div> */}
                        
                        <div className="flex items-center justify-center w-full bg-purple-500" >   
                            <label 
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-transparent ">
                                {!mediaURLstate && <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-transparent">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>}

                                {/* {mediaURLstate && (
                                    <img src={mediaURLstate} alt="" className='h-20 w-20 rounded-md aspect-square' />
                                )} */}

                                {/* <h1 onClick={() => console.log(mediaURLstate)}> Log mediaURLstate = {mediaURLstate} </h1> */}
                                {/* { image && <img src={image} alt="imageState" className='w-20 h-20 aspect-square' />} */}

                                <input 
                                    id="dropzone-file" 
                                    type="file" 
                                    accept='image/png , image/jpeg'
                                    className="hidden" 
                                    onChange={(e) => {
                                        setPostMedia((prev:any) => {
                                            return prev = e.target.files
                                        })

                                        // let binaryData = [];
                                        // binaryData.push(postMedia[0]);
                                        // setImage(window.URL.createObjectURL(new Blob(binaryData)))
                                        // setImage(URL.createObjectURL(postMedia[0]))
                                    }}

                                    />
                            </label>
                        </div> 


                    </div>
                    
                </div>

                <div className='w-full flex justify-end items-center px-5 py-1'>
                    <button
                        type='button'
                        className='px-4 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
                        onClick={() => {
                            uploadMedia()
                        }}
                    > Post </button>
                </div>

                        
                </div>
            )}

            {uploadType === "link" &&  (
                <div
                className='w-full h-full  flex flex-col items-center justify-between space-y-2 bg-red-500 rounded-xl py-5'
            > 
                <div className='w-full flex flex-col justify-center items-center space-y-2'>
                    <input
                        type="text" 
                        placeholder='Title'    
                        className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 focus:border focus:border-gray-400'
                        value={postTitleInput}
                        onChange={(e) => setPostTitleInput(e.target.value)}
                    />
                    <input
                        type="text" 
                        placeholder='Url'    
                        className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 focus:border focus:border-gray-400'
                        value={postURLInput}
                        onChange={(e) => setPostURLInput(e.target.value)}
                    />
                </div>

                <div className='w-full flex justify-end items-center px-5 py-1'>
                    <button
                        type='button'
                        onClick={() => {
                            uploadMedia()
                        }}
                        className='px-4 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
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




/*
 ---- Process ----

1. adding Post to Posts collection
2. adding Post to selected subreddit's sub collection
3. adding Post to users's sub collection

*/