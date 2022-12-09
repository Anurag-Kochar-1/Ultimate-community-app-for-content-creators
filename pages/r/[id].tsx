import React, {useEffect , useState} from 'react'
import { useRouter } from "next/router"
import SubredditPageLayout from '../../components/Layouts/SubredditPageLayout'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setSubreddit } from '../../redux/subredditSlice'
import RightBar from '../../components/Sidebars/RightBar/RightBar'
import TopSection from '../../components/Subbredit/SubredditHomePage/TopSection/TopSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import Tabs from '../../components/Subbredit/SubredditHomePage/TopSection/Tabs'
import { useCollectionData, useCollectionDataOnce, useDocumentData } from "react-firebase-hooks/firestore"
import Post from '../../components/Post/Post'

const SubredditHomePage = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth)
  const [subredditState, setSubredditState] = useState<any[]>([])  
  const [allSubredditPosts , setAllSubredditPosts] = useState<any>([])
  const router = useRouter()
  const { id } = router.query
  
  const subredditStateRedux = useSelector((state:any) => state.subreddit)
  
  
  const fetchSubreddit = async () => {
    const subredditRef = doc(db, "subreddits", id as string)
    const subredditDocSnap = await getDoc(subredditRef)
    // console.log(`subredditDocSnap.id : ${subredditDocSnap.id}`);
    setSubredditState([subredditDocSnap.data()])
    dispatch(setSubreddit( subredditDocSnap.data() ))
  }

  // ---- Fetching current subreddit's members ---- 
  const fetchSubredditMembers = () => {
    subredditStateRedux?.subredditData?.members?.forEach((userID:any) => {
      const memberRef = doc(db, "users", userID)
      getMember(memberRef)
    })
    
  }
  const getMember = async(ref: any) => {
    const memberData = await getDoc(ref)
    // console.log(memberData.data());
    // console.log(`member ID : ${memberData.id}`);
  }

  const gettingRealTimeSubreddit = () => {
    const realTimeSub = onSnapshot(doc(db, "subreddits", id as string), (doc) => {
      console.log(doc.data());
    })
  }



  // ----- Getting Current Subreddit's Posts -----
 
    // const getSubredditPostsQuery = collection(db, `subreddits/${id as string}/subredditPosts`)
    // const [docs, loading, error] = useCollectionData(getSubredditPostsQuery) 
    
    const fetchAllPosts = async () => {
      const postsCubCollection = collection(db, `subreddits/${id as string}/subredditPosts`)
      const data = await getDocs(postsCubCollection)
      setAllSubredditPosts(data?.docs.map((doc) => ({ ...doc.data(), postID: doc.id })));
      
    }
  




  useEffect(() => {
    if(router.isReady) {
      fetchSubreddit()
      fetchAllPosts()
    }
    // gettingRealTimeSubreddit()

    fetchSubredditMembers()
    
  }, [router.isReady])
    
  return (
    <SubredditPageLayout> 
      <main
        className='w-full h-[92vh] mt-[7vh] bg-[#EDEFF1] flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll '
      >
       <TopSection />
       <h1 className='text-4xl' onClick={() => console.log(allSubredditPosts)}> LOG allSubredditPosts  </h1>
       {/* <h1 className='text-4xl' onClick={() => gettingRealTimeSubreddit()}> LOG gettingRealTimeSubreddit  </h1> */}
       <Tabs />
    
      


      {/* {loading && (
        <h1 className='text-5xl'> Loading All Posts................ </h1>
      )} */}

      {allSubredditPosts && allSubredditPosts.map((post:any, index:number) => {
        return <Post key={index} at={"subbredditPage"} post={post} />
        // return <h1 className='text-5xl mt-3' onClick={() => console.log(post)} key={index}> {post.postTitle} </h1>
      })}
        
      

   







      </main>
    </SubredditPageLayout>
  )
}

export default SubredditHomePage