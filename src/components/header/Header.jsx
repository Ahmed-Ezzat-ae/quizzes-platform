import React, { Fragment } from 'react';
import { Button, Container, Nav, NavLink, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { logOut } from '../../redux/slices/users/login';
import { Link } from 'react-router-dom';

const Header = () => {

  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    window.location.href = '/login';
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-0 text-primary fw-bold fs-2">
          المنصة
        </Navbar.Brand>

        <Nav className="me-auto">
          {userData?.token ? (
            <Fragment>
              <div className={styles.profile} onClick={handleLogOut}>
                <span>{userData?.username?.charAt(0)?.toUpperCase()}</span>
              </div>
            </Fragment>
          ) : (
            <Button as={NavLink} to="/login">
              تسجيل
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
