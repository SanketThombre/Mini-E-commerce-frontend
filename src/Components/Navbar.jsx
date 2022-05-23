import {Link} from "react-router-dom";
import { logout } from "../Redux/Login/action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import styled from "styled-components";
import { useSelector } from "react-redux"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect } from "react";
import axios from "axios"

const Cart = styled.div`
position: relative;
top: -1%;
cursor:pointer;
`;
const CartTotal = styled.div`
position: absolute;
background-color: white;
top: -15%;
right: -17%;
font-size: 0.75rem;
padding: 0.2rem 0.5rem;
color: black;
border-radius: 50%;
`;

export const Navbar = () => {
    const navigate = useNavigate();
const dispatch = useDispatch();
    const { isauthenticated, username, id } = useSelector((state) => state.login);
    const {count} =  useSelector((state) => state.cart);

    
    console.log(count,"count")

    return (
        <div style={{ 
            width: '100%',
            height:"50px",
            display: 'flex',
            justifyContent: "space-evenly",
            position: "sticky",
            top: "0px",
            zIndex:"1",
            // border: "1px solid black",
            alignItems: "center", 
            backgroundColor:"#F7E9D7"
        }}>
            <Link style={{ textDecorationLine: "none" }} to="/"> <Button variant="outlined" >Products</Button> </Link>
            {isauthenticated ? `Welcome ${username}` : <Link style={{textDecorationLine:"none"}}to="/login"><Button variant="outlined">Login</Button></Link> }
            
            <Link style={{textDecorationLine:"none"}}to="/register"> <Button variant="outlined">SignUp</Button></Link>
            <Button variant="outlined" onClick={() => dispatch(logout())}>LogOut</Button>

            {isauthenticated ? <Cart onClick={() => navigate("/addcart")}>
                <ShoppingCartIcon style={{fontSize:"30px"}}/>
                <CartTotal>{count}</CartTotal>
                                </Cart> : ""}
        </div>
    )
}