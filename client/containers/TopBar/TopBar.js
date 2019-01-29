import React, { Component} from 'react';
import styles from './TopBar.scss';
import cx from 'classnames';

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
									<div className={cx(styles.navLink, styles.activeLink)}>Home</div>
									<div className={styles.navLink}>About</div>
									<div className={styles.navLink}>Sign Up</div>
									<div className={styles.navLink}>Sign In</div>
								</div>
							</div>
						</div>
					</div>
			</div>
		)
;	}
}

export default TopBar;