import React from 'react'
import './Sidebar.css'
import {RssFeed,Chat,PlayCircleFilledOutlined,Group,Bookmark,Help,Work,Event,School} from '@material-ui/icons'
import { Users } from '../../dummyData'
import CloseFriends from '../closeFriends/CloseFriends'

 const Sidebar = () => {
    return (
        <div className='sidebarContainer'>
            <div className='sidebar-wrapper'>
                <ul className='sidebarList'>
                    <li className='sidebarListItems'>
                        <RssFeed/>
                        <span class='sidebarListItemText'>Feed</span>
                    </li>
                    <li className='sidebarListItems'>
                        <Chat/>
                        <span class='sidebarListItemText'>Chats</span>
                    </li>
                    <li className='sidebarListItems'>
                        <PlayCircleFilledOutlined/>
                        <span class='sidebarListItemText'>Videos</span>
                    </li>
                    <li className='sidebarListItems'>
                        <Group/>
                        <span class='sidebarListItemText'>Groups</span>
                    </li>
                    <li className='sidebarListItems'>
                        <Bookmark/>
                        <span class='sidebarListItemText'>Bookmark</span>
                    </li>
                    <li className='sidebarListItems'>
                        <Help/>
                        <span class='sidebarListItemText'>Questions</span>
                    </li>
                    <li className='sidebarListItems'>
                        <Work/>
                        <span class='sidebarListItemText'>Jobs</span>
                    </li>
                    <li className='sidebarListItems'>
                        <Event/>
                        <span class='sidebarListItemText'>Events</span>
                    </li>
                    <li className='sidebarListItems'>
                        <School/>
                        <span class='sidebarListItemText'>Courses</span>
                    </li>


                </ul>
                {/* <button className='sidebar-button'>Show More</button>
                <hr className="sidebar-hr"></hr> */}
                {/* <ul className="sidebarFriendList">
                    
                    {Users.map( u =>(
                        <CloseFriends key={u.id} user ={u}/>
                    ))}
                </ul> */}
            </div>
        </div>
    )
}
export default Sidebar