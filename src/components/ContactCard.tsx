import React from 'react';

type ContactCardProps = {
  name: string;
  phone: string;
  email: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ name, phone, email }) => {
  return (
    <div className="contact-card">
      <span className="contact-info">{name}</span>
      <span className="contact-info">{phone}</span>
      <span className="contact-info">{email}</span>
    </div>
  );
};

export default ContactCard;
