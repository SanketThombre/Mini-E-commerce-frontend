import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_FAILURE ,LOGOUT} from "./action";

const initState = {
    loading: false,
    error: false,
    isauthenticated: false,
    username: "",
    token: "",
    id:"",
}

export const loginreducer = (store = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_LOADING:
            return { ...store, loading: true}
        case LOGIN_SUCCESS:
            return { ...store, loading: false, error: false, isauthenticated: true, token: payload.token, username: payload.username, id: payload.id};
        case LOGIN_FAILURE:
            return { ...store, loading: false, error: true, isauthenticated: false, token: "", username: "",id:"" };
        case LOGOUT:
            return {...initState}
        default:
            return store;
}
}