import React, { Component} from 'react';
import styles from './OrcidLogin.scss';
import cx from 'classnames';
import axios from 'axios';
import {apiUrl, baseUrl} from '../../config';
import { withRouter } from "react-router-dom";
import LoginForm from '../../components/LoginForm/LoginForm';
import VisibilitySensor from 'react-visibility-sensor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import queryString from 'query-string'

class OrcidLogin extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.submit()
    }

    submit() {
        let code = queryString.parse(window.location.search).code
        console.log("making request with: ", code)
        axios.get(apiUrl + '/redirect?code=' + code).then((res) => {
            if (res.status == 201) {
                localStorage.setItem("is-orcid-login", "true")
            }
            let data = JSON.stringify(localStorage.getItem("authData"));
            data.user = res.data;
            localStorage.setItem("authData", data);
            window.location = baseUrl + '#/home'
        })
    }

    render() {
        return (
            <div>
                <div className={styles.root}>
                    <div className={styles.logintext}>Logging you in..</div>
                    <div className={styles.logintext}>If this is your first time signing in, your account will be created automatically</div>
                </div>
            </div>
        )
    }
}

export default withRouter(OrcidLogin);
