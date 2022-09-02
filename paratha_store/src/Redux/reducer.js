import * as types from "./actionTypes";

const initialState = {
    loading: false,
    products: [],
    cart: [],
    error: false
}

export const reducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_PRODUCTS_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            };
        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...store,
                loading: false,
                products: payload,
                error: false
            };
        case types.FETCH_PRODUCTS_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            };
        case types.ADD_PRODUCT_CART_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            }
        case types.ADD_PRODUCT_CART_SUCCESS:
            return {
                ...store,
                loading: false,
                error: false
            }
        case types.ADD_PRODUCT_CART_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            }
        case types.FETCH_CART_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            }
        case types.FETCH_CART_SUCCESS:
            return {
                ...store,
                loading: false,
                cart: [...payload],
                error: false
            }
        case types.FETCH_CART_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            }
        case types.REMOVE_CART_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            }
        case types.REMOVE_CART_SUCCESS:
            return {
                ...store,
                loading: false,
                error: false
            }
        case types.REMOVE_CART_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            }
        case types.PATCH_CART_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            }
        case types.PATCH_CART_SUCCESS:
            return {
                ...store,
                loading: false,
                error: false
            }
        case types.PATCH_CART_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            }
        default:
            return store;
    }
}