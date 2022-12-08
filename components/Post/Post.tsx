import React from 'react'
import {BiUpvote , BiDownvote} from "react-icons/bi"
import {MdBookmarkBorder, MdOutlineModeComment, MdOutlineShare, MdReportGmailerrorred} from "react-icons/md"
import PostExtraOptions from './PostExtraOptions'

interface IProps {
    at: string
    post: any
}

const Post = ({at , post}:IProps) => {
  return (
    <div className='w-full sm:w-[70%] md:w-[70%] lg:w-[50%] xl:w-[50%] 2xl:w-[40%] h-auto flex flex-col md:flex-row lg:flex-row md:justify-start md:items-start rounded-md bg-white my-5 md:space-x-2 hover:cursor-pointer' onClick={() => console.log(post)}>

        <div className='hidden h-full md:inline-flex flex-col items-center space-y-2 py-3 px-2 bg-[#F7F9FA] '>
            <BiUpvote className='text-gray-600 text-base m-1 hover:text-orange-600 hover:cursor-pointer rounded-sm' />
            <p className='text-gray-600 text-base'> 0 </p>
            <BiDownvote className='text-gray-600 text-base m-1 hover:text-orange-600 hover:cursor-pointer rounded-sm' />
        </div>

        <div className='w-full flex flex-col py-3 bg-white'>
            <div className='flex flex-col items-start justify-start bg-white'>
                <p className='text-xs text-gray-600'>Posted by <span> u/Anurag 19 • hours ago </span>  </p>
                <h2 className='text-base font-normal pt-1 pb-2 text-gray-900'> XYZ XYZ XYZ XYZ XYZ XYZ XYZ XYZ XYZ  </h2>
                {post?.mediaURL && (
                    <img 
                        src={post.mediaURL} 
                        alt="post-image" 
                        className='w-[90%] aspect-video my-1'
                    />
                )}
            </div>

            <div className='flex justify-start items-center space-x-4 py-2 px-1 mt-2 bg-white text-gray-600 text-base'>
                <div className='md:hidden flex justify-between items-center space-x-2 py-1 px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <BiUpvote className=''/>
                    <p> 0 </p>
                    <BiDownvote className=''/>
                </div>

                <div className='flex justify-between items-center space-x-2 py-1  px-2 hover:bg-gray-300 hover:cursor-pointer rounded-md'>
                    <MdOutlineModeComment />
                    <p> 100 <span className='hidden md:inline'> comments </span> </p>
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