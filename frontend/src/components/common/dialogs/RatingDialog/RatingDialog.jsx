import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from '@mui/material';
import { MAX_RATING_VALUE } from '../../../../constants';

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
          precision={1}
          size='large'
          max={MAX_RATING_VALUE}
        />
      </DialogContent>

      <DialogActions>
        <Button type='button' onClick={() => setShowRatingModal(false)}>
          Cancel
        </Button>

        <Button
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
