import { Routes, Route } from 'react-router-dom';

// children will be the tested component
// this is default component for test, that don't require routing
// for tests which require routing, provide custom routes in the test file
const AppTestRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path='/' element={children} />
    </Routes>
  );
};

export default AppTestRoutes;
