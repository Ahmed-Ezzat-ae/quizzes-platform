import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBtn from '../components/LoadingBtn';
import AlertMessage from '../components/AlertMessage';
import { userRegister } from '../redux/slices/users/register';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('الاسم مطلوب'),
  email: Yup.string().email('الايميل غير صالح').required('الايميل مطلوب'),
  password: Yup.string()
    .min(6, 'كلمة المرور 6 احرف على الاقل')
    .required('كلمة المرور مطلوبة'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'كلمة المرور غير مطابقة')
    .required('تاكيد كلمة المرور مطلوبة'),
});

const Register = () => {
  const { loading, error, message } = useSelector((state) => state.register);
  const { userData } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(userRegister(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (userData?.token) {
      navigate('/');
    }
  }, [navigate, userData?.token]);

  return (
    <Container>
      <h2 className="my-5 text-center text-primary fw-bold fs-2">انشاء حساب</h2>
      {message && <AlertMessage type="success" msg={message} />}
      {error && <AlertMessage type="error" msg={error} />}
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isValid, isSubmitting }) => (
          <Form className="shadow-sm p-3">
            <Row>
              <TextField name="username" label="الاسم" xs={12} />
              <TextField name="email" label="الايميل" xs={12} type="email" />
              <TextField
                name="password"
                label="كلمة المرور"
                xs={12}
                md={6}
                type="password"
              />
              <TextField
                name="confirmPassword"
                label="تاكيد كيمة المرور"
                xs={12}
                md={6}
                type="password"
              />

              <Col>
                <LoadingBtn
                  type="submit"
                  disabled={!isValid && isSubmitting}
                  className="w-100 mt-3"
                  loading={loading}
                />

                <div className="mt-3">
                  لديك حساب <Link to="/login">تسجيل الدخول</Link>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
