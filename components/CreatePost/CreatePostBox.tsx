import React, {useState , useEffect} from 'react'
import dynamic from 'next/dynamic'
import {RiFileList2Line , RiImage2Fill } from "react-icons/ri"
import { TfiLink } from "react-icons/tfi"
import RichTextEditor from './RichTextEditor'


const CreatePostBox = () => {
    const [hydrated, setHydrated] = useState<boolean>(false);

    const [ uploadType, setUploadType ] = useState<string>('post')
    const [postTitleInput, setPostTitleInput ] = useState<string>("")
    const [postCaptionInput, setPostCaptionInput ] = useState<string>("")
    const [postURLInput, setPostURLInput ] = useState<string>("")
    


    useEffect(() => {
        setHydrated(true)
        console.log(`setHydrated is set to true from writeBlog  index.tsx`);
        
        
        
      },[])


    if(!hydrated) return null

  return (
    <div className='w-full bg-white h-full rounded-xl shadow-lg py-0  '>

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
                className='w-full h-full py-2 flex flex-col items-center justify-start bg-red-100 rounded-xl'
            > 
                <input
                    type="text" 
                    placeholder='Title'    
                    className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 '
                    value={postTitleInput}
                    onChange={(e) => setPostTitleInput(e.target.value)}
                />
                <RichTextEditor postCaptionInput={postCaptionInput} setPostCaptionInput={setPostCaptionInput} />

                           
            </div>
        )}
        {uploadType === "imagesAndVideo" &&  (
            <div
                className='w-full h-full py-2 flex flex-col items-center justify-start bg-red-200 rounded-xl'
            > 
                <input
                    type="text" 
                    placeholder='Title'    
                    className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 '
                    value={postTitleInput}
                    onChange={(e) => setPostTitleInput(e.target.value)}
                />
            </div>
        )}
        {uploadType === "link" &&  (
            <div
                className='w-full h-full py-2 flex flex-col space-y-2 items-center justify-start bg-red-100 rounded-xl'
            > 
                <input
                    type="text" 
                    placeholder='Title'    
                    className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 '
                    value={postTitleInput}
                    onChange={(e) => setPostTitleInput(e.target.value)}
                />

                <input
                    type="text" 
                    placeholder='Url'    
                    className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 '
                    value={postURLInput}
                    onChange={(e) => setPostURLInput(e.target.value)}
                />
            </div>
        )}
    </div>
  )
}

export default CreatePostBox