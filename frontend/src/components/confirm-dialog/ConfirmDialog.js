import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const ConfirmDialog = ({ text, open, cancelHandler, confirmHandler }) => {
  return (
    <Dialog open={open} onClose={() => cancelHandler(false)}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancelHandler(false)}>Cancel</Button>
        <Button onClick={confirmHandler} autoFocus={true}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
