import React from "react";
import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { api } from "../../API/Api";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase";

const Share = () => {
  const Api = api.url.API_URL;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  // const initial_state={
  //   userId: user._id,
  //   desc:'',
  //   img:''
  // }
  const desc = useRef();
  const [file, setFile] = useState(null);
  // const [url, setUrl] = useState();
  // const [progress, setProgress] = useState();
  // const [details, setDetails] = useState(initial_state);

  const submitHandler = async (e) => {

    e.preventDefault();

    // const storageRef = ref(storage, `files/${file.name}`);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {},
    //   (error) => console.log(error),
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //       setUrl(downloadURL);
    //       setDetails((state) => ({...state,img:downloadURL}))
    //     });
    //   }
    // );

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post(Api + "/upload", data);
      } catch (err) {
        console.log(err)
      }
    }


    try {
      await axios.post(Api + "/posts", newPost);
      // window.location.reload()
       console.log(newPost);
      console.log(file);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shareContainer">
      <form className="shareWrapper" onSubmit={submitHandler}>
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            className="shareProfileImg"
            alt=""
          ></img>
          <input
            placeholder={"Whats in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
            // value={details.desc}
            // onChange={(e) =>
            //   setDetails((state) => ({ ...state, desc: e.target.value }))
            // }
          ></input>
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt=""></img>
            <Cancel className="shareCancelImg" onClick={()=>setFile(null)}></Cancel>
          </div>
        )}
        <div className="shareBotton" >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="Red" className="shareIcons" />
              <span className="shareOptionsText">Photos or Videos</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept=".jpg,.png,.jpeg"
                // accept="file/*"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </label>
            <div className="shareOption">
              <Label htmlColor="Blue" className="shareIcons" />
              <span className="shareOptionsText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="Green" className="shareIcons" />
              <span className="shareOptionsText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="Yellow" className="shareIcons" />
              <span className="shareOptionsText">Feelings</span>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Share;
