import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {getData, prodsuccess} from "../Redux/Product/action"


const Main = styled.div`
display:flex;
justify-content:space-between;
margin-top:15px;
position:sticky;
top:50px;
height:40px;
background-color: white
`;



export const Categories = () => {
    const dispatch = useDispatch();
    
    const products = useSelector((state) => state.products);
   
    // console.log(products)
   
    let prod = products.products;
    // console.log(price)
    let handleSort = (val) => {
        if (val == 1) {
            prod.sort((a, b) => {
                return Number(a.price.slice(2).replace(",","")) - Number(b.price.slice(2).replace(",",""))
            })
        }
        else {
            prod.sort((a, b) => {
                return Number(b.price.slice(2).replace(",","")) - Number(a.price.slice(2).replace(",",""))
            }) 
        }
       
        dispatch(prodsuccess(prod))
      
    }

    return (
        <Main>
            <div>
                
            <Link style={{ textDecorationLine: "none" }} to="/men"> <Button variant="outlined" >Mens</Button> </Link>
            <Link style={{ textDecorationLine: "none" }} to="/women"> <Button variant="outlined" >Womens</Button> </Link>
            <Link style={{ textDecorationLine: "none" }} to="/accessories"> <Button variant="outlined" >Accessories</Button> </Link>
            </div>
            <div>
                <Button variant="outlined" onClick={() => {handleSort(2)}}>Price High to Low</Button>
                <Button variant="outlined" onClick={() => { handleSort(1) }}>Price Low to High</Button>
            </div>
            
           
        </Main>
    )
}