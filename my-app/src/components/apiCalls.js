import axios from "axios"
import {api} from '../API/Api'

export const loginCall= async (userCrendentials, dispatch) =>{
    const Api=api.url.API_URL;

    dispatch({ type: "LOGIN_START"});
    try{
        const res=await axios.post(Api + "/auth/login",userCrendentials);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err});
    }
}