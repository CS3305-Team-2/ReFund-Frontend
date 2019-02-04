import React, { Component} from 'react';
import styles from './UsersListItem.scss';
import cx from 'classnames';


class UsersListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
     
    }
	}
	
	render() {
    const state = this.state;
    const props = this.props;

    // The user data passed down from UsersPage component
    const user = props.user;
    // console.log(user); // Will print out the user. Delete when finished.

    
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<div className={styles.title}>{user.name}</div>
					<div className={styles.details}>
						<div className={styles.left}>
							<div className={styles.description}>{user.jobTitle}</div>
							<div className={styles.description}>{user.institution}</div>
						</div>
					</div>
				</div>

			</div>
		)
;	}
}

export default UsersListItem;