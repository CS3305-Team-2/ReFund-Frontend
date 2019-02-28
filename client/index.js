// import "@babel/polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { HashRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from './history';


ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById("root")
);  
