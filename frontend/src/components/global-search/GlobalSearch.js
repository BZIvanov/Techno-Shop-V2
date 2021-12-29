import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { filterAction } from '../../store/action-creators';

const GlobalSearch = () => {
  const { text } = useSelector((state) => state.filters);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(filterAction({ text: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/shop');
  };

  return (
    <Paper
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
      }}
      onSubmit={handleSearchSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search'
        inputProps={{ 'aria-label': 'search' }}
        value={text}
        onChange={handleSearchChange}
      />
      <IconButton type='submit' sx={{ p: '5px' }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default GlobalSearch;
