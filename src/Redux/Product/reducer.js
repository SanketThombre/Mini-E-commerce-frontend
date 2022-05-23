
import { PRODUCT_FAILURE, PRODUCT_SUCCESS, PRODUCT_LOADING } from "./action";

const initState = {
    loading: false,
    error: false,
    products: [],
    
}

export const productReducer = (store= initState, { type,payload}) => {
    switch (type) {
        case PRODUCT_LOADING:
            return { ...store, loading: true }
        case PRODUCT_SUCCESS:
            return { ...store, loading: false, error: false, products: [...payload] }
        case PRODUCT_FAILURE:
            return { ...store, error: true, loading: false, products: [] };
        default:
            return store;
    }
}