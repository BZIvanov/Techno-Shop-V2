import { Box, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChipsList = ({ title, parameter, chipsList }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${parameter}/${id}`);
  };

  return (
    <Box>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>
        {title}
      </Typography>

      {chipsList.map((chipItem) => (
        <Chip
          key={chipItem._id}
          label={chipItem.name}
          variant='outlined'
          onClick={() => handleClick(chipItem._id)}
          sx={{ margin: 0.5 }}
        />
      ))}
    </Box>
  );
};

export default ChipsList;
