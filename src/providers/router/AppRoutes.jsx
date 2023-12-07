import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/shop' element={<div>Shop</div>} />
    </Routes>
  );
};

export default AppRoutes;
