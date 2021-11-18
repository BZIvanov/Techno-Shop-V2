import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { apiCallResetType } from '../../store/action-creators';

const ApiCallAlert = () => {
  const { success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const shouldShow = Boolean(success) || Boolean(error);

  const handleCloseSnackbar = () => {
    dispatch(apiCallResetType());
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
