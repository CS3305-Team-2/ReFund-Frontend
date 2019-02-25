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
import LoginPage from './LoginPage/LoginPage2';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import ResearchCenterList from './ResearchCenterList/ResearchCenterListPage';
import ResearchCenterPage from './ResearchCenterPage/ResearchCenterPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAtom, faFlask } from '@fortawesome/free-solid-svg-icons';
library.add(faAtom, faFlask);
import GroupPage from './GroupPage/GroupPage';

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
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route exact path="/" component={LoginPage} />
            </Switch>
            <div className="container" style={{paddingTop: '1rem'}}>
              <Switch>
                <Route path="/grants/:id" component={GrantsPage} />
                <Route path="/user/:id" component={UserProfile} />
                <Route path="/users/" component={UsersPage} />
                <Route path="/project" component={ProjectDetail} />
                <Route path="/projects" component={ProjectListPage} />
                <Route path="/grant" component={GrantDetail} />
                <Route path="/grants" component={GrantsPage} />
                <Route path="/researchCenter" component={ResearchCenterPage} />
                <Route path="/researchCenters" component={ResearchCenterList} />
                <Route path="/group" component={GroupPage} />
                <PrivateRoute exact path="/home" component={HomePage} />
              </Switch>
            </div>
          </div>
        </div>
        );
    }
}

export default App;
