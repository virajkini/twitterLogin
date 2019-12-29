import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { StoreProvider } from './appContextStore';

import './index.css';
//import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(<StoreProvider><App /></StoreProvider>, document.getElementById('root'));

