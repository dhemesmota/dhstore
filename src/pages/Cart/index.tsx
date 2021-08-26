import { Box, HStack, Text, Flex, Grid, Button } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { ProductCart } from '../../components/ProductCart';
import { useCart } from '../../hooks/useCart';
import { ICartProduct } from '../../types/IProduct';

export function Cart() {
  const { productsInCart, removeOfCart, changeQuantityOfProduct } = useCart();

  const handleRemoveProductToCart = (id: string) => {
    removeOfCart(id);
  };

  const handleIncrementQuantityOfProductToCart = (product: ICartProduct) => {
    changeQuantityOfProduct({
      id: product.id,
      newQuantity: product.quantity + 1,
      newStock: product.stock - 1,
    });
  };

  const handleDecrementQuantityOfProductToCart = (product: ICartProduct) => {
    changeQuantityOfProduct({
      id: product.id,
      newQuantity: product.quantity - 1,
      newStock: product.stock + 1,
    });
  };

  const handleChangeQuantityOfProductToCart = (
    product: ICartProduct,
    quantity: number
  ) => {
    changeQuantityOfProduct({
      id: product.id,
      newQuantity: quantity,
      newStock:
        quantity > product.quantity
          ? product.stock - quantity
          : product.stock + quantity,
    });
  };

  return (
    <Box w="full">
      <HStack mb="10">
        <Link to="/">
          <Flex alignItems="center">
            <FiArrowLeft />
            <Text fontSize="md" color="gray.900" fontWeight="medium">
              Voltar
            </Text>
          </Flex>
        </Link>
      </HStack>

      <Grid templateColumns="1fr" gap={6}>
        {!productsInCart.length && (
          <Text fontSize="md" textAlign="center" p="10">
            Nenhum produto adicionado ao carrinho.
          </Text>
        )}

        {productsInCart.map((product) => (
          <ProductCart
            key={product.id}
            data={product}
            onChange={(product, value) =>
              handleChangeQuantityOfProductToCart(product, value)
            }
            onDelete={() => handleRemoveProductToCart(product.id)}
            onDecrement={(product) =>
              handleDecrementQuantityOfProductToCart(product)
            }
            onIncrement={(product) =>
              handleIncrementQuantityOfProductToCart(product)
            }
          />
        ))}
      </Grid>

      <Box py="10" display="flex" justifyContent="flex-end">
        <Button colorScheme="green">Comprar</Button>
      </Box>
    </Box>
  );
}
