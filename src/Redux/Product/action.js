
import axios from 'axios';


export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAILURE = "PRODUCT_FAILURE";
export const PRODUCT_LOADING = "PRODUCT_LOADING";


export const prodloading = () => ({
    type: "PRODUCT_LOADING"
});

export const prodsuccess = (payload) => ({
    type: "PRODUCT_SUCCESS", payload
});

export const prodfailure = () => ({
    type: "PRODUCT_FAILURE"
});

export const getData = () => (dispatch) => {
   
    dispatch(prodloading())
    axios.get("https://mini-e-commerce-backend-ml0o.onrender.com/products")
        .then((res) => dispatch(prodsuccess(res.data)))
        .catch((err) => dispatch(prodfailure()));
}
