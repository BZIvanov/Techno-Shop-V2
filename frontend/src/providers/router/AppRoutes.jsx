import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home-page';
import { RegisterForm } from '../../components/user/forms/RegisterForm';
import { LoginForm } from '../../components/user/forms/LoginForm';
import { ResetPasswordPage } from '../../pages/reset-password-page';
import { ShopPage } from '../../pages/shop-page';
import { UserPage } from '../../pages/user-page';
import { CategoryProductsPage } from '../../pages/category-products-page';
import { SubcategoryProductsPage } from '../../pages/subcategory-products-page';
import { ProductsCardsList } from '../../components/products-cards-list';
import { ManageCategory } from '../../components/manage-category';
import { ManageSubcategory } from '../../components/manage-subcategory';
import { ManageProduct } from '../../components/manage-product';
import { UserPasswordUpdate } from '../../components/user-password-update';
import { ProductDetails } from '../../components/product-details';
import { ProtectedRoute } from '../../components/protected-route';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/register' element={<RegisterForm />} />
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
      <Route path='/shop' element={<ShopPage />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/category/:id' element={<CategoryProductsPage />} />
      <Route path='/subcategory/:id' element={<SubcategoryProductsPage />} />
    </Routes>
  );
};

export default AppRoutes;
