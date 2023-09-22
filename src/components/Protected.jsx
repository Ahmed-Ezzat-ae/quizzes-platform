import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const { userData } = useSelector((state) => state.login);
  return userData?.token ? children : <Navigate to="/login" replace={true} />;
};

export default Protected;
