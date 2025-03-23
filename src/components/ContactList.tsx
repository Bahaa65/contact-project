import React from 'react';
import ContactCard from './ContactCard';

type ContactListProps = {
  contacts: { name: string; phone: string }[];
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact, index) => (
        <ContactCard key={index} name={contact.name} phone={contact.phone} />
      ))}
    </div>
  );
};

export default ContactList;
