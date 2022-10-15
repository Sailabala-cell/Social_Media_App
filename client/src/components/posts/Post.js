import React ,{useState,useEffect} from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {format} from 'timeago.js'
import axios from "axios"
import {Link} from "react-router-dom"
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext.jsx"
function Post({post}) {
   const [like,setLike]=useState(post.likes.length)
   const [isLiked,setIsliked]=useState(false) 
   const [user,setUser]=useState({})
   
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: currentUser } = useContext(AuthContext);

   useEffect(() => {
    setIsliked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

   
   const clickHandle=()=>{
    try {
        axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
      } catch (err) {}
    setLike(isLiked ? like-1 : like+1)
    setIsliked(!isLiked)
   }
   useEffect(() => {
    const fetchUsers=async ()=>{
     const res=await axios.get(`/users?userId=${post.userId}`)
     setUser(res.data)
     console.log(res.data)
    }
    fetchUsers()
  },[])
  return (
    <div className='post'>
    <div className="postWrapper">
        <div className='postTop'>
            <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
            <img className='profilepicture' 
            src={user.profilePicture ? PF + user.profilePicture : PF+"person/avatar.jpg"} alt=""/>
            </Link>
                
                <span className='profilename'>{user.username}</span>
                <span className='profiletime'>{format(post.createdAt)}</span>
            </div>
            <div className='postTopRight'>
                <MoreVertIcon/>
            </div>
        </div>
        <div className='postCentre'>
            <span className='postdesc'>{post?.desc}</span>
            <img className='postPic' src={PF+post.img} alt=""/>

        </div>
        <div className='postBottom'>
        <div className='postBottomLeft'>
        <img className='loveButton' src={`${PF}posts/23.png`} onClick={clickHandle}   alt=""/>
        <img className='likeButton' src={`${PF}posts/24.png`} onClick={clickHandle} alt=""/>
        <span className='postlikescount'>{like} likes</span>
        </div>
        <div className='postBottomRight'>
        <span className='postcomment'>{ post.comment} comments</span>
        </div>
         </div>
    </div>
    </div>
  )
}

export default Post