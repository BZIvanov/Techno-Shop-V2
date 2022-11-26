import { useSelector } from '../../../../store/hooks';
import { CountdownProgress } from '../../../countdown-progress';

const ProtectedRoute = ({
  children,
  authRedirectTo,
  roleRedirectTo,
  roles,
}) => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <CountdownProgress redirectTo={authRedirectTo} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <CountdownProgress redirectTo={roleRedirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
