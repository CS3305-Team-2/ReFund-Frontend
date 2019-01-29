import React, { Component} from 'react';
import styles from './UsersListItem.scss';
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
    const project = props.project;
    console.log(project); // Will print out the user. Delete when finished.
    
		return (
			<div className={styles.root}>
			</div>
		)
;	}
}

export default ProjectListItem;