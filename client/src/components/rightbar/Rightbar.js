import React ,{useState, useEffect, useContext} from 'react'
import './rightbar.css'
import Online from '../online/Online'
import {Users} from '../../dummyData'
import {Link} from "react-router-dom"
import axios from "axios"
import {AuthContext} from "../../context/AuthContext.jsx"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
function Rightbar({user}) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user:currentUser ,dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  const HomeRightbar = () =>{
    return (
      <>
<div className='rightbirthDay'>
        <img className='giftimage' src="/assets/posts/gift.png" alt=""/>
        <span className='birthdayNames'>
          <b>Revati  Iyer</b><b> and 3 other friends</b> have a birthday today.
        </span>
      </div>
    <div className='textoverImage'>
    <img className='advertisement' src="/assets/posts/ads.jpg" alt=""/>
    <span className='ads' >Awesome hotels.Bookings are on. Hurry!!</span>
    </div> 
    <span className='onlinefrinds'>Online Friends</span>
    <ul className="rightbarFriendlist">
     {Users.map((u) => 
     <Online key={u.id} user={u}/>)} 
    </ul>
      </>
    )
  }
  
  const ProfileRightbar = () =>{
  
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
       {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City : </span>
            <span className="rightbarInfoValue">{user.city} </span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>State : </span>
            <span className="rightbarInfoValue">{user.from} </span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship </span>
            <span className="rightbarInfoValue">{user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Interested in : </span>
            <span className="rightbarInfoValue">Web development </span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Hobby : </span>
            <span className="rightbarInfoValue">Dance & Chess </span>
          </div>

          
        </div>

        <h4 className='rightbarTitle'>User Friends</h4>
        <div className='rightbarFollowings'>
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username}
            style={{textDecoration:"none"}}
            >
            <div className='rightbarFollowing'>
            <img
              src={ friend.profilePicture ? PF + friend.profilePicture : PF + "person/avatar.jpg"}
              alt=""
              className='rightbarFollowingImg'
            />
          <span className="rightbarFollowingName">{friend.username}</span>

          </div>
            </Link>
            

          ))}
         
        </div>
      </>
    )
  }
  
  
  
  
  return (
    <div className='righhtbarcontainer'>
    <div className='rightbarWrapper'>
      {user ? <ProfileRightbar/> : <HomeRightbar/> }
    </div>
    </div>
  )
}

export default Rightbar