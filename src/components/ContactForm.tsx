import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';

type Contact = {
  id?: string;
  name: string;
  phone: string;
  email: string;
};

type ContactFormProps = {
  onSubmit: (contact: Contact) => void;
  buttonText: string;
  initialData?: Contact;
  contacts?: Contact[];
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, buttonText, contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const initialContact = contacts?.find(contact => contact.id === id);

  const [name, setName] = useState(initialContact?.name || '');
  const [phone, setPhone] = useState(initialContact?.phone || '');
  const [email, setEmail] = useState(initialContact?.email || '');

  useEffect(() => {
    if (initialContact) {
      setName(initialContact.name);
      setPhone(initialContact.phone);
      setEmail(initialContact.email);
    }
  }, [initialContact]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value;
    if (/^[\d]*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d+$/.test(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    onSubmit({
      id: id || undefined,
      name,
      phone,
      email,
    });
    toast({
      title: id ? "Contact updated" : "Contact added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            type="tel"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            type="email"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
};

export default ContactForm;
