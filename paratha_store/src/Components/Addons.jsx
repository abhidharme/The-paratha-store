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
    Stack
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { addProduct, Add_Addons, fetchCartData } from '../Redux/action';


  
  
  
  export default function Addons({ addonsdata , id_data , title , img , price , quantity }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    
    const [sauce,setSauce] = useState(true);
    const [cheese,setCheese] = useState(true);
    const [yogurt,setYogurt] = useState(true);
    const [corn,setCorn] = useState(true);
    const [fenugreek,setFenugreek] = useState(true);
    const [cabbage,setCabbage] = useState(true);
  
    const sauce1 = useRef(0);
    const cheese1 = useRef(0);
    const yogurt1 = useRef(0);
    const corn1 = useRef(0);
    const fenugreek1 = useRef(0);
    const cabbage1 = useRef(0);
    const dispatch = useDispatch();

    const addCart = (title, image, price,addonsdata,id) => {
        var data = {
          title: title,
          image: image,
          price: price,
          Addons: addonsdata,
          quantity: 1
        }
     
        dispatch(addProduct(data))

        sauce1.current =0;
        yogurt1.current =0;
        cheese1.current =0;
        corn1.current=0;
        cabbage1.current=0;
        fenugreek1.current=0;

        dispatch(Add_Addons(id,sauce1,yogurt1,cheese1,corn1,cabbage1,fenugreek1))

       
      }

    const handleChange = (id,data)=>{
        if(data == 5){
          if(sauce == true){
            sauce1.current = data;
          }
          else if(!sauce){
            sauce1.current = 0;
          }
          setSauce(!sauce)
        }
        if(data == 15){
          if(yogurt == true){
           yogurt1.current = 15;
          }
          else if(!yogurt){
            yogurt1.current = 0;
         }
          setYogurt(!yogurt)
        }
        if(data == 20){
          if(cheese == true){
            cheese1.current = 20;
          }
          else if(!cheese){
            cheese1.current = 0;
         }
          setCheese(!cheese)
        }
        if(data == 10){
          if(corn == true){
           corn1.current=10;
          }
          else if(!corn){
            corn1.current =0;
         }
          setCorn(!corn)
        }
        if(data == 16){
          if(cabbage == true){
           cabbage1.current = 15; 
          }
          else if(!cabbage){
            cabbage1.current = 0;
         }
          setCabbage(!cabbage)
        }
        if(data == 11){
          if(fenugreek == true){
           fenugreek1.current = 10;
          }
          else if(!fenugreek){
            fenugreek1.current =0;
         }
          setFenugreek(!fenugreek)
        }
          dispatch(Add_Addons(id,sauce1,yogurt1,cheese1,corn1,cabbage1,fenugreek1))
          dispatch(fetchCartData())  
      }

     var sum_of_addoms = 0;

      addonsdata.map((ele)=>{
        sum_of_addoms = sum_of_addoms+ele.Extra_Sauce.current+ele.Yogurt.current+ele.Cheese.current+ele.Corn.current+ele.Cabbage.current+ele.Fenugreek.current
      })
      
   

    

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
        ADD TO CART
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Addons</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {addonsdata.map((e) => (
                      
                <Stack spacing={2}>

                {id_data == 3 ? <Checkbox isDisabled>{'Extra Sauce (₹5)'}</Checkbox> : <Checkbox value={5} onChange={()=>handleChange(id_data,5)} colorScheme='green'>{'Extra Sauce (₹5)'}</Checkbox> }

                {id_data == 1 || id_data == 3 ? <Checkbox  isDisabled>{'Yogurt (₹15)'}</Checkbox>  : <Checkbox  value={15} onChange={()=>handleChange(id_data,15)} colorScheme='green'>{'Yogurt (₹15)'}</Checkbox> }
                
                {id_data == 1 || id_data == 4 ? <Checkbox isDisabled value={20} onChange={()=>handleChange(id_data,20)} colorScheme='green'>{'Extra Cheese (₹20)'}</Checkbox> : <Checkbox value={20} onChange={()=>handleChange(id_data,20)} colorScheme='green'>{'Extra Cheese (₹20)'}</Checkbox>  }
                
                {id_data == 1 || id_data == 2 || id_data == 5 ? <Checkbox isDisabled value={10} onChange={()=>handleChange(id_data,10)} colorScheme='green'>{'Corn (₹10)'}</Checkbox> :  <Checkbox value={10} onChange={()=>handleChange(id_data,10)} colorScheme='green'>{'Corn (₹10)'}</Checkbox>  }
                
                {id_data != 3  ?  <Checkbox isDisabled>{'Fenugreek (₹10)'}</Checkbox> : <Checkbox value={11} onChange={()=>handleChange(id_data,11)} colorScheme='green'>{'Fenugreek (₹10)'}</Checkbox>  }
                
                {id_data != 3  ? <Checkbox isDisabled>{'Cabbage (₹15)'}</Checkbox>  : <Checkbox value={16} onChange={()=>handleChange(id_data,16)} colorScheme='green'>{'Cabbage (₹15)'}</Checkbox> }
                </Stack>
            ))}
  
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => { onClose();addCart(title,img,price,addonsdata,id_data)}}>
                Confirm ₹{price+sum_of_addoms}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  }