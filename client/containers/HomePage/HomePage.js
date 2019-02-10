import React, { Component} from 'react';
import styles from './HomePage.scss';
import cx from 'classnames';
import { Link, withRouter } from 'react-router-dom';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("user");
    this.props.history.push("/login");
  }
  
	render() {
    const state = this.state;
    const props = this.props;

    const user = props.user;
    console.log('homepage', props);

		return (
			<div>

        <div className={styles.exampleClass}>
          Welcome {user.firstName}
        </div>

        <div>
        <div className={styles.nav}>
            <Link to="/users/"><div className={styles.navLink}>View Users</div></Link>
            <Link to="/grants/"><div className={styles.navLink}>View Funding Calls</div></Link>
            <Link to="/projects/"><div className={styles.navLink}>View Projects</div></Link>
          </div>
        </div>
        <div className={styles.buttonContainer}>
            <div 
              className={styles.loginButton}
              onClick={this.logout}
            >Logout</div>
        </div>

			</div>
		)
;	}
}

export default withRouter(HomePage);