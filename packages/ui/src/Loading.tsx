import { Center, Flex, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Center h="100vh">
      <Flex alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    </Center>
  );
}
