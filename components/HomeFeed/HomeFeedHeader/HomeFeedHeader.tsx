import React from 'react'

const HomeFeedHeader = () => {
  return (
    <div 
    className='w-[100%] h-[7vh] flex justify-between items-center bg-red-200'
    >
        <h3>Popular</h3>

        <div className='flex'>
            <p>Hot</p>
            <p>New</p>
            <p>Top</p>
            <p>Controversial</p>
            <p>Rising</p>
        </div>
    </div>
  )
}

export default HomeFeedHeader