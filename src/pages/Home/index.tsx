import { Grid, Text, Box, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Product } from '../../components/Product';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { IProduct } from '../../types/IProduct';

export function Home() {
  const { addToCart, productsInCart } = useCart();
  const history = useHistory();

  const countTotalProductsInCart = useMemo(() => {
    return productsInCart.length;
  }, [productsInCart]);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    api
      .get<IProduct[]>('/product', { cancelToken: source.token })
      .then((response) => {
        setProducts(
          response.data.map((product) => {
            return {
              ...product,
              price: Number(product.price),
              formattedPrice: Number(product.price).toLocaleString('pt-br', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              }),
            };
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const handleAddProductToCart = (product: IProduct) => {
    addToCart(product);
  };

  return (
    <Box w="full">
      <HStack justify="space-between">
        <Text fontSize="md" color="gray.900" fontWeight="medium" mb="10">
          Todos os produtos
        </Text>

        <Tooltip hasArrow label="Ver carrinho">
          <Box position="relative">
            <IconButton
              variant="outline"
              colorScheme="gray"
              aria-label="Cart"
              icon={<FiShoppingCart />}
              onClick={() => history.push('/cart')}
            />
            <Box
              position="absolute"
              bottom="-8px"
              right="0"
              fontSize="11px"
              width="18px"
              height="18px"
              borderRadius="50%"
              bgColor="gray.300"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <span>{countTotalProductsInCart}</span>
            </Box>
          </Box>
        </Tooltip>
      </HStack>

      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={6}>
        {loading && <ProductSkeleton />}

        {!loading &&
          products.map((product) => (
            <Product
              key={product.id}
              data={product}
              onClick={() => handleAddProductToCart(product)}
            />
          ))}
      </Grid>
    </Box>
  );
}
