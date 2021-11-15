import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Rooms } from './components/rooms';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';
import { ResetPasswordPage } from './pages/reset-password-page';
import { getCurrentUserAction } from './store/action-creators';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('userToken');
    if (token) {
      dispatch(getCurrentUserAction(token.replace(/"/g, '')));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
};

export default App;
