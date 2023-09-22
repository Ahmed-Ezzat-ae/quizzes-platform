import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginMsg, userLogin } from '../redux/slices/users/login';
import LoadingBtn from '../components/LoadingBtn';
import AlertMessage from '../components/AlertMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('الايميل غير صالح').required('الايميل مطلوب'),
  password: Yup.string()
    .min(6, 'كلمة المرور 6 احرف على الاقل')
    .required('كلمة المرور مطلوبة'),
});

const Login = () => {
  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.login);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    dispatch(userLogin(values));
  };

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        dispatch(clearLoginMsg());
        window.location.href = '/';
      }, 2000);
    }

    if (userData?.token) {
      navigate('/');
    }
    return () => clearTimeout(timer);
  }, [message, dispatch, navigate, userData]);

  return (
    <Container>
      <h2 className="my-5 text-center text-primary fw-bold fs-2">تسجيل الدخول</h2>
      {message && <AlertMessage type="success" msg={message} />}
      {error && <AlertMessage type="error" msg={error} />}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isValid, isSubmitting }) => (
          <Form className="shadow-sm p-3">
            <Row>
              <TextField name="email" label="الايميل" xs={12} type="email" />
              <TextField
                name="password"
                label="كلمة المرور"
                xs={12}
                type="password"
              />

              <Col>
                <LoadingBtn
                  loading={loading}
                  disabled={!isValid && isSubmitting}
                  type="submit"
                />

                <div className="mt-3">
                  ليس لديك حساب <Link to="/register">انشاء حساب</Link>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
