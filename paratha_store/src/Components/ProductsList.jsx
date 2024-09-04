import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/action';
import Addons from './Addons';



export default function ProductsList() {

  //getting products data from redux store
  const { products } = useSelector((store) => store.products);

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch fetch products actions 
    dispatch(fetchProducts())
  }, [])


  return (
    <>
    {/*maping the paratha products */}
      {products.map((el) => (

        <Container key={el.id} style={{ boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px', marginTop: "15px" }} maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
              <Image
                rounded={'md'}
                alt={'product image'}
                src={el.image}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                  {el.title}
                </Heading>

                <Text
                  fontWeight={300}
                  fontSize={'2xl'}>
                  ₹{el.price}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider
                  />
                }>
                <Stack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    fontSize={'2xl'}
                    fontWeight={'300'}>
                    {el.description}
                  </Text>
                </Stack>
                <Box>
                  {/* passing props to Addons child component for add Addons and products to cart*/}
                  <Addons addonsdata={el.Addons} mongoId={el._id} id_data={el.id} title={el.title} img={el.image} price={el.price} quantity={el.quantity} />

                </Box>
              </Stack>

            </Stack>
          </SimpleGrid>
        </Container>
      ))}
    </>
  );
}