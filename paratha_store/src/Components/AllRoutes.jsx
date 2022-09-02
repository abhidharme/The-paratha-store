import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart } from '../Pages/Cart'
import { Home } from '../Pages/Home'
import ProductsList from './ProductsList'

export const AllRoutes = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/> } />
    <Route path='/cart' element={<Cart/> } />
    <Route path='/pro' element={<ProductsList/> } />
    </Routes>
    </>
  )
}
