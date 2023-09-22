import axios from 'axios';
axios.defaults.baseURL = '/https://quiz-creation-platform-api.vercel.app/api';

function isLoginPage(url) {
  return url.endsWith('/signin') || url.endsWith('/signup');
}

axios.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
  if (!isLoginPage(req.url)) {
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
  }

  return req;
});
