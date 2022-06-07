
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./Productdetail.css";
import { useSelector, useDispatch } from "react-redux";
import {cartcount} from "../Redux/Cart/action"

const ProdDetail = styled.div`
display: flex;
margin: 20px auto;
width:70%;
height:550px;
// border: 1px solid gray;
gap:20px;

`;

const Box1 = styled.div`
border: 1px solid gray;
flex:1;
overflow:auto;
`;
const Box2 = styled.div`
border: 1px solid gray;
flex:2;
overflow:auto;
`;

const Button = styled.div`
width:300px;
height:40px;
margin: 20px auto;
border: 1px solid gray;
display:flex;
align-items:center;
justify-content:center;
background-color:black;
color:white;
cursor:pointer;
`;
export const ProductsDetailPage = () => {
    const { id } = useParams();
  const [data, setData] = useState([]);
  const { username } = useSelector((state) => state.login);
   const dispatch = useDispatch(); 
  useEffect(() => {
    axios.get(`https://miniecommerce-backend.herokuapp.com/products/${id}`).then((res) => {
      console.log("data", res)
      setData([res.data]);
    })
  }, []);

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
        <div>
            <h1>Products Details Page</h1> 
            {data.map((item) =>
            
            <ProdDetail key={item._id}>
                    <Box1>
                        <img src={item.images[0]} alt="" width="100%" height="300px"/>
                     <img src={item.images[1]} alt="" width="100%" height="300px"/>
                    </Box1>
                    <Box2 id="smallbox2">
        <div id="smallbox2box1"></div>
        <div id="smallbox2box2">
                            <div id="smallbox2box2title">{ item.name}</div>
          <div id="smallbox2box2price">{item.price}</div>
        </div>
        <div id="smallbox2box3">
          <div id="smallbox2box3star">✰✰✰✰✰</div>
          <div id="smallbox2box3review">Write a review</div>
        </div>
        {/* <div id="smallbox2box4">COLOR - BLACK</div> */}
        <div id="smallbox2box5">
          <div><div id="smallbox2box5box1"></div></div>
          <div><div id="smallbox2box5box2"></div></div>
          <div><div id="smallbox2box5box3"></div></div>
          <div><div id="smallbox2box5box4"></div></div>
        </div>
        {/* <div id="smallbox2box6">SIZE</div> */}
        <div id="smallbox2box7">
          <div>P</div>
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
        </div>
        <div id="smallbox2box8">
          <div>DETAILS</div>
          <div>FIND IN STORE</div>
          <div>REVIEWS</div>
        </div>
        <div id="smallbox2box9">
          <div>
            Crafted with a boxy, slightly cropped fit, our sweater is finished
            with subtle seams for a refined look. Detailed with chunky ribbed
            trim, this long sleeve style is knit with a high cut V-neckline.
          </div>
         
                        </div>
                        
                        <Button onClick={() => handleCart(item)}>ADD TO CART</Button>
                      </Box2>  
                </ProdDetail>
                
                
            )}
        </div>
    )
}