import { extendTheme, withDefaultColorScheme, type ThemeConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      200: '#D7DADC',
      400: '#818384',
      600: '#343536',
      700: '#161617',
      800: '#1A1A1B',
      900: '#030303',
    },
    blue: '#1870f4',
    red: '#eb001f',
  },
  styles: {
    global: {
      body: {
        color: 'brand.200',
        bg: 'brand.900',
      },
    },
  },
  components: {
    Box: {
      defaultProps: {
        bg: 'brand.800',
      },
    },
  },
});
