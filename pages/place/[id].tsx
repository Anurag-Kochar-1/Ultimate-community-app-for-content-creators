import React, {useEffect , useState} from 'react'
import { useRouter } from "next/router"
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setCommunity } from '../../redux/slices/communitySlice'
import RightBar from '../../components/fullPages/Home/components/Sidebars/Right-Sidebar/RightSideBar'
import TopSection from '../../components/fullPages/Community Page/components/TopSection/TopSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import Tabs from '../../components/fullPages/Community Page/components/Tabs/Tabs'
import { useCollectionData, useCollectionDataOnce, useDocumentData } from "react-firebase-hooks/firestore"
import Post from '../../components/globalComponents/Post/Post'
// import CommunityLayout from '../../components/fullPages/Community Page/layout/CommunityLayout'
import CommunityHomePage from '../../components/fullPages/Community Page/community home page/components/CommunityHomeFeed/CommunityHomeFeed'
import LeftSidebar from '../../components/fullPages/Home/components/Sidebars/Left-Sidebar/LeftSidebar'
import { GetServerSideProps } from 'next'
import { ICommunity } from '../../customTypesAndInterfaces/communityInterfaces'


interface IProps {
  communityData: ICommunity
}

const SubredditHomePage = ( props:IProps ) => {
  // console.log(props);
  
  
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
    
  return (
    // <CommunityLayout> 
      <main
        className='w-full h-[93vh] mt-[7vh] bg-red-300 flex flex-row justify-start items-center overflow-x-hidden overflow-y-scroll '
      >
        <LeftSidebar />
        <CommunityHomePage communityData={props.communityData} />
        <RightBar /> 
      </main>
    // </CommunityLayout>
  )
}

export default SubredditHomePage



export const getServerSideProps:GetServerSideProps = async (context) => {
  const {params} = context
  const {id}:string|any = params
  const communityRef = doc(db, "communities", id as string)
  const response = await getDoc(communityRef)
  
  return {
    props: {
      communityData : response.data()
    }
  }
}