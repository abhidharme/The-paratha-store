import React, { useState,useEffect } from 'react'
import {
  Box,
  Image,
  Button,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { deleteProduct, patchProduct } from '../Redux/action'
import Navbar from '../Components/Navbar'



export const Cart = () => {

  var  {cart}  = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1);

  console.log(cart)



  const dispatch = useDispatch();   



   const removeItem = (id) => {
     dispatch(deleteProduct(id))
   }


   const AddQtyItem = (id) => {
    setQuantity(quantity + 1)
    dispatch(patchProduct(id, quantity))
   }

  const DecreQtyItem = (id) => {
    if (quantity > 1) {
      setQuantity((quantity)=>quantity - 1)
    }
    dispatch(patchProduct(id, quantity))
  }

  return (
    <>
      <Box>
{/*<LoadingCart />*/}
  <Navbar/>
  </Box>
      <Box>
        <Box>
              <Table>
                <Thead>
                  <Tr >
                    <Th>Item Image</Th>
                    <Th>Name</Th>
                    <Th>Total Quantity</Th>
                    <Th>Total Price</Th>
                    <Th>Remove</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    cart.map((el) => (
                      <Tr key={el.id} >
                        <Link to={`/details/${el.id}`} ><td>
                          <Image
                            rounded={'lg'}
                            height={150}
                            width={150}
                            objectFit={'contain'}
                            src={el.image}
                          />
                        </td></Link>
                        <Td><h5>{el.title}</h5></Td>
                        <Td>
                          <Box>
                            <Flex>
                              {el.quantity != 1 ? <Box><Button borderTopRightRadius="0" borderBottomRightRadius="0" onClick={() => DecreQtyItem(el.id)}  ><MinusIcon /></Button></Box> : <Box><Button isDisabled borderTopRightRadius="0" borderBottomRightRadius="0" onClick={() => DecreQtyItem(el.id)}  ><MinusIcon /></Button></Box>}
                              <Box><Button as={"Text"} borderRadius="0">{el.quantity}</Button></Box>
                              <Box><Button borderTopLeftRadius="0" borderBottomLeftRadius="0" onClick={() => AddQtyItem(el.id)}><AddIcon /></Button></Box>
                            </Flex>
                          </Box>
                        </Td>
                        <Td><h5>${el.price * el.quantity}</h5></Td>
                        <Td ><Button onClick={() => removeItem(el.id)}
                        >
                          <DeleteIcon />
                        </Button></Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
        </Box>
        {/* <Box><Checkout cart={cart} /></Box>*/} 
      </Box>
    </>
  )
}


