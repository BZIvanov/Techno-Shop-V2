import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Shop, Register, Checkout, Category } from './components/pages';
import { Header } from './components/organisms';
import { GlobalStyles } from './components/atoms';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop/:category" component={Category} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
