import {
  Box,
  useStyleConfig,
  defineStyleConfig,
  HTMLChakraProps,
  ThemingProps,
  forwardRef,
} from '@chakra-ui/react';

export const CardStyle = defineStyleConfig({
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
  },
  variants: {
    main: {
      borderRadius: '4px',
      borderColor: 'brand.500',
      borderWidth: 1,
      bg: 'brand.800',
      width: '100%',
    },
    withHover: {
      borderRadius: '4px',
      borderColor: 'brand.500',
      borderWidth: 1,
      bg: 'brand.600',
      width: '100%',
      _hover: {
        boxSizing: 'border-box',
        outline: '1px solid',
        outlineColor: 'brand.400',
        outlineOffset: '0',
        borderRadius: '4px',
        bg: 'brand.800',
      },
    },
  },
  defaultProps: {
    variant: 'main',
  },
});

export interface CardProps extends HTMLChakraProps<'div'>, ThemingProps {}

export const Card = forwardRef<CardProps, 'div'>((props, ref) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig('Card', { variant: variant ?? 'main' });

  return <Box ref={ref} __css={styles} {...rest} />;
});
