import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from './components/header';
import { Rooms } from './components/rooms';

const App = () => {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path='/rooms' element={<Rooms />} />
      </Routes>
    </Box>
  );
};

export default App;
