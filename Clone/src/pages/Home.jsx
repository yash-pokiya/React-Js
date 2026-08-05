import React from 'react'
import HeroText from '../components/HeroText'
import WorkProfile from '../components/WorkProfile'
import Clients from '../components/Clients'
import Progress from '../components/Progress'
import Introduction from '../components/Introduction'
import CaseStudy from '../components/CaseStudy'
import MyServices from '../components/MyServices'
import FeedBack from '../components/FeedBack'

const Home = () => {
  return (
    <>
        <HeroText/>
        <WorkProfile/>
        <Clients/>
        <Progress/>
        <Introduction/>
        <CaseStudy/>
        <MyServices/>
        <FeedBack/>
    </>
  )
}

export default Home