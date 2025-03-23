import React, { useState } from 'react';

type ContactFormProps = {
  setContacts: React.Dispatch<React.SetStateAction<any[]>>;
};

const ContactForm: React.FC<ContactFormProps> = ({ setContacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!name || !phone || !email) {
      setError('All fields are required');
      return;
    }

    // Validate name (should only contain letters)
    if (/[\d]/.test(name)) {
      setError('Name should contain only letters');
      return;
    }

    // Validate phone (should only contain numbers)
    if (!/^\d+$/.test(phone)) {
      setError('Phone number should contain only numbers');
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Add contact if all validations pass
    setContacts((prevContacts) => [
      ...prevContacts,
      { name, phone, email },
    ]);

    // Reset fields after adding contact
    setName('');
    setPhone('');
    setEmail('');
    setError('');
  };

  return (
    <div>
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
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
