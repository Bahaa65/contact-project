import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import ContactCard from './ContactCard';

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

type ContactListProps = {
  contacts: Contact[];
  onDeleteContact: (id: string) => void;
  onEditContact: (id: string) => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          No contacts found. Add some contacts to get started!
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
          email={contact.email}
          onDelete={() => onDeleteContact(contact.id)}
        />
      ))}
    </VStack>
  );
};

export default ContactList;