import React, { Component} from 'react';
import styles from './HomePage.scss';
import cx from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import Notifications from '../../components/Notifications/Notifications';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
  
    render() {
        const state = this.state;
        const props = this.props;

        const user = props.user;
        console.log('homepage', props);

        const isOrcidLogin = localStorage.getItem("is-orcid-login") === "true"

        let orcidLoginText = <></>
        if (isOrcidLogin) {
            orcidLoginText = <>
                <div className={styles.subwelcome}>Please change your password. It has been set to <code>new-user-password</code> by default.</div>
                <div className={styles.subwelcome}>You can now login with ORCID or with your Sesame details.</div>
            </>
        }

        localStorage.removeItem("is-orcid-login")

        return (
            <div>
                <div className={styles.welcome}>
                Welcome {user.firstName}
                </div>
                <div className={styles.subwelcome}>
                Email: {user.email}
                </div>
                
                {orcidLoginText}

                <div className={styles.adjacentContainer}>
                    <div className={styles.notificationContainer}>
                        <Notifications />
                    </div>
                </div>
            </div>
        );	
    }
}

export default withRouter(HomePage);
