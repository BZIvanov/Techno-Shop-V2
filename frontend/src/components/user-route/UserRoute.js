import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children, redirectTo }) => {
  const { user } = useSelector((state) => state.user);

  return user ? children : <Navigate to={redirectTo} />;
};

export default UserRoute;
