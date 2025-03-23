import React, { useState } from 'react';

type ContactFormProps = {
  setContacts: React.Dispatch<React.SetStateAction<any[]>>;
};

const ContactForm: React.FC<ContactFormProps> = ({ setContacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setContacts((prevContacts) => [
        ...prevContacts,
        { name, phone }
      ]);
      setName('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter phone number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
