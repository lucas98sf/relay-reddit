import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@relay-app/ui';
import { RelayEnvironmentProvider } from 'react-relay';

import { RelayEnvironment } from './relay';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ChakraProvider theme={theme}>
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
      </ChakraProvider>
    </RelayEnvironmentProvider>
  );
}
