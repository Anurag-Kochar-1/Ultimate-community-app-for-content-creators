import React, {useState} from 'react'
import { useRouter } from 'next/router'

const contentTypesArray =  [
  {
    value: "choose",
    lable: "Choose"
  },
  {
    value: "gaming",
    label: "Gaming"
  },
  {
    value: "roasting",
    label: "Roasting"
  },
  {
    value: "commentary",
    label: "Commentary"
  },
  {
    value: "education",
    label: "Education"
  },
  {
    value: "vlogging",
    label: "Vlogging"
  },
  {
    value: "sports",
    label: "Sports"
  },
  {
    value: "Comedy",
    label: "Comedy"
  },
  {
    value: "coding",
    label: "Coding"
  },
  {
    value: "travel",
    label: "Travel"
  },
  {
    value: "selfHelp",
    label: "Self Help"
  },
  {
    value: "motivational",
    label: "Motivational"
  },
  {
    value: "finance",
    label: "Finance"
  },
  {
    value: "other",
    label: "other"
  },
]

const CreateCommunity = () => {
  const router = useRouter()
  const [communityNameInputValue, setCommunityNameInputValue] = useState<string>("")
  const [youtubeChannelURLvalue, setYoutubeChannelURLvalue] = useState<string>("")
  const [contentTypeValue, setContentTypeValue] = useState<string>("")


  return (
    <div className='w-full h-[80vh] overflow-x-hidden overflow-y-scroll mt-[7vh] bg-lightColor flex flex-col justify-between md:justify-start items-center pt-5 md:pt-10 px-3 space-y-3 md:space-y-7 lg:space-y-10'>

      <div className='w-full flex flex-col justify-start items-center px-5 '>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-poppins font-semibold text-darkColor'> Create Your Community </h1>
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
          <label className='text-sm font-medium text-darkColor'> Your YouTube Channel URL </label>
          <input 
            type="text" 
            placeholder='Paste channel URL.......'
            className='outline-none border-none w-full px-2 py-2 rounded-md bg-midColor placeholder:text-darkColor placeholder:text-sm placeholder:text-opacity-50 text-darkColor'
            onChange={(e) => setYoutubeChannelURLvalue(e.target.value)}
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
          >
          Create Community
        </button>

        <button
          type='button'
          className='w-[50%] sm:w-[30%] md:w-[20%] lg:w-[10%] px-3 py-1 rounded-lg bg-lightColor text-darkColor text-sm text-normal font-poppins border-b-4 border-r-4 border-b-darkColor border-r-darkColor active:border-none'
          onClick={() => {
            router.push("/")
            // setCommunityNameInputValue("")
            // setYoutubeChannelURLvalue("")
            // setContentTypeValue("")
          }}
          >
          Cancel
        </button>
      </div>

    </div>
  )
}

export default CreateCommunity