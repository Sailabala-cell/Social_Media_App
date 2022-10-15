import React , {useState,useEffect} from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import './profile.css'
import axios from 'axios'
import {useParams} from "react-router"

function Profile() {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser]=useState({})
  const username= useParams().username
  
  useEffect(() => {
    const fetchUsers=async ()=>{
     const res=await axios.get(`/users?username=${username}`)
     setUser(res.data)
     console.log(res.data)
    }
    fetchUsers()
  },[username])
  return (
    <>
   <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : PF+'person/cover.png' }
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + user.profilePicture : PF+'person/avatar.jpg'}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar key={user._id} user={user}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile