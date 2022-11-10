import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import { ApiCallAlert } from '../../components/common/async/ApiCallAlert';
import { ApiCallLoader } from '../../components/common/async/ApiCallLoader';
import { resetPasswordAction } from '../../store/action-creators';
import { RESET_PASSWORD_CODE } from '../../store/action-creators/api-call';
import schema from './form-schema';

const ResetPasswordPage = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, callCode } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { token } = useParams();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    dispatch(resetPasswordAction({ ...values, token }));
  };

  if (user) {
    return <Navigate to='/' />;
  }

  if (callCode && callCode === RESET_PASSWORD_CODE) {
    return <Navigate to='/login' />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h5'>Password Reset Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box my={1}>
            <PasswordTextFieldAdapter
              control={control}
              name='newPassword'
              label='New Password'
            />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              control={control}
              name='confirmNewPassword'
              label='Confirm New Password'
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '20px',
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => reset()}
              disabled={formState.submitting}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={formState.submitting || loading}
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ResetPasswordPage;
