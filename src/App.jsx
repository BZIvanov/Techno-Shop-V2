import Container from '@mui/material/Container';

import Header from './components/header/Header/Header';
import AppRoutes from './providers/router/AppRoutes';

const App = () => {
  return (
    <Container maxWidth='xl'>
      <Header />

      <AppRoutes />
    </Container>
  );
};

export default App;
