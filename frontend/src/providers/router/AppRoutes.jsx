import { Routes, Route } from 'react-router-dom';
import { Home } from '../../components/home/Home';
import { RegisterForm } from '../../components/user/auth/RegisterForm';
import LoginForm from '../../components/user/auth/LoginForm/LoginForm';
import { PasswordUpdateForm } from '../../components/user/password/PasswordUpdateForm';
import { ResetPasswordForm } from '../../components/user/password/ResetPasswordForm';
import { Shop } from '../../components/shop/Shop';
import { NavigationLayout } from '../../components/user/layouts/NavigationLayout';
import { CategoryProducts } from '../../components/category/CategoryProducts';
import { SubcategoryProducts } from '../../components/subcategory/SubcategoryProducts';
import Products from '../../components/product/Products/Products';
import { ManageCategory } from '../../components/category/ManageCategory';
import { ManageSubcategory } from '../../components/subcategory/ManageSubcategory';
import ManageProduct from '../../components/product/ManageProduct/ManageProduct';
import ProductDetails from '../../components/product/ProductDetails/ProductDetails';
import ProtectedRoute from '../../components/user/routes/ProtectedRoute/ProtectedRoute';
import NonUserRoute from '../../components/user/routes/NonUserRoute/NonUserRoute';
import CartProducts from '../../components/cart/CartProducts/CartProducts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/login'
        element={
          <NonUserRoute>
            <LoginForm />
          </NonUserRoute>
        }
      />
      <Route
        path='/register'
        element={
          <NonUserRoute>
            <RegisterForm />
          </NonUserRoute>
        }
      />
      <Route
        path='/reset-password/:token'
        element={
          <NonUserRoute>
            <ResetPasswordForm />
          </NonUserRoute>
        }
      />
      <Route
        path='/user'
        element={
          <ProtectedRoute authRedirectTo='/login'>
            <NavigationLayout />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<PasswordUpdateForm />} />
        <Route path='wishlist' element={<PasswordUpdateForm />} />
        <Route path='password' element={<PasswordUpdateForm />} />
      </Route>
      <Route
        path='/admin'
        element={
          <ProtectedRoute
            authRedirectTo='/login'
            roleRedirectTo='/'
            roles={['admin']}
          >
            <NavigationLayout />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<Products />} />
        <Route path='category' element={<ManageCategory />} />
        <Route path='subcategory' element={<ManageSubcategory />} />
        <Route path='product' element={<ManageProduct />} />
        <Route path='product/:productId' element={<ManageProduct />} />
        <Route path='products-list' element={<Products />} />
        <Route path='password' element={<PasswordUpdateForm />} />
      </Route>
      <Route path='/shop' element={<Shop />} />
      <Route path='/product/:productId' element={<ProductDetails />} />
      <Route path='/category/:categoryId' element={<CategoryProducts />} />
      <Route
        path='/subcategory/:subcategoryId'
        element={<SubcategoryProducts />}
      />
      <Route path='/cart' element={<CartProducts />} />
    </Routes>
  );
};

export default AppRoutes;
