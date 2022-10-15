import React from 'react'
import './useronline.css'
function Useronline({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className='friendsimage'>
        <img className="sidebarfriend"  src={PF + user.profilePicture} alt=""/>
        <span className='sidefriendname'>{user.username}</span>
    </li>
  )
}

export default Useronline

