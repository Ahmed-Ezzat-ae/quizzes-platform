import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return <div>{loading ? <Loading /> : <Outlet />}</div>;
};

export default AuthLayout;
