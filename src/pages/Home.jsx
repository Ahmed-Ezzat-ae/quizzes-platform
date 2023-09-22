import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const { userData } = useSelector((state) => state.login);
  return (
    <div>
      <h2 className="text-primary">مرحبا {userData.username}</h2>
      <Stack gap={3} className='mt-5'>
        <Button as={Link} to="/create-quiz" className='create-quizBtn'>
          انشاء اختبار
        </Button>
        <Button as={Link} to="/quizzes" className='take-quizBtn'>
          اخذ اختبار
        </Button>
      </Stack>
    </div>
  );
};

export default Home;
