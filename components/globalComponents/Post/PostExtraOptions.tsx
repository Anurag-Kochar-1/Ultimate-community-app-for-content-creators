import React from 'react'
import {RiHomeLine} from "react-icons/ri"
import {IoIosAdd} from "react-icons/io"
import { BsBookmark, BsFillArrowUpRightCircleFill} from "react-icons/bs"
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { auth, db } from "../../../firebaseConfig"
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHide } from 'react-icons/bi'

import {BiDotsVerticalRounded , BiDotsHorizontal} from "react-icons/bi"
import {AiOutlineDelete , AiOutlineEdit} from "react-icons/ai"
import { HiOutlineBookmark } from 'react-icons/hi'
import { doc, deleteDoc, updateDoc, arrayRemove} from 'firebase/firestore'

interface IProps {
  postID: string
  postCreatorID: string
  postCreateAtCommunityID: string
}


export default function PostExtraOptions ( {postID, postCreatorID, postCreateAtCommunityID}: IProps) {
  const [user] = useAuthState(auth);
  const [ filterInput , setFilterInput ] = useState<string>("")


  const deletePost = async () => {
    if(postCreatorID === user?.uid) {
      const postDocRef = doc(db, "posts", postID)
      const userRef = doc(db, "users", user?.uid as string)
      const communityDocRef = doc(db, "communities", postCreateAtCommunityID as string) 
      
      // deleting post
      await deleteDoc(postDocRef)

      // updating user
      await updateDoc(userRef, {
        createdPostsID: arrayRemove(postID),
        upvotedPostsID: arrayRemove(postID),
        downvotedPostsID: arrayRemove(postID)
      })

      // updating community' posts array
      await updateDoc(communityDocRef, {
        postsID: arrayRemove(postID)
      })

      console.log(` **** Post DELETED **** `);

    }
  }
  

  return (
    <div className="text-right">
      <Menu as="div" className="w-full relative inline-block text-left px-0">
        <div>
          <Menu.Button className="inline-flex bg-lightColor lg:bg-none w-full justify-between space-x-1 items-center rounded-md box-border px-1 py-2 text-sm font-medium text-white">


              <div className='flex justify-between items-center space-x-1'>
                <BiDotsVerticalRounded className='inline-block w-5 h-5 text-black hover:cursor-pointer' />
                {/* <BiDotsHorizontal className='inline-block md:hidden w-5 h-5 text-black hover:cursor-pointer'/> */}
              </div>
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
          
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">

            <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={`${
                      active ? 'bg-brandColor text-white' : 'text-gray-900'
                    } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <div className='w-full flex'>
                        {active ? (
                        <AiOutlineDelete
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <AiOutlineDelete
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        )}
                            <p> Delete </p>
                    </div>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={`${
                      active ? 'bg-brandColor text-white' : 'text-gray-900'
                    } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <div className='w-full flex'>
                        {active ? (
                        <HiOutlineBookmark
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <HiOutlineBookmark
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        )}
                            <p> Save </p>
                    </div>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={`${
                      active ? 'bg-brandColor text-white' : 'text-gray-900'
                    } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <div className='w-full flex'>
                        {active ? (
                        <AiOutlineEdit
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <AiOutlineEdit
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        )}
                            <p> Edit </p>
                    </div>
                  </button>
                )}
              </Menu.Item>

            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

