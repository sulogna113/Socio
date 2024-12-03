import React from 'react'
import './CloseFriends.css'

 const CloseFriends = ({user}) => {
     const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
            <img className='sidebarFriendImg' src={PF + user.profilePicture} alt=''></img>
            <span className='sidebarImageName'>{user.username}</span>
        </li>
    )
}
export default CloseFriends