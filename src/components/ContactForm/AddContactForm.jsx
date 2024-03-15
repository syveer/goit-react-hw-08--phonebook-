import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../Store/ContactSlice/ContactSlice';
import styles from './AddContactForm.module.css';

function AddContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !phone) return;
    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <div className={styles.phonebookContainer}>
      <form className={styles.addContactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          autoComplete="tel"
        />
        <button type="submit" className={styles.addContactButton}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddContactForm;
