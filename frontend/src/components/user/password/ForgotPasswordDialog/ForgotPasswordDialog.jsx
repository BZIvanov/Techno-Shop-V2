import { useSelector, useDispatch } from '../../../../store/hooks';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Email } from '../../../mui/Icons';
import TextFieldAdapter from '../../../common/forms/TextFieldAdapter/TextFieldAdapter';
import { forgotPasswordAction } from '../../../../store/features/user/userSlice';
import { formConfig } from './form-schema';
import { useForm } from '../../../../providers/form/hooks';
import FormProvider from '../../../../providers/form/FormProvider';

const ForgotPasswordDialog = ({
  showForgotPasswordModal,
  handleShowForgotModal,
}) => {
  const loading = useSelector((state) => state.apiCall.loading);

  const dispatch = useDispatch();

  const formMethods = useForm(formConfig);
  const { formState } = formMethods;

  const handleFormSubmit = (values) => {
    dispatch(forgotPasswordAction(values));
    handleShowForgotModal(false);
  };

  return (
    <Dialog
      open={showForgotPasswordModal}
      onClose={() => handleShowForgotModal(false)}
    >
      <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password provide your e-mail for reset password link.
          </DialogContentText>

          <TextFieldAdapter name='email' label='Email' icon={<Email />} />
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
      </FormProvider>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
