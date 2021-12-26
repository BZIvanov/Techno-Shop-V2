import { Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChipsList = ({ listType, categories }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${listType}/${id}`);
  };

  return (
    <>
      <Typography variant='h1' sx={{ textAlign: 'center', marginBottom: 1 }}>
        {listType === 'category' ? 'Categories' : 'Subcategories'}
      </Typography>

      {categories.map((category) => (
        <Chip
          key={category._id}
          label={category.name}
          variant='outlined'
          onClick={() => handleClick(category._id)}
          sx={{ margin: 0.5 }}
        />
      ))}
    </>
  );
};

export default ChipsList;
