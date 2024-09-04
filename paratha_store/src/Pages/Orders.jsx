import {
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Box,
  Center,
  Image,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Redux/action';
import Navbar from '../Components/Navbar';

export const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.products);

  return (
    <>
      <Box>
        <Navbar />
      </Box>
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
                <Heading position={'absolute'} top="14px" size={'lg'}>
                  <Text color="purple.400">Your Orders</Text>
                </Heading>
              </Center>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          {orders.map((order) => {
            let totalPrice = 0;
            let totalAddonsPrice = 0;

            return (
              <Box
                key={order._id}
                position={'relative'}
                style={{
                  boxShadow:
                    'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
                  marginBottom: '20px',
                }}>
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
                    Delivery Charge: ₹{order.delivery_charge}
                  </Text>
                </Box>
                <Box p={4}>
                  {order.order_data.map((item) => {
                    totalPrice += item.price * item.quantity;
                    const addonsTotal = item.Addons.reduce((sum, addon) => {
                      return (
                        sum +
                        (addon.Extra_Sauce || 0) +
                        (addon.Yogurt || 0) +
                        (addon.Cheese || 0) +
                        (addon.Corn || 0) +
                        (addon.Cabbage || 0) +
                        (addon.Fenugreek || 0)
                      );
                    }, 0);

                    totalAddonsPrice += addonsTotal;

                    return (
                      <Stack
                        key={item._id}
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
                        <Image
                          src={item.image}
                          alt={item.title}
                          boxSize="150px"
                          objectFit="cover"
                          borderRadius="lg"
                        />
                        <Heading textAlign={'start'} w="220px" size={'md'}>
                          {item.title}
                        </Heading>
                        <Text textAlign={'start'} w={'100px'}>
                          Price: ₹{item.price}
                        </Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Heading size={'sm'}>{"Addons:"}</Heading>
                        <List spacing={3} textAlign="start">
                          {item.Addons.map((addon, id) => (
                            <React.Fragment key={id}>
                              {addon.Extra_Sauce > 0 && (
                                <ListItem>
                                  <ListIcon
                                    as={FaCheckCircle}
                                    color="green.500"
                                  />
                                  Extra Sauce: ₹{addon.Extra_Sauce}
                                </ListItem>
                              )}
                              {addon.Yogurt > 0 && (
                                <ListItem>
                                  <ListIcon
                                    as={FaCheckCircle}
                                    color="green.500"
                                  />
                                  Yogurt: ₹{addon.Yogurt}
                                </ListItem>
                              )}
                              {addon.Cheese > 0 && (
                                <ListItem>
                                  <ListIcon
                                    as={FaCheckCircle}
                                    color="green.500"
                                  />
                                  Cheese: ₹{addon.Cheese}
                                </ListItem>
                              )}
                              {addon.Corn > 0 && (
                                <ListItem>
                                  <ListIcon
                                    as={FaCheckCircle}
                                    color="green.500"
                                  />
                                  Corn: ₹{addon.Corn}
                                </ListItem>
                              )}
                              {addon.Cabbage > 0 && (
                                <ListItem>
                                  <ListIcon
                                    as={FaCheckCircle}
                                    color="green.500"
                                  />
                                  Cabbage: ₹{addon.Cabbage}
                                </ListItem>
                              )}
                              {addon.Fenugreek > 0 && (
                                <ListItem>
                                  <ListIcon
                                    as={FaCheckCircle}
                                    color="green.500"
                                  />
                                  Fenugreek: ₹{addon.Fenugreek}
                                </ListItem>
                              )}
                            </React.Fragment>
                          ))}
                        </List>
                      </Stack>
                    );
                  })}
                </Box>
                <Center>
                  <Heading>
                    <Text as={'span'} color={'green.400'}>
                      Total Price: ₹
                      {order.delivery_charge + totalPrice + totalAddonsPrice}
                    </Text>
                  </Heading>
                </Center>
                <br />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};
