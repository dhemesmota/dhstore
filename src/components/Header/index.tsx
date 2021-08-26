import { HStack, Text } from '@chakra-ui/react';
import { FiHome, FiShoppingCart } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <HStack
      position="fixed"
      top="calc(100vh - 80px)"
      height="20"
      left="0"
      w="full"
    >
      <HStack
        justify={['flex-start', 'center']}
        bgColor="gray.900"
        borderTopRadius="md"
        height="full"
        w="full"
        px="32px"
        py="8px"
      >
        <Link to="/">
          <Text
            p={2}
            color="white"
            borderRadius="xl"
            px="10"
            bgColor={location.pathname === '/' ? 'gray.800' : 'transparent'}
            display="inline-flex"
            gridGap="8px"
            alignItems="center"
          >
            <FiHome />
            {location.pathname === '/' && 'Início'}
          </Text>
        </Link>
        <Link to="/cart">
          <Text
            p={2}
            color="white"
            borderRadius="xl"
            px="10"
            bgColor={location.pathname !== '/' ? 'gray.800' : 'transparent'}
            display="inline-flex"
            gridGap="8px"
            alignItems="center"
          >
            <FiShoppingCart />

            {location.pathname !== '/' && 'Carrinho'}
          </Text>
        </Link>
      </HStack>
    </HStack>
  );
}

export { Header };
