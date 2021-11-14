import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
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
import { required } from '../../utils/form-field-validators';
import { forgotPasswordAction } from '../../store/action-creators';

const ForgotPasswordDialog = ({
  showForgotPasswordModal,
  setShowForgotPasswordModal,
}) => {
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  return (
    <Dialog
      open={showForgotPasswordModal}
      onClose={() => setShowForgotPasswordModal(false)}
    >
      <Form
        onSubmit={(values) => {
          dispatch(forgotPasswordAction(values));
          setShowForgotPasswordModal(false);
        }}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogTitle>Forgot Password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To reset your password provide your e-mail for reset password
                  link.
                </DialogContentText>
                <Field
                  name='email'
                  component={TextFieldAdapter}
                  validate={required}
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
                  disabled={submitting || loading}
                >
                  Send
                </Button>
              </DialogActions>
            </form>
          );
        }}
      />
    </Dialog>
  );
};

export default ForgotPasswordDialog;
