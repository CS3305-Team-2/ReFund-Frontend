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

        return (
            <div>
                <div className={styles.welcome}>
                Welcome {user.firstName}
                </div>

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
