import React, { Fragment, useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuiz } from '../../redux/slices/quiz/quiz';
import Loading from '../../components/Loading';
import AlertMessage from '../../components/AlertMessage';
import styles from './style.module.css';
import { Button, Row, Stack } from 'react-bootstrap';
import RadioBtn from '../../components/RadioBtn';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

const TakeQuiz = () => {
  const { loading, error, questions } = useSelector((state) => state.quiz);
  const [qNumber, setQNumber] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem('answers')) || []
  );
  const [wrongAnswers, setWrongAnswers] = useState(
    JSON.parse(localStorage.getItem('wrongAnswers')) || []
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const initialValues = {
    answer: '',
  };

  const validationSchema = Yup.object().shape({
    answer: Yup.string().required('يجب ان تحدد اجابة'),
  });

  const handleNextQ = () => {
    if (qNumber < questions.length - 1) {
      setQNumber((prev) => prev + 1);
    }
  };

  const handlePrevQ = () => {
    if (qNumber < questions.length && qNumber > 0) {
      setQNumber((prev) => prev - 1);
    }
  };

  const handleSubmit = (_, props) => {
    let res = questions.filter(
      (q, index) => q.correctAnswer !== answers[index]
    );
    setWrongAnswers(res);
    localStorage.setItem('wrongAnswer', JSON.stringify(res));
    props.resetForm();
    setSubmitted(true);
  };

  const reTest = () => {
    localStorage.removeItem('answers');
    localStorage.removeItem('wrongAnswer');
    window.location.reload();
  };



  useEffect(() => {

    localStorage.removeItem('answers');
    localStorage.removeItem('wrongAnswer');
    dispatch(getQuiz(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage type="error" msg={error} />
      ) : questions.length ? (
        <div>
          <h2 className={styles.question}>
            {questions[qNumber].question} ( {qNumber + 1} ){' '}
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Row>
                    <RadioBtn
                      name="answer"
                      label="اختر الاجابة الصحيحة"
                      options={questions[qNumber].options}
                      setAnswers={setAnswers}
                      answers={answers}
                      qNumber={qNumber}
                      submitted={submitted}
                    />
                  </Row>
                  <Stack direction="horizontal" className="my-3" gap={3}>
                    <Button
                      variant="outline-success"
                      onClick={handleNextQ}
                      disabled={qNumber >= questions.length - 1 || submitted}
                    >
                      التالى
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={handlePrevQ}
                      disabled={qNumber <= 0 || submitted}
                    >
                      السابق
                    </Button>
                  </Stack>
                  {answers.length === questions.length ? (
                    <Button
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                      className={styles.submitBtn}
                    >
                      ارسال
                    </Button>
                  ) : (
                   null
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : null}

      {submitted ? (
        <div className="mt-5">
          <h3>
            لقد احرزت
            {` ${questions.length - wrongAnswers.length} / ${questions.length}`}
          </h3>

          {wrongAnswers.length
            ? wrongAnswers.map((a) => (
                <div key={a._id} className="my-4">
                  <h4 className="text-primary">{a.question}</h4>
                  <p>{a.correctAnswer}</p>
                </div>
              ))
            : null}

          <Button onClick={reTest} className="mt-3">
            اعاده الاختبار
          </Button>
        </div>
      ) : null}
    </Fragment>
  );
};

export default TakeQuiz;
