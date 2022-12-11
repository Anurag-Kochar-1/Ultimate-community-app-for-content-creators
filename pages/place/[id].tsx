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
import CommunityLayout from '../../components/fullPages/Community Page/layout/CommunityLayout'
import CommunityHomePage from '../../components/fullPages/Community Page/community home page/components/CommunityHomeFeed/CommunityHomeFeed'
import LeftSidebar from '../../components/fullPages/Home/components/Sidebars/Left-Sidebar/LeftSidebar'

const SubredditHomePage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth)
  const [subredditState, setSubredditState] = useState<any[]>([])  
  const [allSubredditPosts , setAllSubredditPosts] = useState<any>([])
  const router = useRouter()
  const { id } = router.query
  
  // const subredditStateRedux = useSelector((state:any) => state.subreddit)
  
  
  const fetchSubreddit = async () => {
    const subredditRef = doc(db, "subreddits", id as string)
    const subredditDocSnap = await getDoc(subredditRef)
    setSubredditState([subredditDocSnap.data()])
    dispatch(setCommunity( subredditDocSnap.data() ))
  }

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
  


  useEffect(() => {
    if(router.isReady) {
      fetchSubreddit()
      // fetchAllPosts()
    }
    // gettingRealTimeSubreddit()

    // fetchSubredditMembers()
    
  }, [router.isReady])
    
  return (
    <CommunityLayout> 
      <main
        className='w-full h-[92vh] mt-[7vh] bg-red-300 flex flex-row justify-start items-center overflow-x-hidden overflow-y-scroll '
      >
        <LeftSidebar />
        <CommunityHomePage />
        <RightBar /> 
      </main>
    </CommunityLayout>
  )
}

export default SubredditHomePage



      {/* {allSubredditPosts && allSubredditPosts.map((post:any, index:number) => {
        return <Post key={index} at={"subbredditPage"} post={post} />
        // return <h1 className='text-5xl mt-3' onClick={() => console.log(post)} key={index}> {post.postTitle} </h1>
      })}
         */}