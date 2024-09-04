import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  useColorModeValue,
  Box,
  Text,
  VStack,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { FaRupeeSign, FaMapMarkerAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrders } from '../Redux/action';
import { useState } from 'react';

export default function Checkout({ cart }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States for delivery charges
  const [first_dist] = useState(0);
  const [second_dist] = useState(15);
  const [third_dist] = useState(25);
  const [last_dist] = useState(40);

  const sendOrders = (cart, charge) => {
    const preparedCart = cart.map((item, index) => ({
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      Addons: item.Addons.map(addon => ({
        Extra_Sauce: addon.Extra_Sauce,
        Yogurt: addon.Yogurt,
        Cheese: addon.Cheese,
        Corn: addon.Corn,
        Cabbage: addon.Cabbage,
        Fenugreek: addon.Fenugreek,
      })),
      id: item.id || index + 1, // Ensure each item has a unique id
    }));

    const data = {
      order_data: preparedCart,
      delivery_charge: charge,
      id: Date.now(), // Unique order ID
    };

    dispatch(addOrders(data));
  };

  return (
    <Box>
      <Button
        rounded={'none'}
        w={'full'}
        mt={8}
        size={'lg'}
        py={'7'}
        bg={useColorModeValue('blue.600', 'blue.300')}
        color={useColorModeValue('white', 'gray.900')}
        textTransform={'uppercase'}
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'lg',
          bg: useColorModeValue('blue.700', 'blue.400')
        }}
        onClick={onOpen}
      >
        Proceed to Checkout
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={8}>
            <VStack spacing={6}>
              <Heading size="md" textAlign="center">
                Select Delivery Distance
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Choose the distance range for delivery charges
              </Text>
              <PriceWrapper>
                <DeliveryOption
                  charge={first_dist}
                  distance="Up to 5 km"
                  onClick={() => {
                    sendOrders(cart, first_dist);
                    navigate('/orders');
                  }}
                />
                <DeliveryOption
                  charge={second_dist}
                  distance="5 - 8 km"
                  onClick={() => {
                    sendOrders(cart, second_dist);
                    navigate('/orders');
                  }}
                />
                <DeliveryOption
                  charge={third_dist}
                  distance="9 - 15 km"
                  onClick={() => {
                    sendOrders(cart, third_dist);
                    navigate('/orders');
                  }}
                />
                <DeliveryOption
                  charge={last_dist}
                  distance="Above 15 km"
                  onClick={() => {
                    sendOrders(cart, last_dist);
                    navigate('/orders');
                  }}
                />
              </PriceWrapper>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function PriceWrapper({ children }) {
  return (
    <Stack
      direction="column"
      spacing={4}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius="lg"
      p={4}
      shadow="md"
      align="center"
      w="100%"
    >
      {children}
    </Stack>
  );
}

function DeliveryOption({ charge, distance, onClick }) {
  return (
    <Button
      onClick={onClick}
      h={'50px'}
      w="full"
      colorScheme="teal"
      variant="outline"
      leftIcon={<FaMapMarkerAlt />}
      rightIcon={<FaRupeeSign />}
      _hover={{
        bg: useColorModeValue('teal.50', 'teal.900'),
      }}
    >
      <Text fontSize={'xl'}>{distance}</Text>
      <Text fontSize={'2xl'} ml={2}>{charge}</Text>
    </Button>
  );
}
