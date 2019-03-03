import React, { Component, Fragment } from 'react';
import styles from './App.scss';
import TopBar from './TopBar/TopBar';
import BottomBar from './BottomBar/BottomBar'
import GrantsPage from './GrantsPage/GrantsPage';
import UsersPage from './UsersPage/UsersPage';
import UserProfile from './UserProfile/UserProfile';
import ProjectListPage from './ProjectListPage/ProjectListPage';
import OrcidLogin from './LoginPage/OrcidLogin';
import { Route, Link, Switch } from 'react-router-dom';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import GrantDetail from './GrantDetail/GrantDetail';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage2';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import HostInstitutionList from './HostInstitutionList/HostInstitutionListPage';
import HostInstitutionPage from './HostInstitutionPage/HostInstitutionPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAtom, faFlask } from '@fortawesome/free-solid-svg-icons';
library.add(faAtom, faFlask);
import GroupPage from './GroupPage/GroupPage';
import RegisterUser from './RegisterUser/RegisterUser';

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
                    <div className="container-fluid" style={{paddingTop: '1rem', width: '70%'}}>
                        <Switch>
                            <Route path="/oauth" component={OrcidLogin} />
                            <Route path="/grants/:id" component={GrantsPage} />
                            <Route path="/user/:id" component={UserProfile} />
                            <Route path="/users/" component={UsersPage} />
                            <Route path="/project/:id" component={ProjectDetail} />
                            <Route path="/projects" component={ProjectListPage} />
                            <Route path="/grant" component={GrantDetail} />
                            <Route path="/grants" component={GrantsPage} />
                            <Route path="/hostInstitution" component={HostInstitutionPage} />
                            <Route path="/hostInstitutions" component={HostInstitutionList} />
                            <Route path="/group" component={GroupPage} />
                            <PrivateRoute exact path="/home" component={HomePage} />
                        </Switch>
                    </div>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

export default App;
