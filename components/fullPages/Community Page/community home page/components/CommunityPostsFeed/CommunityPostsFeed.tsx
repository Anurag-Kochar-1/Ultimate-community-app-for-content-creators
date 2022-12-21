import React from 'react'
import Tabs from '../../../components/CommunityTabs/CommunityTabs'
import TopSection from '../../../components/TopSection/TopSection'
import { ICommunity } from '../../../../../../customTypesAndInterfaces/communityInterfaces'
import CommunityLayout from '../../../layout/CommunityLayout'
import { IPost } from '../../../../../../customTypesAndInterfaces/post'
import Post from '../../../../../globalComponents/Post/Post'

interface IProps {
  communityPosts: IPost[]
}

const CommunityPostsFeed = ( {communityPosts}:IProps ) => {
  return (
    <>
      <div className='w-full flex flex-col justify-start items-center'>
        {communityPosts &&  communityPosts?.map((post) => (
          <Post at='communityHomePage' postData={post} key={post.postID} />
        ))}

      </div>
    </>
  )
}

export default CommunityPostsFeed