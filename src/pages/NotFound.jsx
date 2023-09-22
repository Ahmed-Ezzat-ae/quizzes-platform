import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      return navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <Container>
      <Alert variant="danger" className="mt-5">
        هذه الصفحة غير موجودة
      </Alert>
    </Container>
  );
};

export default NotFound;
