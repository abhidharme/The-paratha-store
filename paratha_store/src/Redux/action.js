import axios from "axios"
import * as types from "./actionTypes";
import { BASE_URL } from "../config";

//actions creators for paratha products 

//action creators for fetch paratha products
const fetchProductsRequest = () => ({
    type: types.FETCH_PRODUCTS_REQUEST
})

const fetchProductsSuccess = (payload) => ({
    type: types.FETCH_PRODUCTS_SUCCESS,
    payload
})

const fetchProductsFailure = () => ({
    type: types.FETCH_PRODUCTS_FAILURE
})

export const fetchProducts = () => (dispatch) => {
    dispatch(fetchProductsRequest());
    axios.get(`${BASE_URL}/products`)
        .then((res) => dispatch(fetchProductsSuccess(res.data)))
        .catch((err) => dispatch(fetchProductsFailure(console.log(err.message))))
}

//action creators for Add Addons to paratha products
const AddonsRequest = () => ({
    type: types.ADD_ADDONS_LOADING
})

const AddonsSuccess = (payload) => ({
    type: types.ADD_ADDONS_SUCCESS,
    payload
})

const AddonsFailure = () => ({
    type: types.ADD_ADDONS_FAILURE
})

export const Add_Addons = (mongoId, Extra_Sauce, Yogurt, Cheese, Corn, Cabbage, Fenugreek) => (dispatch) => {
    dispatch(AddonsRequest());
    axios.patch(`${BASE_URL}/products/${mongoId}`, {
        Addons: [{
            Extra_Sauce: Extra_Sauce,
            Yogurt: Yogurt,
            Cheese: Cheese,
            Corn: Corn,
            Cabbage: Cabbage,
            Fenugreek: Fenugreek
        }]

    }).then((res) => dispatch(AddonsSuccess(res.data)))
        .then(() => dispatch(fetchProducts()))
        .catch((err) => dispatch(AddonsFailure(console.log('iiiii', err.message))))
}



//actions creators for Cart products 

//action creators for add products to cart

const add_cart_Request = () => ({
    type: types.ADD_PRODUCT_CART_REQUEST
})

const add_cart_Success = (payload) => ({
    type: types.ADD_PRODUCT_CART_SUCCESS,
    payload
})

const add_cart_Failure = (payload) => ({
    type: types.ADD_PRODUCT_CART_FAILURE,
    payload
})

export const addProduct = (data) => (dispatch) => {
    dispatch(add_cart_Request());
    axios.post(`${BASE_URL}/cart`, data)
        .then((r) => dispatch(add_cart_Success(r.data)))
        .then((res) => dispatch(fetchCartData()))
        .catch((e) => dispatch(add_cart_Failure(e.message)))
}


//action creators for fetch cart products

const fetch_cart_Request = () => ({
    type: types.FETCH_CART_REQUEST
})

const fetch_cart_Success = (payload) => ({
    type: types.FETCH_CART_SUCCESS,
    payload
})

const fetch_cart_Failure = () => ({
    type: types.FETCH_CART_FAILURE,
})

export const fetchCartData = () => (dispatch) => {
    dispatch(fetch_cart_Request());
    axios.get(`${BASE_URL}/cart`)
        .then((r) => dispatch(fetch_cart_Success(r.data)))
        .catch((err) => console.log(err.message))
        .catch((err) => dispatch(fetch_cart_Failure(err.data)))
}

//action creators for delete cart items

const delete_cart_Request = () => ({
    type: types.REMOVE_CART_REQUEST
})

const delete_cart_Success = (Payload) => ({
    type: types.REMOVE_CART_SUCCESS,
    Payload
})

const delete_cart_Failure = (Payload) => ({
    type: types.REMOVE_CART_FAILURE,
    Payload
})

export const deleteProduct = (id) => (dispatch) => {
    dispatch(delete_cart_Request());
    axios.delete(`${BASE_URL}/cart/${id}`)
        .then((res) => {
            dispatch(delete_cart_Success(res.data))
        })
        .then(() => dispatch(fetchCartData()))
        .catch((err) => dispatch(delete_cart_Failure(err.data)))
}


//action creators for update cart items quantity

const patch_cart_Request = () => ({
    type: types.PATCH_CART_REQUEST
})

const patch_cart_Success = (Payload) => ({
    type: types.PATCH_CART_SUCCESS,
    Payload
})

const patch_cart_Failure = () => ({
    type: types.PATCH_CART_FAILURE
})

export const patchProduct = (id, data) => (dispatch) => {
    dispatch(patch_cart_Request());
    axios.patch(`${BASE_URL}/cart/${id}`,
        { quantity: `${data}` }
    )
        .then((r) => dispatch(patch_cart_Success(r.data)))
        .then((res) => dispatch(fetchCartData()))
        .catch((e) => dispatch(patch_cart_Failure(e.message)))
}


//actions creators for Orders products 

//action creators for fetch ordered products

const fetchOrdersRequest = () => ({
    type: types.FETCH_ORDERS_PRODUCTS_REQUEST
})

const fetchOrdersSuccess = (payload) => ({
    type: types.FETCH_ORDERS_PRODUCTS_SUCCESS,
    payload
})

const fetchOrdersFailure = () => ({
    type: types.FETCH_ORDERS_PRODUCTS_FAILURE
})

export const fetchOrders = () => (dispatch) => {
    dispatch(fetchOrdersRequest());
    axios.get(`${BASE_URL}/order`)
        .then((res) => dispatch(fetchOrdersSuccess(res.data)))
        .catch((err) => dispatch(fetchOrdersFailure(console.log(err.message))))
}

//action creators for add products to orders

const add_orders_Request = () => ({
    type: types.ADD_ORDERS_PRODUCT_REQUEST
})

const add_orders_Success = (payload) => ({
    type: types.ADD_ORDERS_PRODUCT_SUCCESS,
    payload
})

const add_orders_Failure = (payload) => ({
    type: types.ADD_ORDERS_PRODUCT_FAILURE,
    payload
})

export const addOrders = (data) => (dispatch) => {
    dispatch(add_orders_Request());
    axios.post(`${BASE_URL}/order`, data)
        .then((r) => dispatch(add_orders_Success(r.data)))
        .then(() => dispatch(fetchOrders()))
        .catch((e) => dispatch(add_orders_Failure(e.message)))
}