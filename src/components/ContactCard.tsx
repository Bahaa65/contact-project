import React from 'react';

type ContactCardProps = {
  name: string;
  phone: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ name, phone }) => {
  return (
    <div className="contact-card">
      <h3>{name}</h3>
      <p>{phone}</p>
    </div>
  );
};

export default ContactCard;
