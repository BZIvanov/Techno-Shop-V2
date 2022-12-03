import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from '@mui/material';

const RatingDialog = ({
  showRatingModal,
  setShowRatingModal,
  rating,
  setRating,
  rateProduct,
}) => {
  return (
    <Dialog open={showRatingModal} onClose={() => setShowRatingModal(false)}>
      <DialogTitle>Leave your rating</DialogTitle>
      <DialogContent>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={0.5}
          size='large'
          max={10}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          type='button'
          onClick={() => setShowRatingModal(false)}
        >
          Cancel
        </Button>
        <Button
          color='secondary'
          type='submit'
          onClick={() => {
            setShowRatingModal(false);
            rateProduct();
          }}
        >
          Rate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingDialog;
