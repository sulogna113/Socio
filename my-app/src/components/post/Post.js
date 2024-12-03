import { React, useEffect, useState, useContext } from "react";
import "./Post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { api } from "../../API/Api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {Modal} from "../Modal/Modal";


const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const Api = api.url.API_URL;
  const { user: currentUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  const [openModal,setOpenModal]=useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${Api}/user?userId=${post.userId}`);
        // console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(Api + "/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  Post.handleClickOutside = () => {
    setShowDropdown(false);
  };

  const deletePost = () => {
    const body = { userId: currentUser._id };
    const body2 = JSON.stringify(body);
    // console.log(body2);
    axios
      .delete(`${Api}/posts/${post._id}`, {
        data: body2,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const editPost=()=>{
    setOpenModal(true);
  }
  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postPersonImg"
                src={user.profilePicture || PF + "person/noAvatar.png"}
                alt=""
              ></img>
            </Link>

            <span class="postPersonName">{user.username}</span>
            <span class="postTime">{format(post.createdAt)}</span>
          </div>
          {user.username === currentUser.username && (
            <div className="container">
              <MoreVert onClick={() => setShowDropdown(!showDropdown)} />
              {showDropdown ? (
                <div class="dropdown">
                  <ul classname="dropdownlist">
                    <li onClick={editPost}>Edit</li>
                    {openModal && <Modal closeModal={setOpenModal}/>}
                    <li onClick={deletePost}>Delete</li>
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {console.log(PF+post.img)}
          <img className="postTextImg" src={PF + post.img} alt=""></img>
        </div>
        <div className="postBottom">
          <div className="postButtonLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            ></img>
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            ></img>
            <span className="postStatus">{like}</span>
          </div>
          <div className="postButtonRight">
            <span class="comments">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
