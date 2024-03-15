import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../src/components/Store/ContactSlice/ContactSlice'; // Modificați importurile pentru a corespunde acțiunilor din ContactSlice

export const useContacts = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    isLoading,
    error,
  } = useSelector(state => state.contacts);

  const fetchContactsFromAPI = () => {
    dispatch(fetchContacts());
  };

  const createContact = contactData => {
    dispatch(addContact(contactData));
  };

  const removeContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return {
    contacts,
    isLoading,
    error,
    fetchContacts: fetchContactsFromAPI,
    createContact,
    removeContact,
  };
};
