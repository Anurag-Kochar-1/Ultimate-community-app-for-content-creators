import React, {useEffect , useState} from 'react'
import { useRouter } from "next/router"
import SubredditPageLayout from '../../components/Layouts/SubredditPageLayout'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setSubreddit } from '../../redux/subredditSlice'
import RightBar from '../../components/Sidebars/RightBar/RightBar'
import TopSection from '../../components/Subbredit/SubredditHomePage/TopSection/TopSection'
import { useAuthState } from 'react-firebase-hooks/auth'
import Tabs from '../../components/Subbredit/SubredditHomePage/TopSection/Tabs'
import { useCollectionData } from "react-firebase-hooks/firestore"
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



  // ----- Getting Current Subreddit's Posts -----
  const getSubredditPostsQuery = collection(db, `subreddits/${id}/subredditPosts`)
  const [docs, loading] = useCollectionData(getSubredditPostsQuery) 
  
  


  useEffect(() => {
    if(router.isReady) {
      fetchSubreddit()
    }

    fetchSubredditMembers()
    
  }, [router.isReady])
    
  return (
    <SubredditPageLayout> 
      <main
        className='w-full h-[92vh] mt-[7vh] bg-[#EDEFF1] flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll '
      >
       <TopSection />
       <h1 className='text-4xl' onClick={() => console.log(docs)}> LOG docs  </h1>
       <Tabs />
    
      


      {loading && (
        <h1 className='text-5xl'> Loading All Posts................ </h1>
      )}

      {docs && docs.map((post) => (
        <Post key={post.postID} at={"subbredditPage"} post={post} />
      ))}







      </main>
    </SubredditPageLayout>
  )
}

export default SubredditHomePage