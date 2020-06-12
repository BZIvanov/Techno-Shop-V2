import React from 'react';
import { Home } from './components/pages';
import { GlobalStyles } from './components/atoms';
import './App.css';

function App() {
  return (
    <div>
      <GlobalStyles />
      <Home />
    </div>
  );
}

export default App;
