import React,{useContext, useRef} from 'react'
import './Login.css'
import { loginCall } from '../../components/apiCalls';
import { AuthContext } from '../../components/context/AuthContext';
import { CircularProgress } from '@material-ui/core';

 const Login = () => {
     const email=useRef();
     const password=useRef();
    const {isFetching,error,dispatch,user}=useContext(AuthContext)

     const handleSubmit=(e)=>{
         e.preventDefault();
        //  console.log(email.current.value)
        loginCall(
            {email: email.current.value, password: password.current.value},
            dispatch)
     }
     console.log(user)
    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <img src='assets/login1.jpeg' alt='' className='loginLeftImg'></img>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleSubmit}>
                        
                        <input placeholder="Email" className="loginInput" type="email" ref={email} required></input>
                        <input placeholder="Password" className="loginInput" type="password" ref={password} required minLength={4}></input>
                        <button className="loginButton">{isFetching ? <CircularProgress color='white' size="25px" /> : "Log In"}</button>
                        {/* <span className="loginForgot">Forgot Password?</span> */}
                        <button className="loginRegisterButton">
                        Create a New Account
                        </button>
                        {/* <button className='loginWithGoogle'>Sign In with Google</button>
                        <button className='loginWithFB'>Sign In with Facebook</button> */}
                    </form>

                </div>

            </div>
            
        </div>
    )
}
export default Login