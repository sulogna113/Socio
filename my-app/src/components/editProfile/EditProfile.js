import React ,{useState,useContext} from 'react'
import axios from 'axios'
import { api } from "../../API/Api";
import { AuthContext } from "../../components/context/AuthContext";

import { Form, Button } from "react-bootstrap"
import './editProfile.css'
export const EditProfile = () => {

    const Api = api.url.API_URL;
    const initial_state={
      name:'',
      email:'',
      desc:''
    }
    const [details,setDetails]=useState(initial_state);

    // const [name, setName] = useState(theProfile.name);
    // const [email, setEmail] = useState(theProfile.email);
    // const [desc, setDesc] = useState(theProfile.desc);

    const { user } = useContext(AuthContext);

    // const updatedEmployee = {id, name, email, city}

    const updateProfile = async (e) => {
        e.preventDefault();
        console.log('details',details);

        const body={userId:user._id};
        const body2=JSON.stringify(body)
        console.log(body2);

        axios.post(`${Api}/user/${user._id}/update`,{
          data1:body2,
          details,
          headers:{
            "Content-type":"application/json"
          },
        })
        .then((res) => console.log(res))
        .catch((err) =>console.log(err))
 

        // updateEmployee(id, updatedEmployee)

        // const updatedProfile = {
        //     userId: user._id,
        //     desc:user.desc,
        //     email:user.email
        //   };
          // try 
          // {
          //   await axios.post(
          //     Api + "/user/" + user._id + "/update",
          //     details,
          //     {
          //       userId: user._id,
          //     },
          //     {
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //     }
          //   );
          //   // window.location.reload()
          //   // console.log(updatedProfile);
          // } catch (err) {
          //   console.log(err);
          // }
    }

     return (
       <h1>form</h1>

        // <Form onSubmit={updateProfile}>
        //     <Form.Group>
        //         <Form.Control
        //             type="text"
        //             placeholder="Name *"
        //             name="name"
        //             value={details.name}
        //             onChange={(e) => setDetails((state) => ({
        //               ...state,
        //               name:e.target.value
        //             }))}
        //         />
        //     </Form.Group>
        //     <Form.Group>
        //         <Form.Control
        //             type="email"
        //             placeholder="Email *"
        //             name="email"
        //             value={details.email}
        //             onChange={(e)=> setDetails((state) => ({
        //               ...state,
        //               email:e.target.value
        //             }))}
                    
        //         />
        //     </Form.Group>
        //     <Form.Group>
        //         <Form.Control
        //             as="textarea"
        //             placeholder="description"
        //             rows={2}
        //             name="description"
        //             value={details.desc}
        //             onChange={(e)=> setDetails((state) => ({
        //               ...state,
        //               desc:e.target.value
        //             }))}
        //         />
        //     </Form.Group>
        //     <Button variant="success" type="submit" block>
        //         Edit Profile
        //     </Button>
        // </Form>

     )
  
}
