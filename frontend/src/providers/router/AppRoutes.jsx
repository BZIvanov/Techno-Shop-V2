import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home-page';
import { RegisterForm } from '../../components/user/auth/RegisterForm';
import { LoginForm } from '../../components/user/auth/LoginForm';
import { PasswordUpdateForm } from '../../components/user/password/PasswordUpdateForm';
import { ResetPasswordForm } from '../../components/user/password/ResetPasswordForm';
import { ShopPage } from '../../pages/shop-page';
import { NavigationLayout } from '../../components/user/layouts/NavigationLayout';
import { CategoryProductsPage } from '../../pages/category-products-page';
import { SubcategoryProductsPage } from '../../pages/subcategory-products-page';
import { ProductsCardsList } from '../../components/products-cards-list';
import { ManageCategory } from '../../components/category/ManageCategory';
import { ManageSubcategory } from '../../components/manage-subcategory';
import { ManageProduct } from '../../components/manage-product';
import { ProductDetails } from '../../components/product-details';
import { ProtectedRoute } from '../../components/user/routes/ProtectedRoute';
import { NonUserRoute } from '../../components/user/routes/NonUserRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
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
        path='user'
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
        path='admin'
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
        <Route path='dashboard' element={<ProductsCardsList />} />
        <Route path='category' element={<ManageCategory />} />
        <Route path='subcategory' element={<ManageSubcategory />} />
        <Route path='product' element={<ManageProduct />} />
        <Route path='product/:id' element={<ManageProduct />} />
        <Route path='products-list' element={<ProductsCardsList />} />
        <Route path='password' element={<PasswordUpdateForm />} />
      </Route>
      <Route path='/shop' element={<ShopPage />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/category/:id' element={<CategoryProductsPage />} />
      <Route path='/subcategory/:id' element={<SubcategoryProductsPage />} />
    </Routes>
  );
};

export default AppRoutes;
