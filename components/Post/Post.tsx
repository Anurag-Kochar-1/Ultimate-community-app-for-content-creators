import React, {useState} from 'react'
import {BiUpvote , BiDownvote} from "react-icons/bi"
import {MdBookmarkBorder, MdOutlineModeComment, MdOutlineShare, MdReportGmailerrorred} from "react-icons/md"
import PostExtraOptions from './PostExtraOptions'
import subredditDefaultLogo from "../../public/images/subredditDefaultLogo.png"
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

interface IProps {
    at: string
    post: any
}

const Post = ({at , post}:IProps) => {
    const [user] = useAuthState(auth)
    const [isPostUpVoted, setIsPostUpVoted] = useState<boolean>(false)
    const postRef = doc(db, "posts", post.postID as string)
    // const subredditRef = doc(db, "subreddits", post.)
    
    
    const upvoteThePost = async () => {
        // ---- Updating user ---- 
        const userRef = doc(db, "users", user?.uid as string )
        await updateDoc(userRef, {
            upvotedPosts: arrayUnion(post.postID)
        })

        // ---- Updating Post ----
        await updateDoc(postRef, {
            upvotedBy: arrayUnion(user?.uid)
        })

        // ---- Updating Subreddit ---- 
        // SUB COLLECTION
    }
    
    const downThePost = async () => {
        // ---- Updating user ---- 
        const userRef = doc(db, "users", user?.uid as string )
        await updateDoc(userRef, {
            upvotedPosts: arrayRemove(post.postID)
        })

        // ---- Updating Post ----
        await updateDoc(postRef, {
            upvotedBy: arrayRemove(user?.uid)
        })

    }


    const checkVoteStatus = () => {
        const up = post.upvotedBy.includes(user?.uid as string)
        up ? setIsPostUpVoted(true) : setIsPostUpVoted(false)
        console.log(isPostUpVoted);
        
    }


  return (
    <div className='w-full sm:w-[70%] md:w-[70%] lg:w-[50%] xl:w-[50%] 2xl:w-[40%] h-auto bg-white flex flex-col md:flex-row lg:flex-row md:justify-start md:items-start rounded-sm my-5 md:space-x-2 hover:cursor-pointer' onClick={() => console.log(post)}>

        <div className='hidden h-full md:inline-flex flex-col items-center space-y-2 py-3 px-2 bg-[#F7F9FA] rounded-sm'>
            <BiUpvote 
                className='text-gray-600 text-base m-1 hover:text-orange-600 hover:cursor-pointer rounded-sm' 
                onClick={upvoteThePost}
            />
            <p className='text-gray-600 text-base'> {post.upvotedBy.length - post.downvotedBy.length} </p>
            <BiDownvote 
                className='text-gray-600 text-base m-1 hover:text-orange-600 hover:cursor-pointer rounded-sm' 
                onClick={downThePost}
            />
        </div>

        <div className='w-full flex flex-col py-3 bg-white rounded-sm'>
            <div className='flex flex-col items-start justify-start bg-white'>
                {at == "subbredditPage" && <p className='text-xs text-gray-600 bg-yellow-300 px-1 md:px-2'>Posted by <span> u/Anurag 19 • hours ago </span>  </p>}

                {at == "homepage" && (
                    <div className='flex flex-row w-full justify-between items-center bg-red-200 text-sm px-1 md:px-2 py-1' >
                        <div className='flex flex-row items-center justify-start'>
                            <Image src={post?.postedAtSubbredditLogo || subredditDefaultLogo} width={7} height={7} alt="logo" className='h-7 w-7 rounded-full aspect-square bg-red-600' />

                            <div className='flex flex-col md:flex-row md:space-x-2 pl-2'>
                                <p> r/{post.postedAtSubbredditName} </p>
                                <p> u/anuragg <span> • hours ago </span> </p>
                            </div>
                        </div>

                        <button
                            type='button'
                            className='px-4 py-1 rounded-full bg-[#0079D3] text-white text-xs font-medium'
                        > JOIN </button>
                    </div>
                )}
                <h2 className='text-base font-normal pt-1 pb-2 text-gray-900'> {post.postTitle}  </h2>
                {post?.mediaURL && (
                    <div className='flex justify-center items-center'>
                        <img 
                        src={post.mediaURL} 
                        alt="post-image" 
                        className='w-[90%]  my-1'
                        />
                    </div>
                )}
            </div>

            <div className='flex justify-start items-center space-x-4 py-2 px-1 mt-2 bg-white text-gray-600 text-base '>
                <div className='md:hidden flex justify-between items-center space-x-2 py-1 px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <BiUpvote 
                        className=''
                        onClick={upvoteThePost}
                    />

                    <p> 0 </p>
                    <BiDownvote 
                        className=''
                        onClick={downThePost}
                    />
                </div>

                <div className='flex justify-between md:justify-center items-center space-x-2 py-1  px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <MdOutlineModeComment />
                    <p> {post.comments.length || null} <span className='hidden md:inline'> comments </span> </p>
                </div>

                <div className='flex justify-between items-center space-x-2 py-1 px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <MdOutlineShare />
                    <p>Share</p>
                </div>

                <div className='hidden md:inline-flex justify-between items-center space-x-2 py-1 px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <MdBookmarkBorder />
                    <p> Save </p>
                </div>

                <div className='flex justify-between items-center md:hidden space-x-2 py-1 px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <MdReportGmailerrorred/>
                    <p className='hidden sm:inline'> Report </p>
                </div>

                <div className='hidden md:inline'>
                    <PostExtraOptions />
                </div>
            </div>
        </div>

    </div>
  )
}

export default Post