


import styled from "styled-components";
import "./Products.css"
import { getData } from "../Redux/Product/action";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {cartcount} from "../Redux/Cart/action"

const Container = styled.div`
width:90%;
height:auto;
// border: 1px solid gray;
margin:25px auto;
display:grid;
grid-template-columns:repeat(4,1fr);
grid-template-rows:auto;
grid-gap:15px;
padding:20px;
`;

const ProductCards = styled.div`
border: 0.5px solid gray;

border-radius:8px;
`;

const Button = styled.button`
padding:8px 25px;
border-radius: 8px;
margin:10px auto;
background-color:#3A3845;
color:#F7CCAC;
cursor:pointer;
`;

export const Accessories = ({prod}) => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { username } = useSelector((state) => state.login);
    useEffect(() => {
        dispatch(getData()); 
    },[])

    const handleCart = (prod) => {
        console.log(prod, "prod");
        axios.get("https://miniecommerce-backend.herokuapp.com/users")
            .then((res) => {
            
                let data = [];
                let userid;
                for (let i = 0; i < res.data.length; i++){
                    if (res.data[i].username === username) {
                        data = res.data[i].cart; 
                        userid = res.data[i]._id;
                        
                        console.log(userid);
                        break;
                    }
                }

                data.push(prod);

                if (userid) {
                    axios.patch(`https://miniecommerce-backend.herokuapp.com/users/${userid}`, { cart: data })
                        .then((res) => {
                            dispatch(cartcount(res.data.cart.length))
                            alert("Added to Cart successfully")
                            
                        })
                    
                }
                else {
                    alert("Something Went wrong")
                }
        })
   }

    return (
        <>
        <h1>Accessories</h1>

            <Container>
            {prod.map((el,i) =>
                <ProductCards key={el._id}>
                    <Link to={`/productdetail/${el._id}`} className="prod_img">

                        <img className="img1" width="100%" height="350px" src={el.images[0]} alt="Image" /> 
                        <img className="img2" width="100%" height="350px" src={el.images[1]} alt="Image" /> 
                       
                    </Link> 
                    <p >{el.name}</p>
                    <p >{el.price}</p>
                    <Button onClick={()=>handleCart(el)}>ADD TO CART</Button>
          
            </ProductCards>
            )}
            </Container>
            
        </> 

    )
}