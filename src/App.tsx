import { Button } from '@material-ui/core';
import cityApi from 'api/cityApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { Admin } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { authActions } from './features/auth/authSlice';

function App() {
  const dispath = useAppDispatch();
  useEffect(() => {
    // cityApi.getAll().then((data) => {
    //   console.log('data', data);
    // });
  });

  const handleLogout = () => {
    dispath(authActions.logout());
  };

  return (
    <div>
      <>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
      </>

      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
