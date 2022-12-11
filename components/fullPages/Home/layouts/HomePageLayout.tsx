import Head from 'next/head'
import React from 'react'
import Header from '../../../globalComponents/Header/Header'

interface Props {
    children: React.ReactNode
}

const HomePageLayout = ({children}:Props) => {
  return (
    <div className='w-full max-h-screen overflow-hidden'>
        <Head>
            <title>Offsta</title>
            <meta name="description" content="the ultimate community app for content creators" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        {children}
    </div>
  )
}

export default HomePageLayout