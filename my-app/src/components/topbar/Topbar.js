import React from "react";
import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import {api} from "../../API/Api"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Topbar = () => {
  // const Api=api.url.API_URL;
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext);
  
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Sociout</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <Search className="searchIcon"></Search>
          <input
            placeholder="Search for friends"
            className="searchInput"
          ></input>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <span className="topbar-link">Homepage</span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg" />

        </Link>
      </div>
    </div>
  );
};
export default Topbar;
