import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Header } from '../components/Header';

interface IDefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: IDefaultLayoutProps) {
  return (
    <Container maxW="container.lg" centerContent>
      <Box padding="4" w="full" pb="24">
        {children}
      </Box>

      <Box>
        <Header />
      </Box>
    </Container>
  );
}

export { DefaultLayout };
