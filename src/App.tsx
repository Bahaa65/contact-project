import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Button, Flex, Container, useToast } from '@chakra-ui/react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString(),
    };
    setContacts((prev) => [...prev, contact]);
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    if (!updatedContact.id) return;

    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter(contact => contact.id !== id));
    toast({
      title: "Contact deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.md" py={8}>
        <Flex mb={4} gap={4}>
          <Link to="/">
            <Button colorScheme="teal">View Contacts</Button>
          </Link>
          <Link to="/add">
            <Button colorScheme="blue">Add Contact</Button>
          </Link>
        </Flex>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <Box mt={6}>
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <Box textAlign="center">Loading...</Box>
                ) : (
                  <ContactList
                      contacts={filteredContacts}
                      onDeleteContact={handleDeleteContact} onEditContact={function (_id: string): void {
                        throw new Error('Function not implemented.');
                      } }                  />
                )
              }
            />
            <Route
              path="/add"
              element={
                <ContactForm
                  onSubmit={handleAddContact}
                  buttonText="Add Contact"
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ContactForm
                  onSubmit={handleUpdateContact}
                  buttonText="Update Contact"
                  contacts={contacts}
                />
              }
            />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
