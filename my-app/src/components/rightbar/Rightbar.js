import React, { useEffect, useState } from "react";
import "./Rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { api } from "../../API/Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove, Edit } from "@material-ui/icons";
import { Modal, Button } from "react-bootstrap";
import { EditProfile } from "../editProfile/EditProfile";
import { Form } from "react-bootstrap";
import { useParams } from "react-router";

const Rightbar = ({ user }) => {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt=""></img>
          <span class="birthdayText">
            <b>Sulogna</b> and <b> 3 others </b>has birthday today
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">
          <b>Online Friends</b>
        </h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    const [user, setUser] = useState([]);
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [desc, setDesc] = useState("");
    const [from, setFrom] = useState("");
    const [relationship, setRelationship] = useState("");
    const [show, setShow] = useState(false);

    const [friends, setFriends] = useState([]);

    const { user: currentUser, dispatch } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const Api = api.url.API_URL;
    const username = useParams().username;

    const [followed, setFollowed] = useState(
      currentUser.followings.includes(user?.id)
    );

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
      handleClose();
    }, [user._id]);

    const handleClick = async () => {
      try {
        if (followed) {
          await axios.put(Api + "/user/" + user._id + "/unfollow", {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(Api + "/user/" + user._id + "/follow", {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
      } catch (err) {
        console.log(err);
      }
      setFollowed(!followed);
    };

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`${Api}/user?username=${username}`);
          setUser(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProfile();
    }, [username]);

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(
            Api + "/user/friends/" + currentUser._id
          );
          setFriends(friendList.data);
          console.log(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };

      getFriends();
    }, [user._id]);
    // console.log("current",user)

    const updateProfile = async (e) => {
      e.preventDefault();
      const details = {
        city: city,
        desc: desc,
        from: from,
        relationship: relationship,
        userId: user._id,
      };

      // console.log("details", details);

      try {
        const response = await axios.put(
          // `${Api}/user/${user._id}/update`,
          Api + "/user/" + currentUser._id + "/update",
          details,

          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        // console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    };
    // console.log("user data", user);
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        {user.username === currentUser.username && (
          <div className="editProfile">
            <Edit htmlColor="Black" onClick={handleShow} />
          </div>
        )}

        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={updateProfile}>
            <Modal.Header>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <input
                  type="text"
                  placeholder="City *"
                  name="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <input
                  as="textarea"
                  placeholder="description"
                  rows={2}
                  name="desc"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <input
                  type="from"
                  placeholder="From *"
                  name="from"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <input
                  type="relation"
                  placeholder="Relationship *"
                  name="relationship"
                  value={relationship}
                  onChange={(e) => {
                    setRelationship(e.target.value);
                  }}
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                block
                onClick={updateProfile}
              >
                Edit Profile
              </Button>
            </Modal.Body>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
export default Rightbar;
