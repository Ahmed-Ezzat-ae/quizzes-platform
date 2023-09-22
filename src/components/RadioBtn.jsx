import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { ErrorMessage, Field } from 'formik';

const RadioBtn = ({
  name,
  label,
  options,
  answers,
  setAnswers,
  qNumber,
  submitted,
  ...rest
}) => {
  return (
    <Form.Group className="my-4" as={Col} md={4}>
      <Form.Label>{label}</Form.Label>
      <Field name={name} {...rest}>
        {(props) => {
          const { field, meta, form } = props;

          return options.map((option, index) => (
            <Form.Check
              label={option}
              key={index}
              {...field}
              type="radio"
              value={option}
              isInvalid={meta.touched && meta.error}
              id={option}
              checked={!submitted && option === answers[qNumber]}
              disabled={submitted}
              className={`d-flex align-items-center`}
              onChange={(e) => {
                form.setFieldValue(name, e.target.value);
                answers[qNumber] = e.target.value;
                setAnswers((prev) => [...answers]);
                localStorage.setItem('answers', JSON.stringify(answers));
              }}
            />
          ));
        }}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </Form.Group>
  );
};

export default RadioBtn;
