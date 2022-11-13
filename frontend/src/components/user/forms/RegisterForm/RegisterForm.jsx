import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { Face, Email } from '@mui/icons-material';
import { TextFieldAdapter } from '../../../common/forms/TextFieldAdapter';
import { PasswordTextFieldAdapter } from '../../../common/forms/PasswordTextFieldAdapter';
import { ApiCallAlert } from '../../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../../common/async/ApiCallLoader';
import { registerUserAction } from '../../../../store/features/user/userSlice';
import schema from './form-schema';

const RegisterForm = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    const { username, email, password } = values;
    dispatch(registerUserAction({ username, email, password }));
  };

  if (user) {
    if (user.role === 'admin') {
      return <Navigate to='/admin/dashboard' />;
    }
    return <Navigate to='/user/dashboard' />;
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
      <Typography variant='h5'>Register Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='username'
              label='Username'
              Icon={Face}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='email'
              label='Email'
              Icon={Email}
            />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              control={control}
              name='password'
              label='Password'
            />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              control={control}
              name='confirmPassword'
              label='Confirm Password'
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

export default RegisterForm;
