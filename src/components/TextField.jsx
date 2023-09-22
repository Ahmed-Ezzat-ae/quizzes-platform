import React from 'react';
import { useField } from 'formik';
import { Col, Form } from 'react-bootstrap';

const TextField = ({ label, name, xs, md, ...rest }) => {
  const [field, meta] = useField(name);
  return (
    <Col xs={xs} md={md}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={label}>{label}</Form.Label>
        <Form.Control
          {...field}
          {...rest}
          id={label}
          isInvalid={meta.touched && meta.error}
          isValid={meta.touched && !meta.error}
          value={field.value}
        />
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  );
};
export default TextField;
