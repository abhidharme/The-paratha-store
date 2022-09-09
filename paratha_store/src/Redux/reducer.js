import * as types from "./actionTypes";

const initialState = {
    loading: false,
    products: [],
    cart: [],
    orders: [],
    error: false
}

export const reducer = (store = initialState, { type, payload }) => {
    switch (type) {
        //reducer for fetch paratha products
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
        //reducer for Add Addons to paratha products
            case types.ADD_ADDONS_LOADING:
            return {
                ...store,
                loading: true,
                error: false
            }
        case types.ADD_ADDONS_SUCCESS:
            return {
                ...store,
                loading: false,
                error: false
            }
        case types.ADD_ADDONS_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            }
        //reducer for Add products to cart
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
            };
        //reducer for fetch cart items
        case types.FETCH_CART_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            };
        case types.FETCH_CART_SUCCESS:
            return {
                ...store,
                loading: false,
                cart: [...payload],
                error: false
            };
        case types.FETCH_CART_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            };
        //reducer for delete cart items
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
            };
        //reducer for update cart items quantity
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
        //reducer for fetch orders products
        case types.FETCH_ORDERS_PRODUCTS_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            };
        case types.FETCH_ORDERS_PRODUCTS_SUCCESS:
            return {
                ...store,
                loading: false,
                orders: payload,
                error: false
            };
        case types.FETCH_ORDERS_PRODUCTS_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            };
        //reducer for Add products to orders
        case types.ADD_ORDERS_PRODUCT_REQUEST:
            return {
                ...store,
                loading: true,
                error: false
            }
        case types.ADD_ORDERS_PRODUCT_SUCCESS:
            return {
                ...store,
                loading: false,
                error: false
            }
        case types.ADD_ORDERS_PRODUCT_FAILURE:
            return {
                ...store,
                loading: false,
                error: true
            }
        default:
            return store;
    }
}