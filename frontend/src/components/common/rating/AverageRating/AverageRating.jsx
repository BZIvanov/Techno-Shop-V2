import { Box, Rating, Typography } from '@mui/material';

const AverageRating = ({ ratings = [], size = 'large' }) => {
  const allStarsSum = ratings
    .map((rating) => rating.star)
    .reduce((total, star) => total + star, 0);

  const averageRating = allStarsSum / ratings.length;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: { xs: 0.5, md: 1 },
        paddingBottom: { xs: 0.5, md: 1 },
      }}
    >
      {ratings.length > 0 ? (
        <>
          <Rating
            value={averageRating}
            precision={0.5}
            size={size}
            max={10}
            disabled={true}
          />
          <Typography variant='body2' ml={1}>
            ({ratings.length})
          </Typography>
        </>
      ) : (
        <Typography variant='body2'>Not rated yet</Typography>
      )}
    </Box>
  );
};

export default AverageRating;
