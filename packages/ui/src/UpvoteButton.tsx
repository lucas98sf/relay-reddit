import { ArrowUpIcon } from '@chakra-ui/icons';
import { Button, IconButton } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export function UpvoteButton({
  direction,
  ...props
}: ComponentProps<typeof IconButton> & { direction: 'up' | 'down' }) {
  return (
    <IconButton
      {...props}
      variant="unstyled"
      borderRadius="4px"
      icon={<ArrowUpIcon />}
      as={Button}
      h="8"
      transform={direction === 'up' ? 'none' : 'rotate(180deg)'}
      display="flex"
      _hover={{
        color: direction === 'up' ? 'red' : 'blue',
      }}
    />
  );
}
