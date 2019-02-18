import React, { Component} from 'react';
import styles from './ResearchCenterStaff.scss';
import cx from 'classnames';


class ResearchCenterItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
     
    }
	}
	
	render() {
    const state = this.state;
    const props = this.props;

    // The research center data passed down from ResearcCenter component
    const staff = props.project;
    // console.log(user); // Will print out the user. Delete when finished.

    
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<div className={styles.title}>{staff.title}</div>
				</div>
			</div>
		)
;	}
}

export default ResearchCenterStaffItem;