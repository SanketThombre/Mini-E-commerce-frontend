
import "./Checkout.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cartcount } from "../Redux/Cart/action";
import { Navigate } from "react-router-dom";

const Main = styled.div`
width:85%;
height:350px;
display: flex;
border:1px solid black;
margin:20px auto;
`;

const Billing = styled.div`
width:100%;
height:100%;
border: 1px solid gray;
flex:2
`;
const Total = styled.div`
flex:1
`;

const Input = styled.input`
width:40%;
height:30px;
margin-left:15px;
`;

const Inputs = styled.input`
width:40%;
height:30px;
margin-left:50px;
`;

const Box = styled.div`
margin-top:10px;
`;

export const Checkout = () => {
const dispatch = useDispatch();
  const { id } = useSelector((state) => state.login);
  console.log(id)
    const [item, setItem] = useState([]);
    useEffect(() => {
        axios.get(`https://mini-e-commerce-backend-ml0o.onrender.com/users/${id}`).then((res) => {
            console.log(res.data, "cart")
            setItem(res.data.cart)
        })
    }, []);
    let price = 0;
    for (let i = 0; i < item.length; i++){
        price += Number(item[i].price.slice(1).replace(',', ''));
    }

    const handlePayment = () => {
       
        const payload = {image:"hh",product_name:"san", price }
        axios.post("https://shopclues-backend.herokuapp.com/orders", payload)
            .then((res) => console.log(res))
        .catch((er)=>console.log(er))

        
    
        let data = [];
        axios.patch(`https://mini-e-commerce-backend-ml0o.onrender.com/users/${id}`,{ cart:data})
   
        dispatch(cartcount(0))

        window.location.href = "https://shopcluespaytm.herokuapp.com/";
    }

    return (
        <>
            <h1>Checkout Page</h1>
            <Main>
                
                <Billing>
                    <h1 style={{margin:"0"}}>Billing Address</h1>

                   <div style={{backgroundColor: 'gray',width: '100%',height: '0.5px',marginTop:"10px"}}></div>
                    <Box>
                <label>First Name <span id="vstar">*</span></label>
                    <Input type="text" />
                    </Box> 
                    <Box>
                <label>Last Name <span id="vstar">*</span></label>
                    <Input type="text" />
                    </Box> 
                    <Box>
                <label>Email <span id="vstar">*</span></label>
                    <Inputs type="text" />
                    </Box> 
                    <Box>
                <label>Mobile No. <span id="vstar">*</span></label>
                    <Input type="text" />
                    </Box> 
                    <Box>
                <label>Address <span id="vstar">*</span></label>
                    <Input type="text" />
                    </Box> 
                </Billing>

                <Total>

                <div id="vbox2">
          <div id="vpaymentname">
            <h2>Billing Summary</h2>
          </div>

          <div id="vprice">
            <p>Items total</p>
            <p>₹ <span className="displaypricev2">{price}</span>.00</p>
          </div>
          <div id="vprice">
            <p>Shipping</p>
            <p>₹ 0.00</p>
          </div>
          <div id="vprice">
            <p>Duties, taxes & fees</p>
            <p>₹ 00.00 (Free)</p>
          </div>
          <div id="vprice">
            <h1><b>Total For Your Order</b></h1>
            <h1>
              <b>₹ <span className="displaypricev3">{price}</span>.00</b>
            </h1>
          </div>

          
          <button id="vbutton" onClick={()=>handlePayment()}>
            PAY AND PLACE ORDER
          </button>
        </div>
                </Total>
           </Main>
        </>
        

    )
}