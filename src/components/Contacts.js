import React from 'react';
import ContactForm from './ContactForm/AddContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const Contacts = () => {
  return (
    <div className="view__container">
      <h2 className="home__title">
        Enter a name and phone number to add a contact
      </h2>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default Contacts;
