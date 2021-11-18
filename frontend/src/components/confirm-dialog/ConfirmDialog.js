import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const ConfirmDialog = ({
  dialogConfig: { open, text, onConfirm },
  setDialogConfig,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setDialogConfig({ text, onConfirm, open: false })}
    >
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDialogConfig({ text, onConfirm, open: false })}
        >
          Cancel
        </Button>
        <Button onClick={() => onConfirm()} autoFocus={true}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
