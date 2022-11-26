import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Box, Backdrop } from '@mui/material';

const SECONDS = 3;

const CountdownProgress = ({ redirectTo }) => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 1 ? SECONDS : prevProgress - 1
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress === 0) {
      return navigate(redirectTo);
    }
  }, [navigate, redirectTo, progress]);

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1 }}
      open={progress > 0}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CircularProgress variant='determinate' value={progress * 20} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='caption'
              component='div'
              color='text.secondary'
            >
              {progress}
            </Typography>
          </Box>
        </Box>
        <Typography variant='caption' component='div' color='text.secondary'>
          Redirecting you to {redirectTo} page in {progress} seconds!
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default CountdownProgress;
