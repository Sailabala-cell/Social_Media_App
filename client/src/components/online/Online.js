import React from 'react'
import './online.css'
function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='onlinefriends'>
         <li className='rightbarfriend'>
        <div className='rightbarfriendContainer'>
          
          <img className='rightPicture' src={PF + user.profilePicture} alt=""/>
          <span className='rightbaronline'/>
        </div>
        <span className='rightuserName'>{user.username}</span>
      </li>
    </div>
  )
}

export default Online