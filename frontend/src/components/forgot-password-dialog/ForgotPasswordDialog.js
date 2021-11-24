import { useSelector, useDispatch } from 'react-redux';
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
import { Email } from '@mui/icons-material';
import { TextFieldAdapter } from '../../components/text-field-adapter';
import { forgotPasswordAction } from '../../store/action-creators';
import schema from './form-schema';

const ForgotPasswordDialog = ({
  showForgotPasswordModal,
  setShowForgotPasswordModal,
}) => {
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    dispatch(forgotPasswordAction(values));
    setShowForgotPasswordModal(false);
  };

  return (
    <Dialog
      open={showForgotPasswordModal}
      onClose={() => setShowForgotPasswordModal(false)}
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
            onClick={() => setShowForgotPasswordModal(false)}
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
