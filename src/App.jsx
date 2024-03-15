import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Editor from './components/Editor';
import Admin from './components/Admin';
import ContactsPage from './components/Contacts'; // Am presupus că pagina de contacte este numită ContactsPage
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';

import AuthContext from './context/AuthProvider';

function Layout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="editor" element={<Editor />} />
      <Route path="admin" element={<Admin />} />
      <Route path="contacts" element={<ContactsPage />} />
      <Route path="lounge" element={<Lounge />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
