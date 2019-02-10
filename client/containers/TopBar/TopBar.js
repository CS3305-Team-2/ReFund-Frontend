import React, { Component} from 'react';
import styles from './TopBar.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import logo from '../../img/sfi_logo.svg';

class TopBar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		return (
			<div className={styles.topBar}>
					<div className={cx('container', styles.container)}>
						<div className="row p-2 align-items-center justify-content-center">
							<div className={styles.logoContainer}>
								<img src={logo} className={styles.logo} />
							</div>
							{localStorage.getItem("user") ?
							<div className="flex-grow-1">
								<div className={cx(styles.nav)}>
									<Link to="/home"><div className={styles.navLink}>Home</div></Link>
									<Link to="/users/"><div className={styles.navLink}>Users</div></Link>
									<Link to="/grants/"><div className={styles.navLink}>Funding Calls</div></Link>
									<Link to="/projects/"><div className={styles.navLink}>Projects</div></Link>
								</div>
								</div> : <div/> }
						</div>
					</div>
			</div>
		)
;	}
}

export default TopBar;