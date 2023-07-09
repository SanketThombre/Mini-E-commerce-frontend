
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import "./Addcart.css";
import { cartcount } from "../Redux/Cart/action";
import { useNavigate } from "react-router-dom";

export const Addcart = () => {
    const navigate = useNavigate();
    const { id } = useSelector((state) => state.login);
const dispatch = useDispatch();
    const [item, setItem] = useState([]);
    useEffect(() => {
        axios.get(`https://mini-e-commerce-backend-ml0o.onrender.com/users/${id}`).then((res) => {
            console.log(res.data, "cart")
            setItem(res.data.cart)
        })
    }, []);

    const Removeitem = (uid) => {
    
        let cart1 = [];
        for (let i = 0; i < item.length; i++) {
          if (uid !== item[i]._id) {
            cart1.push(item[i]);
          }
        }
    
        console.log(cart1, "cart1");
        axios.patch(`https://mini-e-commerce-backend-ml0o.onrender.com/users/${id}`, { cart: cart1 })
            .then((res) => {
              
            // alert("Item removed from cart");
              dispatch(cartcount(res.data.cart.length))
            setItem([...cart1]);
          });
      };
    
    let sum = 0;
    for (let i = 0; i < item.length; i++){
        sum += Number(item[i].price.slice(1).replace(',', ''));
    }
    console.log(sum, "sum");

    if (item.length == 0) {
        return <div id="cartempty">
        <h1>Your Shopping Cart Is Empty</h1>
      </div>
    }
    else {
        return (
            <>
           
                <div id="maincart">
                    <div id="cartdiv">
                        <div id="tabledata">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sub-Total</th>
                                    </tr>
                                </thead>
                                <tbody>
             
                                    {item.map((el) =>
                                        <tr key={el._id}>
                                            <td>
                                                <img className="image" src={el.images[0]} height="250px" />
                                            </td>
                                            <td><p>{el.name}</p></td>
                                            <td><p>{el.price}</p></td>
                                            <td>
                                                <div>
                                                    <select
                                                        className="select_qty"
                                                    >
                                                        <option value="1">Qty</option>
                     
                                                        <option value="1">1</option>
                     
                                                        <option value="2">2</option>
                     
                                                        <option value="3">3</option>
                      
                                                        <option value="4">4</option>
                      
                                                        <option value="5">5</option>
                     
                                                    </select>
                                                </div>
                                                <p className="edit">Edit</p>
                                            </td>
                                            <td>
                                                <p className="sTotal">
                                                    {el.price}
                   
                                                </p>
                                                <p
                                                    className="edit"
                                                    onClick={() => Removeitem(el._id)}>
                                                    Remove
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id="promocode">
       
        <div id="orderdiv">
          <h4>Order Summary</h4>
                            <hr style={{ background:" #707070", height: "0.2px", border: "0"}} />

          <div id="subTotal">
            <p>Sub-Total</p>
                                <p id="Price">₹ { sum}</p>
          </div>
          <div id="Total">
            <p>Total</p>
            <p id="Price2">₹ { sum}</p>
          </div>
        </div>

        <button id="checkoutbtn" onClick={() =>navigate("/checkout")}>CONTINUE TO CHECKOUT</button>
      </div>
            
                </div>
            </>
        )
    }
}