import React, {useState, useEffect} from 'react'
import allSubreddits from 'next/link'
import HomeFeedHeader from './HomeFeedHeader/HomeFeedHeader'
import {doc, getDoc , collection, query , where, getDocs} from "firebase/firestore"
import { db } from '../../firebaseConfig'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const HomeFeed = () => {
  const userRedux = useSelector((state:any) => state.user)
  const [allSubreddits, setAllSubdreddits] = useState<any[]>([])
  const subredditCollectionRef = collection(db, "subreddits")
  
  const fetchingSubreddits = async () => {
    const subredditsCollection = await getDocs(subredditCollectionRef)
    
    setAllSubdreddits(subredditsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  }
  
  useEffect(() => {
    fetchingSubreddits()
    
  },[])

  return (
    <div 
    className='w-[100%] lg:w-[70%] h-[90vh] bg-red-900'
    >
      <HomeFeedHeader />
      <h1 className='text-xl text-center' onClick={() => console.log(userRedux)}> LOG userRedux : {userRedux?.currentUserData?.subredditsJoinedID} </h1>


      {allSubreddits && allSubreddits.map((subreddit) => {
        return (<Link href={`/r/${subreddit.id}`} key={subreddit.id}>
                    <h1 className='text-xl text-white' > {subreddit.subredditName} </h1>
                </Link> )
      })}

    </div>
  )
}

export default HomeFeed