import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './components/header/Header';
import AppRoutes from './routes/AppRoutes';
import { getCurrentUserAction } from './store/features/user/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('userToken');
    if (token) {
      dispatch(getCurrentUserAction(token));
    }
  }, [dispatch]);

  return (
    <>
      <Header />

      <AppRoutes />
    </>
  );
};

export default App;
