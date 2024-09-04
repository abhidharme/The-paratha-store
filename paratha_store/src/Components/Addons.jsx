import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Box,
  Checkbox,
  Stack,
  useToast
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addProduct, Add_Addons, fetchCartData } from '../Redux/action';

export default function Addons({ addonsdata, id_data, title, img, price, mongoId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State to manage addon selections
  const [selectedAddons, setSelectedAddons] = useState({
    Extra_Sauce: addonsdata?.Extra_Sauce?.current || 0,
    Yogurt: addonsdata?.Yogurt?.current || 0,
    Cheese: addonsdata?.Cheese?.current || 0,
    Corn: addonsdata?.Corn?.current || 0,
    Cabbage: addonsdata?.Cabbage?.current || 0,
    Fenugreek: addonsdata?.Fenugreek?.current || 0,
  });

  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (addonKey, price) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonKey]: prev[addonKey] === 0 ? price : 0,
    }));
  };

  const addCart = () => {
    const addonsArray = [selectedAddons]; // Converting object to array as per your schema

    const data = {
      title,
      image: img,
      price,
      Addons: addonsArray,
      quantity: 1,
    };

    // Dispatch to add product to cart
    dispatch(addProduct(data));

    // Reset addons after adding to cart
    setSelectedAddons({
      Extra_Sauce: 0,
      Yogurt: 0,
      Cheese: 0,
      Corn: 0,
      Cabbage: 0,
      Fenugreek: 0,
    });

    // Dispatch to update the addons in the database
    dispatch(Add_Addons(mongoId, selectedAddons));
    dispatch(fetchCartData());

    toast({
      title: `Successfully Added to Cart`,
      position: 'top',
      status: "success",
      isClosable: true,
    });

    onClose(); // Close the modal after adding to cart
  };

  const sum_of_addons = Object.values(selectedAddons).reduce((acc, curr) => acc + curr, 0);

  return (
    <Box>
      {/* Add to Cart Button with open Addons CheckBoxes popup */}
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
        ADD TO CART
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Addons</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              {/* Addons CheckBoxes */}
              <Checkbox
                isDisabled={id_data === 3}
                isChecked={selectedAddons.Extra_Sauce !== 0}
                onChange={() => handleChange('Extra_Sauce', 5)}
                colorScheme='green'
              >
                Extra Sauce (₹5)
              </Checkbox>
              <Checkbox
                isDisabled={id_data === 1 || id_data === 3}
                isChecked={selectedAddons.Yogurt !== 0}
                onChange={() => handleChange('Yogurt', 15)}
                colorScheme='green'
              >
                Yogurt (₹15)
              </Checkbox>
              <Checkbox
                isDisabled={id_data === 1 || id_data === 4}
                isChecked={selectedAddons.Cheese !== 0}
                onChange={() => handleChange('Cheese', 20)}
                colorScheme='green'
              >
                Extra Cheese (₹20)
              </Checkbox>
              <Checkbox
                isDisabled={id_data === 1 || id_data === 2 || id_data === 5}
                isChecked={selectedAddons.Corn !== 0}
                onChange={() => handleChange('Corn', 10)}
                colorScheme='green'
              >
                Corn (₹10)
              </Checkbox>
              <Checkbox
                isDisabled={id_data !== 3}
                isChecked={selectedAddons.Fenugreek !== 0}
                onChange={() => handleChange('Fenugreek', 10)}
                colorScheme='green'
              >
                Fenugreek (₹10)
              </Checkbox>
              <Checkbox
                isDisabled={id_data !== 3}
                isChecked={selectedAddons.Cabbage !== 0}
                onChange={() => handleChange('Cabbage', 15)}
                colorScheme='green'
              >
                Cabbage (₹15)
              </Checkbox>
            </Stack>
          </ModalBody>

          <ModalFooter>
            {/* Showing product price + Addons Price */}
            <Button colorScheme='blue' mr={3} onClick={addCart}>
              Confirm ₹{price + sum_of_addons}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
