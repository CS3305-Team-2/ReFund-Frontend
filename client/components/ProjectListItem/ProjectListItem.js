import React, { Component} from 'react';
import styles from './ProjectListItem.scss';
import cx from 'classnames';


class ProjectListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
     
    }
	}
	
	render() {
    const state = this.state;
    const props = this.props;

    // The user data passed down from UsersPage component
    const user = props.project;
    // console.log(user); // Will print out the user. Delete when finished.

    
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<div className={styles.title}>{user.name}</div>
					{/*<div className={styles.details}>
						<div className={styles.left}>
							<div className={styles.description}>{user.description}</div>
						</div>
					</div>*/}
				</div>

			</div>
		)
;	}
}

export default ProjectListItem;