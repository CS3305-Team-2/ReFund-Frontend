import React, { Component} from 'react';
import styles from './TopBar.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';

class TopBar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		return (
			<div className={styles.topBar}>
					<div className={cx('container', styles.container)}>
						<div className="row p-2 align-items-center">
							<div className={styles.logoContainer}>
								<img src="/static/sfi_logo.svg" className={styles.logo} />
							</div>
							<div className="flex-grow-1">
								<div className={cx(styles.nav)}>
									<Link to="/home"><div className={styles.navLink}>Home</div></Link>
									<Link to="/grants/"><div className={styles.navLink}>Grants List</div></Link>
									<Link to="/grant/"><div className={styles.navLink}>Grant Detail</div></Link>
									<Link to="/users/"><div className={styles.navLink}>Users</div></Link>
									<Link to="/user/"><div className={styles.navLink}>User Profile</div></Link>
									<Link to="/projects/"><div className={styles.navLink}>Projects</div></Link>
									<Link to="/project/"><div className={styles.navLink}>Project Detail</div></Link>
								</div>
							</div>
						</div>
					</div>
			</div>
		)
;	}
}

export default TopBar;