import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import { Provider } from 'react-redux';
import './utils/default-config';
import EmailVerify from './pages/EmailVerify';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz/TakeQuiz';
import AvailableQuiz from './pages/AvailableQuiz';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Protected from './components/Protected';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'create-quiz',
        element: <CreateQuiz />,
      },
      {
        path: 'quizzes',
        element: <AvailableQuiz />,
      },

      {
        path: 'take-quiz/:id',
        element: <TakeQuiz />,
      },
    ],
  },
  {
    path: '/',
    children: [
      {
        index: true,
        element: <AuthLayout />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'users/:id/verify/:token',
        element: <EmailVerify />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
