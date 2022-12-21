import React, {useState, useEffect} from 'react'
import allSubreddits from 'next/link'
import {doc, getDoc , collection, query , where, getDocs} from "firebase/firestore"
import { auth, db } from '../../../../../firebaseConfig'
import Link from 'next/link'
// import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import Post from '../../../../globalComponents/Post/Post'
// import { RootState } from '../../../../../redux/store'
import { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'
import { IAllSlicesState } from '../../../../../customTypesAndInterfaces/allSlicesState'
import { ICommunity, ICommunityData } from '../../../../../customTypesAndInterfaces/communityInterfaces'
import { IAllData } from '../../../../../customTypesAndInterfaces/allData'
import { IPost } from '../../../../../customTypesAndInterfaces/post'
// import { AppState } from '../../../../../redux/store'

const HomeFeed = ( ) => {
  const allCommunitiesData = useSelector((state:IAllSlicesState) => state.community.allCommunitiesData)
  const allPostsRedux = useSelector((state: IAllSlicesState) => state.posts.allPostsData)
  const userData = useSelector((state: IAllSlicesState) => state.user)

  const [user] = useAuthState(auth)
  const [allSubreddits, setAllSubdreddits] = useState<any[]>([])
  const [allPosts, setAllPosts] = useState<any>([])
  // const userDetailsRedux = useSelector((state:any) => state.user)
  // const allPostsDataRedux = useSelector((state:any) => state.posts)

  const subredditCollectionRef = collection(db, "subreddits")
  const postCollectionRef = collection(db, 'posts')
  
  // const { allPostsData } = useSelector((state:RootState) => state.posts)
  
  const fetchingSubreddits = async () => {
    const subredditsCollection = await getDocs(subredditCollectionRef)
    setAllSubdreddits(subredditsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  }

  const fetchingPosts = async() => {
    const allPostsData = await getDocs(postCollectionRef)
    allPostsData.docs.forEach((post) => {
    })

    setAllPosts(allPostsData?.docs.map((doc) => ({ ...doc.data(), postID: doc.id })));
    
  }

  

  
  useEffect(() => {
    fetchingSubreddits()
    fetchingPosts()
  },[])

  return (
    <div 
    className='w-full h-full  flex flex-col justify-start items-center bg-lightColor overflow-x-hidden overflow-y-scroll pb-96'
    >
      <h1 className='text-xl text-center text-darkColor' onClick={() => console.log(allPostsRedux)}> LOG ALL POSTS  </h1>
      <h1 className='text-xl text-center text-darkColor' onClick={() => console.log(userData?.currentUserData)}> LOG USER REDuX </h1>
      {/* <h1 className='text-xl text-center text-yellow-800' onClick={() => console.log(allCommunitiesData)}> LOG ALL Communities  </h1> */}


    {allCommunitiesData &&  allCommunitiesData.map((community:ICommunityData) => {
      return <Link key={community.communityID} className='px-5 py-1 rounded-md bg-gray-600 text-white my-2' href={`/place/${community.communityID}`}> {community.communityName} </Link>
    })}

    {allPostsRedux && allPostsRedux?.map((post: IPost) => {
      return <Post at={"homePage"} postData={post} key={post.postID}/>
    })}

    </div>
  )
}

export default HomeFeed
