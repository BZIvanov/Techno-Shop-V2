import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { apiCallResetAction } from '../../../../store/features/api-call/apiCallSlice';

const ApiCallAlert = () => {
  const { success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const shouldShow = Boolean(success) || Boolean(error);

  const handleCloseSnackbar = () => {
    dispatch(apiCallResetAction());
  };

  return (
    <Snackbar
      open={shouldShow}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        severity={error ? 'error' : 'success'}
        onClose={handleCloseSnackbar}
      >
        {error ? error : success}
      </Alert>
    </Snackbar>
  );
};

export default ApiCallAlert;
