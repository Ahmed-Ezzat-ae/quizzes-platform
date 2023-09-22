import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';

const RootLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <Header />
      <Container className="py-4">
        {loading ? <Loading /> : <Outlet />}
      </Container>
    </div>
  );
};

export default RootLayout;
