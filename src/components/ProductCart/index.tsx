import {
  HStack,
  Image,
  IconButton,
  Text,
  VStack,
  Flex,
  Input,
} from '@chakra-ui/react';
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';

import { ICartProduct } from '../../types/IProduct';

interface IProductCartProps {
  data: ICartProduct;
  onChange: (product: ICartProduct, value: number) => void;
  onDelete: (id: string) => void;
  onIncrement: (product: ICartProduct) => void;
  onDecrement: (product: ICartProduct) => void;
}

function ProductCart({
  data: product,
  onChange,
  onDelete,
  onIncrement,
  onDecrement,
}: IProductCartProps) {
  return (
    <HStack
      w="full"
      p="8px"
      alignItems="flex-start"
      justifyContent="flex-start"
      bgColor="gray.100"
      borderRadius="md"
    >
      <Image
        boxSize="full"
        height="full"
        width="28"
        objectFit="cover"
        objectPosition="center"
        borderRadius="10"
        src={product.image}
        alt={product.name}
      />
      <VStack pl="1.5" w="full">
        <VStack
          textAlign="left"
          alignItems="flex-start"
          justifyContent="flex-start"
          w="full"
        >
          <Flex justify="space-between" alignItems="flex-start" w="full">
            <Text fontSize="md" color="gray.900" fontWeight="bold">
              {product.name}
            </Text>

            <IconButton
              variant="ghost"
              colorScheme="red"
              aria-label="Deletar"
              size="sm"
              icon={<FiTrash />}
              onClick={() => onDelete(product.id)}
            />
          </Flex>
          <Text fontSize="sm" fontWeight="medium" color="gray.600">
            Preço: {product.formattedPrice}
          </Text>
        </VStack>
        <Flex textAlign="center">
          <IconButton
            variant="outline"
            colorScheme="gray"
            aria-label="Decrement"
            size="sm"
            icon={<FiMinus />}
            onClick={() => onDecrement(product)}
          />

          <Input
            mx="1"
            size="sm"
            type="number"
            name={`quantity-${product.id}`}
            value={product.quantity || ''}
            onChange={(event) =>
              onChange(product, Number(event.currentTarget.value))
            }
          />

          <IconButton
            variant="outline"
            colorScheme="gray"
            aria-label="Increment"
            size="sm"
            icon={<FiPlus />}
            onClick={() => onIncrement(product)}
          />
        </Flex>
      </VStack>
    </HStack>
  );
}

export { ProductCart };
