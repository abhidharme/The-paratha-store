import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon,
  Image
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { RiShoppingCartFill } from "react-icons/ri"
import { CartCounter } from './CartCounter';

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
          <Image cursor={'pointer'}
          objectFit={'cover'}
          borderRadius='full'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRecF6-hL5RRmVrXzJsjtvHEaaC4UvZAl4c7w&usqp=CAU' w="70px" h="70px" />
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

            <Button>
            <Link as={RouteLink} to="/cart">
              <Box position="relative" padding="0 0.5rem 0 0">
                <CartCounter/>
                <Icon as={RiShoppingCartFill} boxSize="2rem" />
              </Box>
            </Link>
          </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
              </Menu>

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}