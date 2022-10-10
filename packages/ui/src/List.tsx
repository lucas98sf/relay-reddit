import { StackDivider, VStack as _VStack } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export function List(props: ComponentProps<typeof _VStack>) {
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <_VStack
      spacing="1px"
      align="stretch"
      borderRadius="4px"
      borderColor="brand.500"
      borderWidth={1}
      margin={0}
      bg="brand.800"
      width="100%"
      divider={<StackDivider border="2px solid brand.500" />}
      {...props}
    />
  );
}
