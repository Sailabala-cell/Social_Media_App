
import './topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext.jsx"
function Topbar() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
          <div className="TopbarWrapper">
            <div className="TopLeft">
              <Link to="/" style={{textDecoration:"none"}}>
              <div className="logo">
                Sailabala
              </div>
              </Link>
             
            </div>
            <div className="TopCenter">
            <div className='searchbar'>
            <SearchIcon className="logoicon"/>
              <input className="search" placeholder="name, place or college"/>
            </div>
           
            </div>
            <div className="TopRight">

            <div className="rightlinks">
              <span className="homepagelink">HomePage</span>
              <span className="Timelinelink">Timeline</span>   
              </div>
               <div className="centericons">
                 <div className='topicons'>
                 <NotificationsIcon className="iconlink"/>
                 <span className="iconnumber">1</span>
                 </div>
                  <div className='topicons'>
                  <ChatIcon className="iconlink"/>
                 <span className="iconnumber">3</span>
                  </div>
                  <div className='topicons'>
                  <ChatIcon className="iconlink"/>
                 <span className="iconnumber">3</span>
                  </div>
                </div>
             <Link to={`/profile/${user.username}`}>
             <img 
             src={user.profilePicture ? 
             PF + user.profilePicture: 
             PF + "person/avatar.jpg"} 
             alt=""  
             className="topbarImg"/>
             </Link>
               
            </div>
        </div>
      
   
  );
}

export default Topbar;
