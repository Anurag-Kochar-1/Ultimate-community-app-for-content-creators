import React, {useState , useEffect} from 'react'
import dynamic from 'next/dynamic'
import {RiFileList2Line , RiImage2Fill } from "react-icons/ri"
import { TfiLink } from "react-icons/tfi"
import RichTextEditor from './RichTextEditor'
import {storage} from "../../firebaseConfig"
import { ref , uploadBytes , getDownloadURL} from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

import { useUploadFile , useDownloadURL  } from 'react-firebase-hooks/storage';


const CreatePostBox = () => {
    const [hydrated, setHydrated] = useState<boolean>(false);
    const [uploadFile, uploading, snapshot, error] = useUploadFile();


    const [ uploadType, setUploadType ] = useState<string>('post')
    const [postTitleInput, setPostTitleInput ] = useState<string>("")
    const [postCaptionInput, setPostCaptionInput ] = useState<string>("")
    const [postURLInput, setPostURLInput ] = useState<string>("")
    const [postMedia, setPostMedia] = useState<any>(null)
    
    const uploadMedia = async () => {
        console.log(postMedia);
        if(postMedia == null) {
            alert("upload image or video")
            return
        }
        const imageRef = ref(storage, `post/${postMedia.name + uuidv4()}`)
        // const data = await uploadBytes(imageRef, postMedia)
        // const snapshot =  await getDownloadURL(data.ref)
        // console.log(snapshot);
        
        const result = await uploadFile(imageRef, postMedia , {
            contentType: 'image/jpeg'
        })
        // alert(`Result: ${JSON.stringify(result)}`)
        console.log(result);
        

        
    }



    useEffect(() => {
        setHydrated(true)
        // console.log(`setHydrated is set to true from writeBlog  index.tsx`);
        
        
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
                        
                        className='px-4 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
                    > Post </button>
                </div>

                           
            </div>
        )}

        {uploadType === "imagesAndVideo" &&  (
            <div
            className='w-full h-full  flex flex-col items-center justify-between space-y-2 bg-red-100 rounded-xl py-5'
            > 
            <div className='w-full flex flex-col justify-center items-center space-y-2'>
                <input
                    type="text" 
                    placeholder='Title'    
                    className='w-[90%] h-12 outline-none border border-gray-200 rounded-md px-3 placeholder:text-gray-600 focus:border focus:border-gray-400'
                    value={postTitleInput}
                    onChange={(e) => setPostTitleInput(e.target.value )}
                />
                
                <div className='w-[90%] h-40 bg-red-200 flex justify-center items-center outline-none border border-gray-200 rounded-md'>
                    <input 
                        type="file"
                        className='px-3 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
                        onChange={(e) => setPostMedia(e?.target?.files)}
                    />
                    <button
                        onClick={uploadMedia}
                    > Upload </button>
                </div>
                
            </div>

            <div className='w-full flex justify-end items-center px-5 py-1'>
                <button
                    
                    className='px-4 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
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
                    
                    className='px-4 py-1 border-none outline-none bg-[#0079D3] rounded-full text-white font-medium text-base'
                > Post </button>
            </div>

                       
        </div>
        )}
    </div>
  )
}

export default CreatePostBox