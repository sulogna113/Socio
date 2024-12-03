import React,{useState} from "react";
import "./modal.css";
import { Form } from "react-bootstrap";
import {  Button } from "react-bootstrap";



export const Modal = ({ closeModal }) => {
  const [city, setCity] = useState("");
  const updatePost=()=>{
    
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Edit post</h1>
        </div>
        <div className="body">
          <Form onSubmit={updatePost}>

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
              

              <Button
                variant="success"
                type="submit"
                block
                onClick={updatePost}
              >
                Edit Profile
              </Button>
          </Form>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              closeModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
};
