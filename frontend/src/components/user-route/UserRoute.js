import { useSelector } from 'react-redux';
import { CountdownProgress } from '../countdown-progress';

const UserRoute = ({ children, redirectTo }) => {
  const { user } = useSelector((state) => state.user);

  return user ? children : <CountdownProgress redirectTo={redirectTo} />;
};

export default UserRoute;
