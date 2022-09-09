import React, { useState } from 'react'
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
import Checkout from '../Components/Checkout'



export const Cart = () => {

  var { cart } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1);

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
      setQuantity((quantity) => quantity - 1)
    }
    dispatch(patchProduct(id, quantity))
  }

  var sau = "";
  var che = "";
  var yog = "";
  var cabb = "";
  var fenu = "";
  var cor="";

  var sum = 0;

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Box>
          <Table>
            <Thead>
              <Tr >
                <Th>Item Image</Th>
                <Th>Name</Th>
                <Th>Addons</Th>
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
                    <Td>{el.Addons.map((ele) => {
                      if (ele.Extra_Sauce.current > 0) {
                        sau = 'Extra_Sauce'
                      } if (ele.Yogurt.current > 0) {
                        yog = 'Yogurt'
                      } if (ele.Cheese.current > 0) {
                        che = 'Cheese'
                      } if (ele.Cabbage.current > 0) {
                        cabb = 'Cabbage'
                      } if (ele.Fenugreek.current > 0) {
                        fenu = 'Fenugreek'
                      } if (ele.Corn.current > 0) {
                        cor = 'Corn'
                      }
                    })}
                      <h5>{`${sau} ${yog} ${che} ${cabb} ${fenu} ${cor}`}</h5></Td>
                      <p style={{display:"none"}}>{`${sau=""} ${che=""} ${yog=""}  ${cabb=""} ${fenu=""} ${cor=""}`}</p>

                    <Td>
                      <Box>
                        <Flex>
                          {el.quantity != 1 ? <Box><Button borderTopRightRadius="0" borderBottomRightRadius="0" onClick={() => DecreQtyItem(el.id)}  ><MinusIcon /></Button></Box> : <Box><Button isDisabled borderTopRightRadius="0" borderBottomRightRadius="0" onClick={() => DecreQtyItem(el.id)}  ><MinusIcon /></Button></Box>}
                          <Box><Button as={"Text"} borderRadius="0">{el.quantity}</Button></Box>
                          <Box><Button borderTopLeftRadius="0" borderBottomLeftRadius="0" onClick={() => AddQtyItem(el.id)}><AddIcon /></Button></Box>
                        </Flex>
                      </Box>
                    </Td>
                    {el.Addons.map((ele) => {
                      sum = sum + ele.Extra_Sauce.current + ele.Yogurt.current + ele.Cheese.current + ele.Corn.current + ele.Cabbage.current + ele.Fenugreek.current;
                    })}
                    <Td>
                      <h5>₹{el.price * el.quantity + sum}</h5></Td>
                      <p style={{display:"none"}}>{sum =0}</p>
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
      </Box>
      <Checkout cart={cart} />
    </>
  )
}


