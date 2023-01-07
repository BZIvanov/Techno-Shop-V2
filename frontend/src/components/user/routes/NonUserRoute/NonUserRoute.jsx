import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../../../store/hooks';

const NonUserRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      const customNavigateTo =
        location.state && location.state.customNavigateTo;
      if (customNavigateTo) {
        return navigate(customNavigateTo);
      }

      if (user.role === 'admin') {
        return navigate('/admin/dashboard');
      }
      return navigate('/user/dashboard');
    }
  }, [location, navigate, user]);

  return children;
};

export default NonUserRoute;
