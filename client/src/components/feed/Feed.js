import React,{useState,useEffect} from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from "../posts/Post"
import axios from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
function Feed({username}) {
const [posts, setPosts]= useState([])
const {user}=useContext(AuthContext)
useEffect(() => {
  const fetchPosts=async ()=>{
    const res = username
    ? await axios.get("/posts/profile/" + username)
    : await axios.get("posts/timeline/" + user._id);

   setPosts( res.data.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  }))
   console.log(res.data)
  }
  fetchPosts()
},[])
  return (
    <div className='feed'>
    <div className='feedWrapper'> <Share/>
    {posts.map((p)=>(
      <Post key={p._id} post={p}/>
    ))}
    </div>
</div>
  )
}

export default Feed