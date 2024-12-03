import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { api } from "../../API/Api";
import axios from "axios";
import { useParams } from "react-router";
import { CameraAlt, Edit } from "@material-ui/icons";
import Modal from "react-modal";
import { AuthContext } from "../../components/context/AuthContext";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const Api = api.url.API_URL;
  const [user, setUser] = useState([]);
  const username = useParams().username;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { user: currentUser } = useContext(AuthContext);

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

  //   const openModal = () => {
  //     setModalIsOpen(true);
  //   };
  //   const closeModal = () => {
  //     setModalIsOpen(false);
  //   };
  console.log("userfrom profile", user);
  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedProfile.coverPicture = fileName;
      console.log(updatedProfile);

      try {
        await axios.post(Api + "/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.put(
        Api + "/user/" + currentUser._id + "/update",
        updatedProfile,
        {
          userId: currentUser._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // window.location.reload()
      console.log(updatedProfile);
      console.log(file);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* //modal operation
              <CameraAlt className="editCover" onClick={openModal} />
              <Modal show={true} isOpen={modalIsOpen}>
                <button onClick={closeModal}>x</button>
                <h6>modal opened</h6>
              </Modal> */}
              {user.username === currentUser.username && (
                <form className="editWrapper" onSubmit={submitHandler}>
                  <div className="Options">
                    <label htmlFor="file" className="editOption">
                      <CameraAlt htmlColor="Black" className="editCover" />
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        id="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={(e) => setFile(e.target.files[0])}
                      ></input>
                    </label>
                  </div>
                  <button className="saveButton" type="submit">
                    Save
                  </button>

                </form>
                
              )}
                  {/* <Edit htmlColor="Black" className="editProfilePicture" /> */}

              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/cover.jpg"
                }
                alt=""
                className="profileCoverImg"
              ></img>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              ></img>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
