import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './components/List';
import Details from './components/Details';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
};

export default MyRoutes;
