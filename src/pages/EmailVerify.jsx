import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserEmail } from '../redux/slices/users/verify-email';

const EmailVerify = () => {
  const { error, message } = useSelector((state) => state.verifyEmail);
  const params = useParams(); /* { id, token } */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUserEmail(params));
  }, [dispatch, params]);

  return (
    <Container>
      {message ? (
        <Fragment>
          <AlertMessage type="success" msg={message} />
          <Link to="/login">تسجيل الدخول</Link>
        </Fragment>
      ) : (
        <AlertMessage type="error" msg={error} />
      )}
    </Container>
  );
};

export default EmailVerify;
