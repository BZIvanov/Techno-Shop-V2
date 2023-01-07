import { Fragment, useEffect } from 'react';
import { useDispatch } from './store/hooks';
import Header from './components/header/Header/Header';
import CartDrawer from './components/cart/CartDrawer/CartDrawer';
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
    <Fragment>
      <Header />

      <AppRoutes />

      <CartDrawer />
    </Fragment>
  );
};

export default App;
