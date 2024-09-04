import React from 'react';
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
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, patchProduct } from '../Redux/action';
import Navbar from '../Components/Navbar';
import Checkout from '../Components/Checkout';

export const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Function to remove item from cart
  const removeItem = (id) => {
    dispatch(deleteProduct(id));
  };

  // Function to increase the quantity of a cart item
  const AddQtyItem = (id, currentQuantity) => {
    const updatedQuantity = currentQuantity + 1;
    dispatch(patchProduct(id, updatedQuantity));
  };

  // Function to decrease the quantity of a cart item
  const DecreQtyItem = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      dispatch(patchProduct(id, updatedQuantity));
    }
  };

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Item Image</Th>
              <Th>Addons</Th>
              <Th>Total Quantity</Th>
              <Th>Total Price</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((el) => {
              // Calculating addon details and total addon price
              let addonSummary = [];
              let addonTotal = 0;

              el.Addons.forEach((addon) => {
                if (addon.Extra_Sauce > 0) {
                  addonSummary.push('Extra Sauce');
                  addonTotal += addon.Extra_Sauce;
                }
                if (addon.Yogurt > 0) {
                  addonSummary.push('Yogurt');
                  addonTotal += addon.Yogurt;
                }
                if (addon.Cheese > 0) {
                  addonSummary.push('Cheese');
                  addonTotal += addon.Cheese;
                }
                if (addon.Corn > 0) {
                  addonSummary.push('Corn');
                  addonTotal += addon.Corn;
                }
                if (addon.Cabbage > 0) {
                  addonSummary.push('Cabbage');
                  addonTotal += addon.Cabbage;
                }
                if (addon.Fenugreek > 0) {
                  addonSummary.push('Fenugreek');
                  addonTotal += addon.Fenugreek;
                }
              });

              // Calculate the total price including addons
              const totalPrice = el.price * el.quantity + addonTotal;

              return (
                <Tr key={el._id}>
                  <Td>
                    <Link to={`/details/${el._id}`}>
                      <Box position="relative" width={150} height={150}>
                        <Image
                          rounded={'lg'}
                          height="100%"
                          width="100%"
                          objectFit={'contain'}
                          src={el.image}
                        />
                        <Text
                          position="absolute"
                          bottom={0}
                          left="50%"
                          transform="translateX(-50%)"
                          bg="rgba(0, 0, 0, 0.6)"
                          color="white"
                          width="100%"
                          textAlign="center"
                          py={1}
                        >
                          {el.title}
                        </Text>
                      </Box>
                    </Link>
                  </Td>
                  <Td>
                    <h5>{addonSummary.join(', ')}</h5>
                  </Td>
                  <Td>
                    <Flex>
                      <Button
                        borderTopRightRadius="0"
                        borderBottomRightRadius="0"
                        onClick={() => DecreQtyItem(el._id, el.quantity)}
                        isDisabled={el.quantity <= 1}
                      >
                        <MinusIcon />
                      </Button>
                      <Button as={"Text"} borderRadius="0">
                        {el.quantity}
                      </Button>
                      <Button
                        borderTopLeftRadius="0"
                        borderBottomLeftRadius="0"
                        onClick={() => AddQtyItem(el._id, el.quantity)}
                      >
                        <AddIcon />
                      </Button>
                    </Flex>
                  </Td>
                  <Td>
                    <h5>₹{totalPrice}</h5>
                  </Td>
                  <Td>
                    <Button onClick={() => removeItem(el._id)}>
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Checkout cart={cart} />
    </>
  );
};
