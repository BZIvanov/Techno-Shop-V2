import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { Rooms } from './components/rooms';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
