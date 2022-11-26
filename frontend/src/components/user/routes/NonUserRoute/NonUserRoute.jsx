import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../../store/hooks';

const NonUserRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  if (user) {
    const customNavigateTo = location.state && location.state.customNavigateTo;
    if (customNavigateTo) {
      return <Navigate to={customNavigateTo} />;
    }

    if (user.role === 'admin') {
      return <Navigate to='/admin/dashboard' />;
    }
    return <Navigate to='/user/dashboard' />;
  }

  return children;
};

export default NonUserRoute;
