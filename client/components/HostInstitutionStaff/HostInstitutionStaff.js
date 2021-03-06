import React, { Component} from 'react';
import styles from './HostInstitutionStaff.scss';
import cx from 'classnames';


class HostInstitutionStaff extends Component {
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
                    <div className={styles.title}>{staff.title || staff.name}</div>
                </div>
            </div>
        );	
    }
}

export default HostInstitutionStaff;