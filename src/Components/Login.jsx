import TextField from '@mui/material/TextField';
import { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { login } from "../Redux/Login/action";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export const Login = () => {
    const {isauthenticated} = useSelector((state) =>state.login)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const payload = { username, password };
        dispatch(login(payload)); 
          
    }

    if (isauthenticated) {
        navigate("/");  
    }
    return (
        <div>
            <h1>Login</h1>
            <br/>
           <TextField
          required
                id="outlined-required"
                value={username}
                label="UserName"
                onChange={(e)=>setUsername(e.target.value)}
        //   defaultValue="username"
            />
            <br />
            <br />
            
            <TextField
                type="password"

          required
          id="outlined-required"
          label="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
          //   defaultValue="Hello World"
            />
            
            <br />
            <br />
            
            <Button variant="contained" onClick={() => handleSubmit()}>Login</Button>
        </div>
        
    )
}