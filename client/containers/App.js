import React, { Component, Fragment } from 'react';
import styles from './App.scss';
import TopBar from './TopBar/TopBar';
import GrantsPage from './GrantsPage/GrantsPage';
import UsersPage from './UsersPage/UsersPage';
import UserProfile from './UserProfile/UserProfile';
import ProjectListPage from './ProjectListPage/ProjectListPage';
import { Route, Link, Switch } from 'react-router-dom';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import GrantDetail from './GrantDetail/GrantDetail';
import HomePage from './HomePage/HomePage';

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
            <div className="container">
              <Switch>
                <Route path="/grants/:id" component={GrantsPage} />
                <Route path="/user" component={UserProfile} />
                <Route path="/users/" component={UsersPage} />
                <Route path="/project" component={ProjectDetail} />
                <Route path="/projects" component={ProjectListPage} />
                <Route path="/grant" component={GrantDetail} />
                <Route path="/grants" component={GrantsPage} />
                <Route path="/home" component={HomePage} />
                <Route exact path="/" component={HomePage} />
              </Switch>
            </div>
          </div>
        </div>
        );
    }
}

export default App;
