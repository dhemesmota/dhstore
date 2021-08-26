import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useEffect, useState } from 'react';

import { ICartProduct, IProduct } from '../types/IProduct';

interface IChangeQuantityOfProductProps {
  id: string;
  newQuantity: number;
  newStock: number;
}

interface ICartContextData {
  productsInCart: ICartProduct[];
  addToCart: (product: IProduct) => void;
  removeOfCart: (id: string) => void;
  changeQuantityOfProduct: (data: IChangeQuantityOfProductProps) => void;
}

interface ICartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: ICartProviderProps) {
  const toast = useToast();
  const [productsInCart, setProductsInCart] = useState<ICartProduct[]>(() => {
    const products = localStorage.getItem('dhstore.productsInCart');

    if (!products) return [];

    return JSON.parse(products) as ICartProduct[];
  });

  useEffect(() => {
    localStorage.setItem(
      'dhstore.productsInCart',
      JSON.stringify(productsInCart)
    );
  }, [productsInCart]);

  const addToCart = useCallback(
    (newProduct: IProduct) => {
      if (!productsInCart.find((product) => product.id === newProduct.id)) {
        setProductsInCart([
          ...productsInCart,
          { ...newProduct, quantity: 1, stock: newProduct.stock - 1 },
        ]);

        toast({
          description: `Produto '${newProduct.name}' adicionado ao carrinho!`,
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
      } else {
        toast({
          description: `O produto '${newProduct.name}' já foi adicionado ao carrinho!`,
          position: 'top-right',
          isClosable: true,
          status: 'warning',
        });
      }
    },
    [productsInCart]
  );

  const removeOfCart = useCallback((id: string) => {
    setProductsInCart((state) => state.filter((product) => product.id !== id));
    toast({
      description: 'Produto removido do carrinho!',
      position: 'top-right',
      isClosable: true,
      status: 'info',
    });
  }, []);

  const changeQuantityOfProduct = useCallback(
    ({ id, newQuantity, newStock }: IChangeQuantityOfProductProps) => {
      if (newQuantity < 1 || newQuantity > newStock) return;

      setProductsInCart((state) =>
        state.map((product) =>
          product.id === id
            ? {
                ...product,
                formattedPrice: Number(
                  product.price * newQuantity
                ).toLocaleString('pt-br', {
                  minimumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                }),
                quantity: newQuantity,
                stock: newStock,
              }
            : product
        )
      );
    },
    []
  );

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        addToCart,
        removeOfCart,
        changeQuantityOfProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
