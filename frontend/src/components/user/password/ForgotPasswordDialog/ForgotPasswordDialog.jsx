import { useSelector, useDispatch } from '../../../../store/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Email } from '../../../mui/Icons';
import { TextFieldAdapter } from '../../../common/forms/TextFieldAdapter';
import { forgotPasswordAction } from '../../../../store/features/user/userSlice';
import schema from './form-schema';

const ForgotPasswordDialog = ({
  showForgotPasswordModal,
  handleShowForgotModal,
}) => {
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    dispatch(forgotPasswordAction(values));
    handleShowForgotModal(false);
  };

  return (
    <Dialog
      open={showForgotPasswordModal}
      onClose={() => handleShowForgotModal(false)}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password provide your e-mail for reset password link.
          </DialogContentText>

          <TextFieldAdapter
            control={control}
            name='email'
            label='Email'
            Icon={Email}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='secondary'
            type='button'
            onClick={() => handleShowForgotModal(false)}
          >
            Cancel
          </Button>
          <Button
            color='secondary'
            type='submit'
            disabled={formState.submitting || loading}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotPasswordDialog;