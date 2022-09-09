import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchCartData } from '../Redux/action';

export const CartCounter = () => {

  const dispatch = useDispatch();

//getting cart data from redux store
  const { cart } = useSelector((state) => state.products)

  useEffect(() => {
    if (cart?.length === 0) {
      dispatch(fetchCartData())
    }
  }, [cart?.length, dispatch])


  return (
    <Box textColor={"white"}
      bg={useColorModeValue('red.300', 'red.900')}
      color={useColorModeValue('red.700', 'red.200')}
      borderRadius="50%"
      textAlign="center"
      height="20px"
      paddingBottom="20px"
      position={"absolute"}
      right="2"
      top={"-2"}
    >
      <Box padding="1px 5px 15px 5px">
        {/*Cart Items Count Show*/}
        {cart?.length ? cart.length : 0}
      </Box>
    </Box>
  )
}
