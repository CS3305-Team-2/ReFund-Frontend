import React, { Component} from 'react';
import styles from './TopBar.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import logo from '../../img/sfi_logo.svg';
import { withRouter } from 'react-router-dom';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.logout = this.logout.bind(this);
    }

    getLinks() {
        let links = [
            { value: 'Home', path: '/home' },
            { value: 'About', path: '/about' },
            { value: 'Search', path: '/search' },
            { value: 'Sign In', path: '/login' },
        ];

        if (true) {
            links = [
                { value: 'Home', path: '/home' },
                { value: 'Users', path: '/users' },
                { value: 'Grants', path: '/grants' },
                { value: 'Projects', path: '/projects' },
                { value: 'My Profile', path: `/user/${JSON.parse(localStorage.getItem("user")).id}`},
            ];
        }

        return links.map(link => {
            const isMatch = RegExp(`^${link.path}`).test(this.props.location.pathname) || link.default;

            return (
                <Link 
                    to={`${link.path}`} 
                    key={`Nav Item ${link.value}`}
                    className={cx(styles.navLink, { [styles.activeLink]: isMatch })}
                >
                    <div className={styles.navText}>
                        { link.value }
                    </div>  
                </Link> 
            )}
        );
    }

    logout() {
        localStorage.removeItem("authData");
        this.props.history.push("/login");
    }
	
    render() {
        return (
            <div className={styles.topBar}>
                <div className={cx('container', styles.container)}>
                    <div className={cx("row align-items-center justify-content-center", styles.row)}>
                        <div className={styles.logoContainer}>
                            <img src={logo} className={styles.logo} />
                        </div>
                        {localStorage.getItem("authData") ?
                            <div className="flex-grow-1 h-100">
                                <div className={cx(styles.nav)}>
                                    {this.getLinks()}
                                    <div className={styles.buttonContainer}>
                                        <div className={styles.loginButton} onClick={this.logout}>
										Logout
                                        </div>
                                    </div>
                                    {/*<Link to="/home"><div className={styles.navLink}>Home</div></Link>*/}

                                </div>
                            </div> : <div/> }
                    </div>
                </div>
            </div>
        );	
    }
}

export default withRouter(TopBar);
