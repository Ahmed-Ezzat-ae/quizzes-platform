import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import { ListGroup } from 'react-bootstrap';
import { getAvailableQuizzes } from '../redux/slices/quiz/available';
import { Link } from 'react-router-dom';

const AvailableQuiz = () => {
  const { quizzes, loading, error } = useSelector(
    (state) => state.availableQuizzes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAvailableQuizzes());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage type="error" msg={error} />
      ) : quizzes?.length ? (
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            الاختبارات المتاحة
          </ListGroup.Item>
          {quizzes.map((q) => (
            <ListGroup.Item as="li" key={q._id}>
              <Link to={`/take-quiz/${q._id}`} className="text-decoration-none">
                {q.quizName}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) :  <AlertMessage type="error" msg="لا توجد اختبارات متاحة" />}
    </Fragment>
  );
};

export default AvailableQuiz;
