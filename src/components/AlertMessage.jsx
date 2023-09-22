import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ type, msg }) => {
  if (type === 'success') {
    return (
      <Alert variant="success" className="my-4">
        {msg}
      </Alert>
    );
  }

  return (
    <Alert variant="danger" className="my-4">
      {msg}
    </Alert>
  );
};

export default AlertMessage;
