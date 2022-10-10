import { Input } from '@chakra-ui/react';
import { Card } from '@relay-app/ui';
import { useNavigate } from 'react-router-dom';

export function CreatePostButton() {
  const navigate = useNavigate();

  return (
    <Card height="6vh">
      <Card
        as={Input}
        fontSize="sm"
        color="brand.200"
        variant="withHover"
        placeholder="Create Post"
        height="100%"
        onClick={() => navigate('submit')}
      />
    </Card>
  );
}
