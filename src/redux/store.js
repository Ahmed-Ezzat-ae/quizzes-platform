import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/users/register';
import verifyEmailSlice from './slices/users/verify-email';
import loginSlice from './slices/users/login';
import createQuizSlice from './slices/quiz/create';
import getAvailableQuizSlice from './slices/quiz/available';
import quizSlice from './slices/quiz/quiz';

const store = configureStore({
  reducer: {
    register: registerSlice,
    verifyEmail: verifyEmailSlice,
    login: loginSlice,
    create: createQuizSlice,
    availableQuizzes: getAvailableQuizSlice,
    quiz: quizSlice,
  },
});

export default store;
