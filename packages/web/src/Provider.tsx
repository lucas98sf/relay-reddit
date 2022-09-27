import { ChakraProvider } from '@chakra-ui/react';
// import { theme } from '@relay-app/ui/theme';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';

import { RelayEnvironment } from './relay';

interface Props {
  children: React.ReactElement;
}

export function Provider({ children }: Props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <BrowserRouter>
        {/* <AuthProvider> */}
        {/* <ChakraProvider theme={theme}>{children}</ChakraProvider> */}
        <ChakraProvider>{children}</ChakraProvider>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}
