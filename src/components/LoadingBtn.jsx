import React, { Fragment } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const LoadingBtn = ({ loading, ...props }) => {
  return (
    <Button variant="primary" {...props}>
      {loading ? (
        <Fragment>
          {' '}
          <Spinner animation="border" variant="light" size='sm' /> &nbsp; Loading...
        </Fragment>
      ) : (
        'ارسال'
      )}
    </Button>
  );
};

export default LoadingBtn;
