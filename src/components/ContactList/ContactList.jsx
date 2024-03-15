import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../Store/ContactSlice/ContactSlice';
import styles from './ContactList.module.css';

function ContactList() {
  const [searchTerm, setSearchTerm] = useState('');
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact List</h2>
      <input
        type="text"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <ul className={styles.contactList}>
        {filteredContacts.map(contact => (
          <li key={contact.id} className={styles.contactItem}>
            <strong className={styles.contactName}>{contact.name}</strong>:
            <span className={styles.contactPhone}>{contact.phone}</span>
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
