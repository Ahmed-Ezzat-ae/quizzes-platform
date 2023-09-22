import { useField } from 'formik';
import React from 'react';
import { Col, Form } from 'react-bootstrap';

const SelectBox = ({ label, name, options, xs, md }) => {
  const [field, meta] = useField(name);

  return (
    <Col md={md} xs={xs}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        {...field}
        aria-label=""
        className="mb-3"
        isInvalid={meta.touched && meta.error}
        isValid={!meta.error && meta.touched}

      >
        <option value="">{label}</option>
        {options.map((_, index) => (
          <option key={index} value={index}>
            {index+1}
          </option>
        ))}
      </Form.Select>

      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </Col>
  );
};

export default SelectBox;
