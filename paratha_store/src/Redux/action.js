import axios from "axios"
import * as types from "./actionTypes";

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
    axios.get('https://ecom-data-project.herokuapp.com/prods')   
        .then((res) => dispatch(fetchProductsSuccess(res.data)))
        .catch((err) => dispatch(fetchProductsFailure(console.log(err.message))))
}


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
    axios.post(`http://localhost:8080/cart`, data)
        .then((r) => dispatch(add_cart_Success(r.data)))
        .then((res) => dispatch(fetchCartData()))
        .catch((e) => dispatch(add_cart_Failure(e.message)))
}

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
    axios.get('http://localhost:8080/cart')
        .then((r) => dispatch(fetch_cart_Success(r.data)))
        .catch((err)=>console.log(err.message))
        .catch((err) => dispatch(fetch_cart_Failure(err.data)))

}

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
    axios.delete(`http://localhost:8080/cart/${id}`)
        .then((res) => {
            dispatch(delete_cart_Success(res.data))
        })
        .then(() => dispatch(fetchCartData()))
        .catch((err) => dispatch(delete_cart_Failure(err.data)))
}

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
    axios.patch(`http://localhost:8080/cart/${id}`,
        { quantity: `${data}`}
    )
        .then((r) => dispatch(patch_cart_Success(r.data)))
        .then((res) => dispatch(fetchCartData()))
        .catch((e) => dispatch(patch_cart_Failure(e.message)))
}
