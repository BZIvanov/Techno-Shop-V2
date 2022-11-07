import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import { updatePasswordAction } from '../../store/action-creators';
import schema from './form-schema';

const UserPasswordUpdate = () => {
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    dispatch(updatePasswordAction(values));
    reset();
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
      <Typography variant='h5'>Password Update Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box my={1}>
            <PasswordTextFieldAdapter
              control={control}
              name='oldPassword'
              label='Old Password'
            />
          </Box>

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
              Submit
            </Button>
          </Box>
        </form>
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default UserPasswordUpdate;
