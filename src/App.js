import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { StoreContext } from './appContextStore';

import Login from './screens/Login/index';
import Dashboard from './screens/Dashboard/index';

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
    </div>
  );
}

export default App;
