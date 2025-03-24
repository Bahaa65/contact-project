import React from 'react';
import { Box, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

type ContactCardProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  onDelete?: () => void;
};

const ContactCard: React.FC<ContactCardProps> = ({ id, name, phone, email, onDelete }) => {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p={4} 
      mb={3}
      bg="white"
      shadow="sm"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <HStack justify="space-between" align="center">
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold" fontSize="lg">{name}</Text>
          <Text color="gray.600">{phone}</Text>
          <Text color="gray.600">{email}</Text>
        </VStack>
        <HStack>
          <Link to={`/edit/${id}`}>
            <IconButton
              aria-label="Edit contact"
              icon={<EditIcon />}
              size="sm"
              colorScheme="blue"
            />
          </Link>
          {onDelete && (
            <IconButton
              aria-label="Delete contact"
              icon={<DeleteIcon />}
              size="sm"
              colorScheme="red"
              onClick={onDelete}
            />
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default ContactCard;