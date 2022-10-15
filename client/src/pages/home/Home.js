import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import './home.css'
function Home() {
  return (
    <>
    <Topbar/>
    <div className='homecontainer'> 
        <Sidebar/>
        <Feed/>
        <Rightbar/> 
    </div>
    </>
  )
}

export default Home