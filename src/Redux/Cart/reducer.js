

import { CARTCOUNT,CARTQTY } from "./action";

const initState = {
    count: 0,
    qty: 1
}


export const cartreducer = (store = initState, { type, payload }) => {
    switch (type) {
        case CARTCOUNT:
            return { ...store, count: payload }
        case CARTQTY:
            return { ...store, qty: payload}
        
        default:
            return store;
}
}