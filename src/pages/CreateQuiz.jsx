import React, { useEffect } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import { Button, Col, Row, Form as FormB } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearCreateMsg, createQuiz } from '../redux/slices/quiz/create';
import AlertMessage from '../components/AlertMessage';

const validationSchema = Yup.object().shape({
  quizName: Yup.string().required('مطلوب'),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required('مطلوب'),
      options: Yup.array()
        .of(Yup.string().required('مطلوب'))
        .required('مطلوب'),
      correctAnswer: Yup.string().required('مطلوب'),
    })
  ),
});

const CreateQuiz = () => {
  const { error, message } = useSelector((state) => state.create);
  const dispatch = useDispatch();
  const initialValues = {
    quizName: '',
    questions: [{ question: '', options: ['', '', ''], correctAnswer: '' }],
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    values.quizName = values.quizName.trim();
    values.questions.forEach((question) => {
      question.question = question.question.trim();
      question.options = question.options.map((option) => option.trim());
      question.correctAnswer = question.correctAnswer.trim();
    });
    dispatch(createQuiz(values));
    setSubmitting(false);
    resetForm();
  };

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        dispatch(clearCreateMsg());
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <div>
      <h2 className="my-4 text-primary">انشاء اسئلة الاختبار</h2>
      {error && <AlertMessage type="error" msg={error} />}
      {message && <AlertMessage type="success" msg={message} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, isSubmitting }) => {
          return (
            <Form>
              <TextField name="quizName" xs={12} label="اسم الاختبار" />

              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div>
                    {values.questions.map((question, index) => (
                      <div key={index} className="p-4 shadow-sm mb-4">
                        <TextField
                          name={`questions[${index}].question`}
                          xs={12}
                          label={`السؤال رقم ( ${index + 1} )`}
                          value={question.question}
                        />
                        <h5 className="my-4 text-primary">الاختيارات</h5>
                        <FieldArray name={`questions[${index}].options`}>
                          {(props) => {
                            const { push, remove, form } = props;
                            const { values } = form;
                            const question = values.questions[index];

                            return (
                              <div>
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex}>
                                    <Field>
                                      {({ field, form }) => {
                                        return (
                                          <Row className="d-flex align-items-center">
                                            <Col
                                              md={8}
                                              xs={12}
                                              className="d-flex align-items-center"
                                            >
                                              <FormB.Check
                                                {...field}
                                                type="radio"
                                                name={`questions[${index}].correctAnswer`}
                                                className="ms-3 mt-3"
                                                value={
                                                  option
                                                  // question.options[optionIndex]
                                                }
                                              />

                                              <ErrorMessage
                                                name={`questions[${index}].correctAnswer`}
                                                className="error"
                                                component="div"
                                              />
                                              <TextField
                                                name={`questions[${index}].options[${optionIndex}]`}
                                                xs={11}
                                                label={`الاختيار رقم (${
                                                  optionIndex + 1
                                                })`}
                                              />
                                            </Col>

                                            <Col
                                              md={4}
                                              xs={12}
                                              className="mt-3"
                                            >
                                              <Button
                                                variant="success"
                                                onClick={() => push('')}
                                                className="ms-3"
                                              >
                                                اضافة
                                              </Button>
                                              {optionIndex > 1 && (
                                                <Button
                                                  variant="danger"
                                                  onClick={() =>
                                                    remove(optionIndex)
                                                  }
                                                  // className="align-self-end"
                                                >
                                                  حذف
                                                </Button>
                                              )}
                                            </Col>
                                          </Row>
                                        );
                                      }}
                                    </Field>
                                  </div>
                                ))}
                              </div>
                            );
                          }}
                        </FieldArray>

                        <div className="mt-2 d-flex gap-3">
                          <Button
                            variant="success"
                            onClick={() =>
                              push({
                                question: '',
                                options: ['', '', ''],
                                correctAnswer: '',
                              })
                            }
                          >
                            اضافة سؤال جديد
                          </Button>

                          {index > 0 && (
                            <Button
                              onClick={() => remove(index)}
                              variant="danger"
                            >
                              حذف السؤال
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                انشاء الاختبار
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateQuiz;
