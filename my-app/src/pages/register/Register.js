import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../API/Api";
import { useHistory } from "react-router-dom";

const Register = () => {
  const Api=api.url.API_URL;
  const history=useHistory();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    // if(password!==confirmPassword){
    //   confirmPassword.current.setCustomValidity("Passwords didnt match")
    //   console.log("nahi mila")
    // }
      
    // else{
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
        confirmPassword:confirmPassword.current.value
      }
      try{
        const res= await axios.post(Api + "/auth/register",user)
        console.log(res.data);
        history.pushState("/login")
        console.log("mila")

      }
      catch(err){
        console.log(err)

      }
    // }

  }
  return (
    <div className="main">
      <div className="side-logo">
        <div className="svg-logo">
          <img
            className="banner-image"
            src={require("../../assets/sideimg.jpg").default}
            alt=""
          />
        </div>
      </div>
      <div className="signup-container">
        <form className="signup-form" action="" onSubmit={handleSubmit}>
          <span
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              textAlign: "center",
              marginTop: "1.5rem",
            }}
          >
            Get's Started!
          </span>
          <div>
            <input
              className="signup-form--input"
              placeholder="Username"
              ref={username}
              required
            />
          </div>
          <div>
            <input
              className="signup-form--input"
              placeholder="Email"
              type="email"
              ref={email}
              required

            />
          </div>
          <div>
            <input
              className="signup-form--input"
              placeholder="Create Password"
              type="password"
              ref={password}
              required

            />
          </div>
          <div>
            <input
              className="signup-form--input"
              placeholder="Confirm Password"
              type="password"
              ref={confirmPassword}
              required

            />
          </div>

          <Button type="submit" variant="contained" id="submit-signup-button" type="submit">
            Sign Up
          </Button>
          <div className="footer">
          <span >Already have a account ? </span>
          <Link to='/login' className="login-link">Login</Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
