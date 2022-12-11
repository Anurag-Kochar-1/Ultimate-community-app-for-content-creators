import React, {Fragment} from 'react'
import {RiHomeLine} from "react-icons/ri"
import {IoIosAdd} from "react-icons/io"
import { AiOutlineMenu } from "react-icons/ai"
import { BsFillArrowUpRightCircleFill} from "react-icons/bs"
import { Menu, Transition } from '@headlessui/react'
import {  useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../../../firebaseConfig'

interface IProps {
  selectedCommunity : any[]
  setSelectedCommunity : React.Dispatch<React.SetStateAction<any[]>>
  selectedCommunity2 : any[]
  setSelectedCommunity2 : React.Dispatch<React.SetStateAction<any[]>>
}

export default function ChooseCommunityDropdown ({selectedCommunity, setSelectedCommunity , selectedCommunity2 ,setSelectedCommunity2}:IProps) {
  const [user , loading, error] = useAuthState(auth)
  const [userJoinedSubredditsState , setUserJoinedSubredditsState] = useState<any[]>([])
  const subbreditCollectionRef = collection(db, "subreddits")

  const fetchUserJoinedSubbredit = async () => {
    if(!loading && user) {
      const queryUser = query(subbreditCollectionRef, where("members" , "array-contains", user?.uid as string))
      
      const queryUserJoinedSubreddits = await getDocs(queryUser)
      // queryUserJoinedSubreddits.forEach((doc) => {
      //   console.log(doc.data());
      //   setUserJoinedSubredditsState([])
      // })
      setUserJoinedSubredditsState(queryUserJoinedSubreddits.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    }
    
  }

  useEffect(() => {
    fetchUserJoinedSubbredit()
  }, [user])

  const obas:object  = {name: "sad" , asdasd : "123"}
  return (
    <div className="w-full text-right ">
      <Menu as="div" className="w-full relative inline-block text-left px-0">
        <div>
          <Menu.Button className="inline-flex bg-[#F5F6F8] lg:bg-none w-full justify-between space-x-3 items-center rounded-md hover:border hover:border-gray-200 box-border px-1 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">

            {/* <AiOutlineMenu className='md:hidden w-4 h-4 text-black' /> */}

              <div className='flex justify-between items-center space-x-3'>
                <RiHomeLine className='hidden md:inline-block w-auto h-4 text-black'/>
                <p className=' text-black font-medium text-sm'> Choose a community </p>
              </div>

            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-gray-400 "
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 bg-red-800">

              {/* <div className='w-full flex justify-center items-center py-2'>
                <input 
                  type="text" 
                  placeholder='Filter' 
                  className='w-[90%] h-8 px-2 rounded-sm border-none outline-none bg-[#F5F6F8] '
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                  />
              </div> */}

              {/* <Menu.Item>
                <div className='w-full flex justify-center items-center py-2'>
                  <button 
                    type='button'
                    className='w-[90%] h-8 flex justify-start items-center space-x-2 px-3 rounded-sm border-none outline-none bg-[#F5F6F8] hover:cursor-pointer'
                    onClick={openModal}
                  >
                    <IoIosAdd />
                    <p className='text-sm'> Create a community </p>
                  </button>
                
                </div>
              </Menu.Item> */}
              

              {userJoinedSubredditsState && userJoinedSubredditsState.map((subreddit) => (
                <div 
                  key={subreddit.subredditID}
                  className='flex-1 h-full bg-emerald-200 hover:cursor-pointer my-3'
                  onClick={() => setSelectedCommunity2([ subreddit ]) }
                  > 
                {subreddit.subredditName} 
                </div>
              ))}


  
            

            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

