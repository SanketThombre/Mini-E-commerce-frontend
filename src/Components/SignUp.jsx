import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { useReducer,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Error = styled.p`
// display:none;
margin:0px;
margin-left:50px; 
font-size:13px;
color:red
`;

const Main = styled.div`
width:25%;
height:auto;
// border: 1px solid gray;
margin:auto;
`;

const initState = {
    name: "",
    email: "",
    password: "",
    username: "",
    cart:[],
    error: false,
   
}

let registerReducer = (state=initState,{type,payload}) => {
    switch (type) {
        case "Change_name":
            return { ...state, name: payload }
            case "Change_email":
            return { ...state, email: payload }
            case "Change_password":
            return { ...state, password: payload }
            case "Change_username":
            return { ...state, username: payload }
        case "Error":
            return { ...state,error: true }
        default:
            return state;
    }
}

export const SignUp = () => {

    const [err, setErr] = useState([]);

    if (err.length != 0) {

        for (let i = 0; i < err.length; i++) {
            if (err[i].key == "name") {
                var nam = err[i].message;
            }
            else if (err[i].key == "username") {
                var usrnam = err[i].message;
            }
            else if (err[i].key == "email") {
                var ema = err[i].message;
            }
            else if (err[i].key == "password") {
                var pass = err[i].message;
            
            }
       
        }
    }

    console.log(err);
    const navigate = useNavigate();
    
    const [state, dispatch] = useReducer(registerReducer, initState);
    
    const { name, email, password, username } = state;
    

    
    const handleSubmit = () => {

        if (name == "" && email == "" && password == "" && username == "") {
            alert("Please fill all fields")
        }
        else {
             axios.post("http://localhost:5000/register", state)
                .then((res) => {
                    console.log(res, "res")
                            
                    alert("Registration successful");
            
                    if (res.statusText === "OK") {
                        navigate("/login")
                    }
                })
               
               
                .catch((res) =>
                    // console.log(res)
                        setErr([...res.response.data.errors]),
                // alert(res.response.data.message)
                   
                 dispatch({ type: "Error" })
           )
            
        }
    }
    return (
       
      <Main>
          
          <h1>SignUp</h1>
       
          <TextField
          required
                id="outlined-required"
                value={name}
                label="Name"
                onChange={(e)=>dispatch({type:"Change_name",payload:e.target.value})}
        //   defaultValue="username"
                 />
                 
            <Error>{ nam}</Error>
           
            <br />
            <br/>
            <TextField
          required
                id="outlined-required"
                value={email}
                label="Email"
                onChange={(e)=>dispatch({type:"Change_email",payload:e.target.value})}
        //   defaultValue="username"
          />
            <Error>{ ema}</Error>
           <br />
            <br />
          <TextField
               type="password"
          required
                id="outlined-required"
                value={password}
                label="Password"
                onChange={(e)=>dispatch({type:"Change_password",payload:e.target.value})}
        //   defaultValue="username"
          />
            <Error>{ pass}</Error>
           <br />
           
            <br />
            <TextField
          required
                id="outlined-required"
                value={username}
                label="UserName"
                onChange={(e)=>dispatch({type:"Change_username",payload:e.target.value})}
        //   defaultValue="username"
            />
            <Error>{usrnam }</Error>
           <br />
           
                  <br />
                
        
          <Button variant="contained" disabled={!name && !email && !password && !username} onClick={()=>handleSubmit()} >SignUp</Button>
             
      </Main>
     
  )
}



