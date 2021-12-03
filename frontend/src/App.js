import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';
import { ResetPasswordPage } from './pages/reset-password-page';
import { UserPage } from './pages/user-page';
import { ProductsCardsList } from './components/products-cards-list';
import { ManageCategory } from './components/manage-category';
import { ManageSubcategory } from './components/manage-subcategory';
import { ManageProduct } from './components/manage-product';
import { UserPasswordUpdate } from './components/user-password-update';
import { ProtectedRoute } from './components/protected-route';
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
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route
          path='user'
          element={
            <ProtectedRoute authRedirectTo='/login'>
              <UserPage />
            </ProtectedRoute>
          }
        >
          <Route path='dashboard' element={<UserPasswordUpdate />} />
          <Route path='wishlist' element={<UserPasswordUpdate />} />
          <Route path='password' element={<UserPasswordUpdate />} />
        </Route>
        <Route
          path='admin'
          element={
            <ProtectedRoute
              authRedirectTo='/login'
              roleRedirectTo='/'
              roles={['admin']}
            >
              <UserPage />
            </ProtectedRoute>
          }
        >
          <Route path='dashboard' element={<ProductsCardsList />} />
          <Route path='category' element={<ManageCategory />} />
          <Route path='subcategory' element={<ManageSubcategory />} />
          <Route path='product' element={<ManageProduct />} />
          <Route path='product/:id' element={<ManageProduct />} />
          <Route path='products-list' element={<ProductsCardsList />} />
          <Route path='password' element={<UserPasswordUpdate />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
