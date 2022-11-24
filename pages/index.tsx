import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CreateCommunityModal from '../components/Community/Create/CreateCommunityModal'
import HomePage from '../components/Full pages/HomePage/HomePage'
import Header from '../components/Header/Header'
import HomePageLayout from '../components/Layouts/HomePageLayout'

const Home: NextPage = () => {
  return (
    
    <HomePageLayout>
      <HomePage />
    </HomePageLayout>
  )
}

export default Home
