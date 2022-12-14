import React, {useState} from 'react'
import { useRouter } from 'next/router'
import {contentTypesArray} from "../../constants/contentTypesArray/contentTypesArray"
import axios from "axios"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCommunity = () => {
  const router = useRouter()
  const [communityNameInputValue, setCommunityNameInputValue] = useState<string>("")
  const [youtubeChannelIDvalue, setYoutubeChannelIDvalue] = useState<string>("")
  const [contentTypeValue, setContentTypeValue] = useState<string>("")
  const [channelData, setChannelData] = useState<any[]>([])
  const [isdataFetching, setIsdataFetching] = useState<boolean>(false)

  const notify = () => toast("Wow so easy!");

  const getChannelDetails = async () => {
    setIsdataFetching(true)
    try {
      const {data: {items} } = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${youtubeChannelIDvalue}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
      // const items = await axios.get(`https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${youtubeChannelIDvalue}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
      setChannelData(items)
      console.log(items);
      
      setTimeout(() => {
        setIsdataFetching(false)
      }, 2500);
      
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsdataFetching(false)
        
      }, 2500);
      
    }    
  }

  // curl \
  // 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=GoogleDevelopers&key=[YOUR_API_KEY]' \
  // --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  // --header 'Accept: application/json' \
  // --compressed


  return (
     <>
      {/* <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      /> */}
      {!isdataFetching && <div className='w-full h-[80vh] overflow-x-hidden overflow-y-scroll mt-[7vh] bg-lightColor flex flex-col justify-between md:justify-start items-center pt-5 md:pt-10 px-3 space-y-3 md:space-y-7 lg:space-y-10'>

    

      {/* <img src={channelData[0]?.snippet?.thumbnails?.default?.url} alt="" className='w-14 h-14 rounded-3xl' /> */}
        <div className='w-full flex flex-col justify-start items-center px-5 '>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-poppins font-semibold text-darkColor' onClick={() => console.log(channelData)}> Create Your Community </h1>
          <p className='text-xs font-poppins font-normal text-darkColor opacity-75 text-center my-1'> Your Community is where you and your audience hang out and interact with each other. </p>
        </div>

        <div className='w-full flex flex-col justify-center items-center px-5 space-y-2 md:space-y-5'>
          <div className='w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] flex flex-col justify-start items-startspace-y-1 py-1'>
            <label className='text-sm font-medium text-darkColor'> Community Name </label>
            <input 
              type="text" 
              placeholder='Type name.......'
              className='outline-none border-none w-full  px-2 py-2 rounded-md bg-midColor placeholder:text-darkColor placeholder:text-sm placeholder:text-opacity-50 text-darkColor'
              onChange={(e) => setCommunityNameInputValue(e.target.value)}
            />
          </div>

          <div className='w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] flex flex-col justify-start items-startspace-y-1 py-1'>
            <label className='text-sm font-medium text-darkColor'> Your YouTube Channel ID </label>
            <input 
              type="text" 
              placeholder='Paste channel ID.......'
              className='outline-none border-none w-full px-2 py-2 rounded-md bg-midColor placeholder:text-darkColor placeholder:text-sm placeholder:text-opacity-50 text-darkColor'
              onChange={(e) => setYoutubeChannelIDvalue(e.target.value)}
            />
          </div>

          <div className='w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] flex flex-col justify-start items-start space-y-1 py-1'>
            <label className='text-sm font-medium text-darkColor'> Your Content Type </label>
            <select title='choose' className='outline-none border-none w-full px-2 py-2 rounded-md bg-midColor placeholder:text-darkColor placeholder:text-sm placeholder:text-opacity-50 text-darkColor'
            value={contentTypeValue}
            onChange={(e) => setContentTypeValue(e.target.value)}
            >
              {contentTypesArray.map((contentType) => {
                return <option 
                  value={contentType.value} 
                  className='form-select bg-lightColor px-2 py-3 text-darkColor text-base'
                  > {contentType.label} </option>
              })}
              

            </select>
          </div>

          <span className='text-xs mt-5 font-poppins font-normal text-darkColor opacity-65'> By creating a community, you agree to offsta's <a href="#" className='text-blue-500 decoration-transparent'>Community Guidelines</a>. </span>
        </div>


        <div className='w-full flex flex-col justify-center items-center px-5 space-y-3 md:flex-row md:space-x-4 md:space-y-0'>
          <button
            type='button'
            className='w-[80%] sm:w-[40%] md:w-[30%] lg:w-[20%] px-4 py-2 rounded-lg bg-brandColor text-darkColor text-sm text-normal font-poppins border-b-4 border-r-4 border-b-darkColor border-r-darkColor active:border-none'
            onClick={() => getChannelDetails()}
            >
            Create Community
          </button>

          <button
            type='button'
            className='w-[50%] sm:w-[30%] md:w-[20%] lg:w-[10%] px-3 py-1 rounded-lg bg-lightColor text-darkColor text-sm text-normal font-poppins border-b-4 border-r-4 border-b-darkColor border-r-darkColor active:border-none'
            onClick={() => {
              router.push("/")
              setCommunityNameInputValue("")
              setYoutubeChannelIDvalue("")
              setContentTypeValue("")
            }}
            >
            Cancel
          </button>
        </div>

      </div>}

      {isdataFetching && (
      <div className='w-[100%] h-[100vh] fixed inset-0 flex flex-col justify-center items-center bg-lightColor space-y-5'> 
        <p className='text-4xl font-bold text-brandColor'> Building... </p>
        <AiOutlineLoading3Quarters className="w-10 h-10 text-brandColor animate-spin" />
      </div>
      )}
     </>
  )
}

export default CreateCommunity