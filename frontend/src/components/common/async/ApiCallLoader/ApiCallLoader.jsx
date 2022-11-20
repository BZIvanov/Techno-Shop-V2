import { useSelector } from '../../../../store/hooks';
import { Backdrop, CircularProgress } from '@mui/material';

const ApiCallLoader = () => {
  const { loading } = useSelector((state) => state.apiCall);

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default ApiCallLoader;
