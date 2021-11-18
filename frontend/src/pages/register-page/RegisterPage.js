import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Box, Typography, Button } from '@mui/material';
import { Face, Email } from '@mui/icons-material';
import { TextFieldAdapter } from '../../components/text-field-adapter';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import { ApiCallAlert } from '../../components/api-call-alert';
import { ApiCallLoader } from '../../components/api-call-loader';
import {
  required,
  minLength,
  composeValidators,
} from '../../utils/form-field-validators';
import { registerUserAction } from '../../store/action-creators';

const RegisterPage = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    dispatch(registerUserAction(values));
  };

  const handleFormValidate = (values) => {
    const errors = {};
    if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors;
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
      <Typography variant='h1'>Register Form</Typography>

      <Box
        sx={{
          width: { xs: '90%', sm: '290px' },
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
      >
        <Form
          onSubmit={handleFormSubmit}
          validate={handleFormValidate}
          render={({ handleSubmit, form, submitting, pristine }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box my={1}>
                  <Field
                    name='username'
                    component={TextFieldAdapter}
                    validate={required}
                    label='Username'
                    Icon={Face}
                  />
                </Box>
                <Box my={1}>
                  <Field
                    name='email'
                    component={TextFieldAdapter}
                    validate={required}
                    label='Email'
                    Icon={Email}
                  />
                </Box>
                <Box my={1}>
                  <Field
                    name='password'
                    component={PasswordTextFieldAdapter}
                    validate={composeValidators(required, minLength(8))}
                    label='Password'
                  />
                </Box>
                <Box my={1}>
                  <Field
                    name='confirmPassword'
                    component={PasswordTextFieldAdapter}
                    validate={composeValidators(required, minLength(8))}
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
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                  <Button
                    variant='contained'
                    type='submit'
                    disabled={submitting || loading}
                  >
                    Register
                  </Button>
                </Box>
              </form>
            );
          }}
        />
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default RegisterPage;
