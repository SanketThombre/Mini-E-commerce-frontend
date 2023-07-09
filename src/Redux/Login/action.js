import axios from 'axios';


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGOUT = "LOGOUT";

export const loginloading = () => ({
    type: "LOGIN_LOADING"
});

export const loginsuccess = (payload) => ({
    type: "LOGIN_SUCCESS", payload
});

export const loginfailure = () => ({
    type: "LOGIN_FAILURE"
});

export const login = ({username, password}) => (dispatch) => {
    dispatch(loginloading());

    axios.post("https://mini-e-commerce-backend-ml0o.onrender.com/login",{username, password})
        .then((res) => {
            console.log(res);
            dispatch(loginsuccess({ username, token: res.data.token,id: res.data.user._id }));
        alert("Login Successful")
       
           
           
        }).catch((res) => {
            alert(res.response.data.message);
            console.log(res,"err")
            dispatch(loginfailure());
    })
}

export const logout = () => ({
    type: "LOGOUT" 
})