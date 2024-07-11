import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import { CardStyle } from "./Card";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      200: "#D7DADC",
      400: "#818384",
      500: "#343536",
      600: "#272729",
      700: "#161617",
      800: "#1A1A1B",
      900: "#030303",
    },
    blue: "#1870f4",
    red: "#eb001f",
  },
  fonts: {
    body: `"IBM Plex Sans", Arial, sans-serif`,
    heading: `"IBM Plex Sans", Arial, sans-serif`,
    mono: `"IBM Plex Sans", Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        color: "brand.200",
        bg: "brand.900",
      },
    },
  },
  textStyles: {
    h3: {
      fontSize: ["md"],
      fontWeight: "500",
      lineHeight: "24px",
    },
    h4: {
      fontSize: "xs",
      lineHeight: "16px",
    },
    a: {
      fontSize: "xs",
      lineHeight: "16px",
      _hover: {
        textDecoration: "underline",
      },
    },
  },
  components: {
    Card: CardStyle,
  },
});
