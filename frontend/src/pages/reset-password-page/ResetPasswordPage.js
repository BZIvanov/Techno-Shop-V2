import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { PasswordTextFieldAdapter } from '../../components/common/forms/PasswordTextFieldAdapter';
import { ApiCallAlert } from '../../components/common/async/ApiCallAlert';
import { ApiCallLoader } from '../../components/common/async/ApiCallLoader';
import { apiCallFailType } from '../../store/action-creators';
import { resetPasswordAction } from '../../store/features/user/userSlice';
import schema from './form-schema';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { token } = useParams();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    try {
      await dispatch(resetPasswordAction({ ...values, token }));
      navigate('/login');
    } catch (error) {
      dispatch(apiCallFailType(error.message));
    }
  };

  if (user) {
    return <Navigate to='/' />;
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
              Reset Password
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
