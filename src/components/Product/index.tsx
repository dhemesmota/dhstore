import { Button, Image, Center, Text, VStack } from '@chakra-ui/react';

import { IProduct } from '../../types/IProduct';

interface IProductProps {
  data: IProduct;
  onClick: (product: IProduct) => void;
}

function Product({ data: product, onClick }: IProductProps) {
  return (
    <VStack w="full" p="1">
      <VStack>
        <Image
          boxSize="full"
          height="48"
          objectFit="cover"
          objectPosition="center"
          borderRadius="10"
          src={product.image}
          alt={product.name}
        />

        <VStack textAlign="center">
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            {product.name}
          </Text>
          <Text fontSize="md" fontWeight="bold" color="gray.700">
            {product.formattedPrice}
          </Text>
        </VStack>
      </VStack>
      <Center>
        <Button
          colorScheme="gray"
          variant="outline"
          type="button"
          onClick={() => onClick(product)}
          size="sm"
        >
          Add ao carrinho
        </Button>
      </Center>
    </VStack>
  );
}

export { Product };
