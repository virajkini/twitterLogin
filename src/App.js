import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { StoreContext } from './appContextStore';

import Login from './screens/Login/index';
import Dashboard from './screens/Dashboard/index';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <StoreContext.Consumer>
            {
              (value) => {
                if(!value.isAuthenticated) {
                  return (
                    <Switch>
                      <Route path = '/login' component= {Login} />
                      <Route path = '/*' render = {()=><Redirect to= '/login/signin'/>} />
                    </Switch>
                  )
                } else {
                  return (
                    <Switch>
                        <Route path = '/dashboard' component= {Dashboard} />
                        <Route path = '/*' render = {()=><Redirect to= '/dashboard'/>} />
                    </Switch>
                  )
                }
              }
            }
          </StoreContext.Consumer>

      </Router>
      <ToastContainer autoClose = {2000} />
    </div>
  );
}

export default App;
