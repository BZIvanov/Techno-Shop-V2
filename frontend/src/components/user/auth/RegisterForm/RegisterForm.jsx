import { useSelector, useDispatch } from '../../../../store/hooks';
import { Box, Typography, Button } from '@mui/material';
import { Face, Email } from '../../../mui/Icons';
import { TextFieldAdapter } from '../../../common/forms/TextFieldAdapter';
import { PasswordTextFieldAdapter } from '../../../common/forms/PasswordTextFieldAdapter';
import { ApiCallAlert } from '../../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../../common/async/ApiCallLoader';
import { registerUserAction } from '../../../../store/features/user/userSlice';
import { formConfig } from './form-schema';
import { useForm } from '../../../../providers/form/hooks';
import FormProvider from '../../../../providers/form/FormProvider';

const RegisterForm = () => {
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = (values) => {
    const { username, email, password } = values;
    dispatch(registerUserAction({ username, email, password }));
  };

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
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='username' label='Username' Icon={Face} />
          </Box>

          <Box my={1}>
            <TextFieldAdapter name='email' label='Email' Icon={Email} />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter name='password' label='Password' />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
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
        </FormProvider>
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default RegisterForm;
