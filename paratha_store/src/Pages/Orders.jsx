import {
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Box,
  Center,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Redux/action';
import Navbar from '../Components/Navbar';


export const Orders = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders())
  }, []);

  const { orders } = useSelector((state) => state.products);

  var Tsum = 0;
  var tprice = 0;

  return (
    <>
      <Box><Navbar /></Box>
      <Box py={6} px={5} min={'100vh'}>
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'space-around',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
            <Stack
              width={{
                base: '100%',
                md: '40%',
              }}
              textAlign={'center'}>
              <Center>
                <Heading position={'absolute'} top='14px' size={'lg'}><Text color="purple.400">Your Orders</Text>
                </Heading>
              </Center>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          {
            orders.map((el) => (
              <Box position={'relative'} style={{ boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset' }} key={el.id}>
                <Box
                  position="absolute"
                  top="10px"
                  left="50%"
                  style={{ transform: 'translate(-50%)' }}>
                  <Text
                    textTransform="uppercase"
                    bg={'red.300'}
                    px={3}
                    py={1}
                    color={'gray.900'}
                    fontSize="sm"
                    fontWeight="600"
                    rounded="xl">
                    Delivery Charge:₹{el.delivery_charge}
                  </Text>
                </Box>
                <br></br>
                <br></br>
                {el.order_data.map((pri) => {
                  tprice = tprice + pri.price
                })}
                {el.order_data.map((ele) => (
                  <Stack
                    p={2}
                    py={5}
                    w="full"
                    justifyContent={{
                      base: 'flex-start',
                      md: 'space-around',
                    }}
                    direction={{
                      base: 'column',
                      md: 'row',
                    }}
                    alignItems={{ md: 'center' }}>
                    <Heading textAlign={'start'} w='220px' size={'md'}>{ele.title}</Heading>
                    <Text textAlign={'start'} w={'100px'}>Price: ₹{ele.price}</Text>
                    <Text>Quantity: {ele.quantity}</Text>
                    <Heading size={'sm'}>{"Addons:"}</Heading>

                    {ele.Addons.map((desc, id) => (

                      <List key={desc.id} spacing={3} textAlign="start">
                        {desc.Extra_Sauce.current > 0 ? <ListItem ><ListIcon as={FaCheckCircle} color="green.500" />Extra Sauce: ₹{desc.Extra_Sauce.current}</ListItem> : <ListItem display={'none'}></ListItem>}
                        {desc.Yogurt.current > 0 ? <ListItem ><ListIcon as={FaCheckCircle} color="green.500" />Yogurt: ₹{desc.Yogurt.current}</ListItem> : <ListItem display={'none'}></ListItem>}
                        {desc.Cheese.current > 0 ? <ListItem ><ListIcon as={FaCheckCircle} color="green.500" />Cheese: ₹{desc.Cheese.current}</ListItem> : <ListItem display={'none'}></ListItem>}
                        {desc.Corn.current > 0 ? <ListItem ><ListIcon as={FaCheckCircle} color="green.500" />Corn: ₹{desc.Corn.current}</ListItem> : <ListItem display={'none'}></ListItem>}
                        {desc.Cabbage.current > 0 ? <ListItem ><ListIcon as={FaCheckCircle} color="green.500" />Cabbage: ₹{desc.Cabbage.current}</ListItem> : <ListItem display={'none'}></ListItem>}
                        {desc.Fenugreek.current > 0 ? <ListItem ><ListIcon as={FaCheckCircle} color="green.500" />Fenugreek: ₹{desc.Fenugreek.current}</ListItem> : <ListItem display={'none'}></ListItem>}
                      </List>
                    ))}
                    {ele.Addons.map((e) => {
                      Tsum = Tsum + e.Extra_Sauce.current + e.Yogurt.current + e.Cheese.current + e.Corn.current + e.Cabbage.current + e.Fenugreek.current;
                    })}
                    <br></br>
                    <Stack>
                    </Stack>
                  </Stack>
                ))}
                <Center>
                  <Heading>
                    <Text as={'span'} color={'green.400'}>
                      <span></span>
                      Total Price: ₹{el.delivery_charge + Tsum + tprice}
                    </Text>
                  </Heading>
                </Center>
                <br></br>

                <Text display={'none'}>{tprice = 0}</Text>
                <Text display={'none'}>{Tsum = 0}</Text>
              </Box>

            ))
          }
        </Stack>

      </Box>
    </>
  )
}
