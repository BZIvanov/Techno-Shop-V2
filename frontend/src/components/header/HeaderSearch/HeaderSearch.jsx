import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../store/hooks';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '../../mui/Icons';
import { filterAction } from '../../../store/features/products-filter/productsFilterSlice';

const HeaderSearch = () => {
  const text = useSelector((state) => state.productsFilter.text);

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
      <IconButton
        type='submit'
        aria-label='product search' // this is needed for the tests to target icon button
        sx={{ p: '5px' }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default HeaderSearch;
