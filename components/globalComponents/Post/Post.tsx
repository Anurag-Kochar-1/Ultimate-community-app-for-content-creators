import React, {useState, useEffect} from 'react' 
import PostExtraOptions from './PostExtraOptions'
import subredditDefaultLogo from "../../../public/images/subredditDefaultLogo.png"
import Image, { StaticImageData } from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebaseConfig'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { IPost } from '../../../customTypesAndInterfaces/post'
import { ICommunityData } from '../../../customTypesAndInterfaces/communityInterfaces'
import offstaLogo from "../../../public/images/offstaLogo.png"
import Link from 'next/link'
import { setIsLoginModalOpen } from "../../../redux/slices/modalSlices"

// Icons
import {BiUpvote, BiDownvote, BiShareAlt, BiComment} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { IAllSlicesState } from '../../../customTypesAndInterfaces/allSlicesState'
import { ICurrentUserData } from '../../../customTypesAndInterfaces/user'

interface IProps {
    at: string
    postData: IPost
}



const Post = ({at , postData}:IProps) => {
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    const { isLoginModalOpen } = useSelector((state:IAllSlicesState) => state.modals)

    const [isPostUpvoted, setIsPostUpvoted] = useState<boolean>(false)
    const [isPostDownVoted, setIsPostDownVoted] = useState<boolean>(false)
    const [isPostFullyExtended, setIsPostFullyExtended] = useState<boolean>(false)

    const [postUpvotedDownvotedValue, setPostUpvotedDownvotedValue ] = useState<number>(postData.upvotedByUserID.length - postData.downvotedByUserID.length)
    const { currentUserData }  = useSelector((state: IAllSlicesState) => state.user)
    const [postCommunityData, setPostCommunityData] = useState<ICommunityData[]>([])
    const [isPostUpVoted, setIsPostUpVoted] = useState<boolean>(false)

    const postRef = doc(db, "posts", postData.postID as string)
    const communityRef = doc(db, "communities", postData?.postCreateAtCommunityID)
    
    
    const upvoteThePost = async () => {
        
        if(!auth.currentUser){
            dispatch(setIsLoginModalOpen(true))
            return
        } else if (auth.currentUser && isPostUpVoted === false && isPostDownVoted == false) {
            const userRef = doc(db, "users", user?.uid as string )
            console.log(`-- upvoteThePost is running ---`);
            try {
                // ---- Updating User => Removing user from downvotedPostsID array ----
                await updateDoc(userRef, {
                downvotedPostsID: arrayRemove(postData?.postID)
                })

                // ---- Updating User => Adding user to upvotedPostsID array ----
                await updateDoc(userRef, {
                upvotedPostsID: arrayUnion(postData?.postID)
                })
            

                // ---- Updating Post =>  Removing from downvotedByUserID ----
                await updateDoc(postRef, {
                        downvotedByUserID: arrayRemove(user?.uid)
                })
            
            
                
                // ---- Updating Post =>  Adding userID to upvotedByUserID ----
                await updateDoc(postRef, {
                    upvotedByUserID: arrayUnion(user?.uid)
                })


                
                setIsPostUpvoted(true)
                setIsPostDownVoted(false)
                setPostUpvotedDownvotedValue(postUpvotedDownvotedValue + 1)
            } catch (error) {
                console.log(error);
                setIsPostUpvoted(false)
            }
        } else if (auth.currentUser && isPostUpVoted === true && isPostDownVoted == false ) {
            const userRef = doc(db, "users", user?.uid as string )
            console.log("un-UpVoted")

            await updateDoc(userRef, {
                upvotedPostsID: arrayRemove(postData?.postID)
            })

            await updateDoc(postRef, {
                upvotedByUserID: arrayRemove(user?.uid)
            })

            setIsPostUpVoted(false)
        }
    }
    
    const downvoteThePost = async () => {
        
        if(!auth.currentUser) {
            dispatch(setIsLoginModalOpen(true))
            return
        }else if (auth.currentUser && isPostDownVoted == false && isPostUpVoted === false) {
            try {
                const userRef = doc(db, "users", user?.uid as string)
                console.log(`-- downvoteThePost is running ---`);
    
                // ---- Updating User => Adding user to upvotedPostsID array ----
                await updateDoc(userRef, {
                    upvotedPostsID: arrayRemove(postData.postID)
                })
    
                // ---- Removing user from Post's upvotedByUserID array ----
                await updateDoc(postRef, {
                    upvotedByUserID: arrayRemove(user?.uid)
                })
    
                // ---- Adding ID to user from downvotedPostsID array ----
                await updateDoc(userRef, {
                    downvotedPostsID: arrayUnion(postData?.postID)
                })
    
                // ---- Updating Post ----
                await updateDoc(postRef, {
                    downvotedByUserID: arrayUnion(user?.uid)
                })
    
                setIsPostDownVoted(true)
                setIsPostUpvoted(false)
                setPostUpvotedDownvotedValue(postUpvotedDownvotedValue - 1)
            } catch (error) {
                console.log(error);
                setIsPostUpvoted(false)
            }

        } else if (auth.currentUser && isPostDownVoted == true && isPostUpVoted === false) {
            const userRef = doc(db, "users", user?.uid as string)
            console.log("un-downvoted")
            await updateDoc(postRef, {
                downvotedByUserID: arrayRemove(user?.uid)
            })

            await updateDoc(userRef, {
                downvotedPostsID: arrayRemove(postData.postID)
            })

            setIsPostDownVoted(false)
        }
    }


    const checkVoteStatus = () => {
        // console.log(`checkVoteStatus is running`);
        
        const upvotedArray = postData?.upvotedByUserID?.includes(user?.uid as string)
        console.log(`upvotedArray -> ` + upvotedArray);
        
        upvotedArray ? setIsPostUpVoted(true) : setIsPostUpVoted(false)
        
        
        const downvotedArray = postData.downvotedByUserID?.includes(user?.uid as string)
        console.log(`downvotedArray -> ` + downvotedArray);
        downvotedArray ? setIsPostDownVoted(true) : setIsPostDownVoted(false)
    }

    const getPostCommunity = async () => {
        const communityRef = doc(db, "communities", postData?.postCreateAtCommunityID)
        const communityData = await getDoc(communityRef)
        setPostCommunityData([communityData.data() as ICommunityData])
        
    }

    useEffect(() => {
        getPostCommunity()
        checkVoteStatus()
    },[isPostDownVoted, isPostUpVoted])

  return (
    <div className='w-full sm:w-[90%] md:w-[70%] lg:w-[60%] aspect-square bg-lightColor rounded-md m-3 flex flex-col justify-start items-center space-y-3 py-3 px-3 border-b border-b-midColor sm:border-0 sm:shadow-lg sm:shadow-midColor mb-4' onClick={() => {
        console.log(postData)
    } }>

        {/* Header */}
        {true && (
            <div className='w-full flex justify-start items-center space-x-3 rounded-md'>
                {at === "homePage" && (
                    <div className='hover:cursor-pointer'>
                        <Link href={`place/${postData.postCreateAtCommunityID}`}> <Image src={offstaLogo} width={10} height={10} alt="logo" className='w-10 h-10 rounded-full'/> </Link> 
                    </div>
                )}

                <div className='flex flex-col justify-start items-start space-y-1 flex-1'>
                    {at === "homePage" && <Link href={`place/${postData.postCreateAtCommunityID}`}> <p className='text-base font-poppins font-normal'> {postCommunityData[0]?.communityName}</p> </Link>}
                    <div className='flex justify-start items-center space-x-2 '>
                        <p className='text-xs font-poppins font-normal'>posted by {postData.postCreatorName} </p>
                        <p className='text-xs font-poppins font-normal'> 5 days ago </p>
                    </div>
                </div>

                {!currentUserData?.communitiesJoinedID?.includes(postData?.postCreateAtCommunityID) && (
                    <button
                    type='button'
                    className='bg-brandColor text-lightColor font-poppins text-sm px-4 py-1 rounded-sm'
                    onClick={() => {
                        if(!auth.currentUser) {
                            dispatch(setIsLoginModalOpen(true))     
                        } else {
                            alert("JOINED !!!")
                        }
                    }}
                    >
                        Join
                    </button>
                )}

                {postData && postData.postCreatorID === user?.uid && (
                    <PostExtraOptions postID={postData?.postID as string} postCreatorID={postData?.postCreatorID} postCreateAtCommunityID={postData.postCreateAtCommunityID} />
                )}
            </div>
        )}


        {/* Title */}
        <div className='w-full flex justify-start items-center flex-wrap'>
            <h2 className='text-xl font-medium font-poppins'> {postData?.postTitle} </h2>
        </div>

        {/* Caption */}
        {postData?.postCaption && (
            <div className='w-full flex justify-start items-center '>
                {postData?.postCaption.length > 750 && isPostFullyExtended === false && <p className='text-darkColor font-poppins' onClick={() => setIsPostFullyExtended(!isPostFullyExtended)}> {postData?.postCaption?.slice(0,750)}....... </p>}

                {isPostFullyExtended === true && <p className='text-darkColor font-poppins' onClick={() => setIsPostFullyExtended(!isPostFullyExtended)}> {postData?.postCaption} </p>}
            </div>
        )}

        {/* Image */}
        {postData?.postImageURL ? (
            <div className='w-full flex justify-center items-center bg-red-900'>
                <Image src={postData?.postImageURL} alt="image" className='aspect-auto rounded-sm' width={300} height={300} layout={"responsive"} onClick={() => console.log(`isPostUpvoted => ${isPostUpvoted} , isPostDownvoted => ${isPostDownVoted}`)}/>
            </div>
        ) : null}

        {/* Video */}
        {postData?.postVideoURL && (
            <div className='w-full'>
                <video src={postData?.postVideoURL} controls ></video>
            </div>
        )}


        {/* options */}
        <div className='w-full flex justify-start items-center space-x-3 rounded-md py-3 px-3'>

            <div className='flex justify-center items-center space-x-2 px-3 py-2 bg-midColor rounded-full'>
                <BiUpvote className={ isPostUpVoted ? 'text-brandColor opacity-75 hover:cursor-pointer' : 'text-darkColor opacity-75 hover:cursor-pointer'} onClick={ upvoteThePost }/>

                <span className='text-darkColor font-poppins text-xs hover:cursor-pointer'> {postUpvotedDownvotedValue} </span>
                <BiDownvote className={ isPostDownVoted ? 'text-brandColor opacity-75 hover:cursor-pointer' : 'text-darkColor opacity-75 hover:cursor-pointer'} onClick={ downvoteThePost } />
            </div>

            <button className='flex justify-center items-center space-x-2 px-3 py-2 bg-midColor rounded-full hover:cursor-pointer' type='button'>
                <BiComment className='text-darkColor opacity-75' />
                <span className='text-darkColor font-poppins text-xs'> 0 </span>
            </button>

            <button className='flex justify-center items-center space-x-2 px-3 py-2 bg-midColor rounded-full hover:cursor-pointer' type='button'>
                <BiShareAlt className='text-darkColor opacity-75'/>
                <span className='text-darkColor font-poppins text-xs'> Share </span>
            </button>

        </div>

    </div>
  )
}

export default Post


