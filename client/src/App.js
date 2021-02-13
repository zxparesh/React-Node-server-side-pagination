import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import tokenStore from './Auth/tokenStore';
import './App.css';
import Signup from './Pages/Signup';

function App() {
  const { token, setToken } = tokenStore();
  const [signup, setSignup] = useState(false);

  if (!token) {
    if (signup) {
      return <Signup setToken={setToken} setSignup={setSignup} />
    }
    return <Login setToken={setToken} setSignup={setSignup} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;