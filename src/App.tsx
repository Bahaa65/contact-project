import React, { useState } from 'react';
import './App.css';
import ContactCard from './components/ContactCard';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

 
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Header />
      <SearchBar setSearchQuery={setSearchQuery} />
      <ContactForm setContacts={setContacts} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
}

export default App;
