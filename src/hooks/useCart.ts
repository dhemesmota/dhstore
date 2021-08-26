import { useContext } from 'react';

import { CartContext } from '../context/CartContext';

function useCart() {
  const { productsInCart, addToCart, removeOfCart, changeQuantityOfProduct } =
    useContext(CartContext);

  return { productsInCart, addToCart, removeOfCart, changeQuantityOfProduct };
}

export { useCart };
