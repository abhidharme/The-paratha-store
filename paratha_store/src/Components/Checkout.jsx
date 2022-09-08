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
  } from '@chakra-ui/react';
  import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
import { addOrders } from '../Redux/action';
import {useState} from "react"
  
  function PriceWrapper({ children }:{ children: ReactNode }) {
    return (
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: 'center', lg: 'flex-start' }}
        borderColor={useColorModeValue('gray.200', 'gray.500')}
        borderRadius={'xl'}>
        {children}
      </Box>
    );
  }
  
  
  export default function Checkout({ cart }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    var navigate = useNavigate()

    const dispatch = useDispatch();

    const [first_dist , setFirst_Dist] = useState(0);
    const [second_dist , setSecond_Dist] = useState(15);
    const [third_dist , setThird_Dist] = useState(25);
    const [last_dist , setLast_Dist] = useState(40);
   
    const sendOrders = (cart,charge)=>{
        const data = {
            order_data:cart,
            delivery_charge:charge
        }
        dispatch(addOrders(data));

    }


  
    return (
      <Box>
  
        <Button
          rounded={'none'}
          w={'full'}
          mt={8}
          size={'lg'}
          py={'7'}
          bg={useColorModeValue('gray.900', 'gray.50')}
          color={useColorModeValue('white', 'gray.900')}
          textTransform={'uppercase'}
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
          onClick={onOpen}
        >
          CHECKOUT
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
          <br></br>
          <br></br>
            <ModalBody>
            <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('red.300', 'red.700')}
                  px={3}
                  py={1}
                  color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  Delivery Charges   
                </Text>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <Box w="70%" pt={7}>
                <Button onClick={()=>{sendOrders(cart,first_dist);navigate('/orders')}} h={'50px'} w="full" colorScheme="red">
                <FaRupeeSign/> <Text fontSize={'4xl'}>0</Text> <pre> </pre><Text>upto 5 km</Text>  
                </Button>
              </Box>

              <Box w="70%" pt={7}>
              <Button onClick={()=>{sendOrders(cart,second_dist);navigate('/orders')}} h={'50px'} w="full" colorScheme="red">
              <FaRupeeSign/> <Text fontSize={'4xl'}>15</Text> <pre> </pre> <Text>5-8 km</Text>  
              </Button>
            </Box>

                <Box w="70%" pt={7}>
                  <Button onClick={()=>{sendOrders(cart,third_dist);navigate('/orders')}} h={'50px'}  w="full" colorScheme="red">
                  <FaRupeeSign/> <Text fontSize={'4xl'}>25</Text><pre> </pre><Text>9-15 km</Text>  
                  </Button>
                </Box>

                <Box w="70%" pt={7}>
                <Button onClick={()=>{setLast_Dist(40);sendOrders(cart,last_dist);navigate('/orders')}} h={'50px'} w="full" colorScheme="red">
                <FaRupeeSign/> <Text fontSize={'4xl'}>40</Text> <pre> </pre><Text>Above 15 km</Text>  
                </Button>
              </Box>
                <br></br>
                <br></br>
              </VStack>
            </Box>
          </PriceWrapper>
  
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    )
  }