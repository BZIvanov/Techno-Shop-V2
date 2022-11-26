import { useEffect } from 'react';
import { useDispatch } from './store/hooks';
import { Header } from './components/header/Header';
import AppRoutes from './providers/router/AppRoutes';
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
