import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { DefaultLayout } from './layout/DefaultLayout';
import { Router } from './routes';

function App() {
  return (
    <ChakraProvider>
      <CartProvider>
        <BrowserRouter>
          <DefaultLayout>
            <Router />
          </DefaultLayout>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
