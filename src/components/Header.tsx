import React from 'react';
import { Box, Heading, Container, Flex } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';

const Header: React.FC = () => {
  return (
    <Box bg="teal.500" color="white" py={4} shadow="md">
      <Container maxW="container.md">
        <Flex justify="space-between" align="center">
          <Heading size="lg">Contact Manager</Heading>
          <ColorModeButton />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;