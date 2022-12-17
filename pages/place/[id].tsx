import React, {useEffect , useState} from 'react'
import { useRouter } from "next/router"
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { connect, useDispatch, useSelector } from 'react-redux'
import RightBar from '../../components/fullPages/Home/components/Sidebars/Right-Sidebar/RightSideBar'
import TopSection from '../../components/fullPages/Community Page/components/TopSection/TopSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import Tabs from '../../components/fullPages/Community Page/components/CommunityTabs/CommunityTabs'
import { useCollectionData, useCollectionDataOnce, useDocumentData } from "react-firebase-hooks/firestore"
import Post from '../../components/globalComponents/Post/Post'
// import CommunityLayout from '../../components/fullPages/Community Page/layout/CommunityLayout'
import CommunityHomePage from '../../components/fullPages/Community Page/community home page/components/CommunityHomeFeed/CommunityHomeFeed'
import LeftSidebar from '../../components/fullPages/Home/components/Sidebars/Left-Sidebar/LeftSidebar'
import { GetServerSideProps } from 'next'
import { ICommunity } from '../../customTypesAndInterfaces/communityInterfaces'

import communitySlice, { setCommunity } from '../../redux/slices/communitySlice'
import {  wrapper } from '../../redux/store'
import CommunityLayout from '../../components/fullPages/Community Page/layout/CommunityLayout'
// import {store} from "../../redux/store"

interface IProps {
  communityData: ICommunity
}

const SubredditHomePage = ( props:IProps ) => {
  console.log(props);
  
  
  const dispatch = useDispatch();
  const [user] = useAuthState(auth)
  const [subredditState, setSubredditState] = useState<any[]>([])  
  const [allSubredditPosts , setAllSubredditPosts] = useState<any>([])
  const router = useRouter()
  const { id } = router.query
  
  
  


  // ---- Fetching current subreddit's members ---- 
  // const fetchSubredditMembers = () => {
  //   subredditStateRedux?.communityData?.members?.forEach((userID:any) => {
  //     const memberRef = doc(db, "users", userID)
  //     getMember(memberRef)
  //   })
    
  // }
  // const getMember = async(ref: any) => {
  //   const memberData = await getDoc(ref)
  //   // console.log(memberData.data());
  //   // console.log(`member ID : ${memberData.id}`);
  // }

  // const gettingRealTimeSubreddit = () => {
  //   const realTimeSub = onSnapshot(doc(db, "subreddits", id as string), (doc) => {
  //     console.log(doc.data());
  //   })
  // }



  // ----- Getting Current Subreddit's Posts -----
    
    // const fetchAllPosts = async () => {
    //   const postsCubCollection = collection(db, `subreddits/${id as string}/subredditPosts`)
    //   const data = await getDocs(postsCubCollection)
    //   setAllSubredditPosts(data?.docs.map((doc) => ({ ...doc.data(), postID: doc.id })));
      
    // }
  


  // useEffect(() => {
  //   if(router.isReady) {
  //     // fetchSubreddit()
  //     // getCommunity()
  //     // fetchAllPosts()
  //   }
  //   // gettingRealTimeSubreddit()

  //   // fetchSubredditMembers()
    
  // }, [router.isReady])

  const REDUXSTATE = useSelector((state: any) => state.community);
    
  return (
      <CommunityLayout>
        <main className='w-[100%] bg-lightColor flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll space-y-3 '>

        </main>

      </CommunityLayout>
  )
}

export default SubredditHomePage





export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, params }) => {
  const {id}:string|any = params
    const communityRef = doc(db, "communities", id as string)
    const response = await getDoc(communityRef)

  // console.log('store state on the server before dispatch', store.getState());
  // const communityData = query.data || 'page data';
  // store.dispatch( setCommunity([response.data()]) );
  store.dispatch(setCommunity(response.data()))
  // console.log('store state on the server after dispatch', store.getState());

  return {
    props: {}
  };
});


