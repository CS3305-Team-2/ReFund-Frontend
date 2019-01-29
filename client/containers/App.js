import React, { Component, Fragment } from 'react';
import styles from './App.scss';
import TopBar from './TopBar/TopBar';
import GrantsPage from './GrantsPage/GrantsPage';
import { Route, Link, Switch } from 'react-router-dom';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
      return (
        <div className={styles.root}>
          <TopBar />
          <div className={styles.contentRoot}>
            <GrantsPage />
          </div>
        </div>
        );
    }
}

export default App;
