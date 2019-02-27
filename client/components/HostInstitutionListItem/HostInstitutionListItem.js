import React, { Component} from 'react';
import styles from './HostInstitutionListItem.scss';
import cx from 'classnames';


class HostInstitutionListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
        }
    }
	
    render() {
        const state = this.state;
        const props = this.props;

        // The research center data passed down from ResearcCenter component
        const rs = props.project;
        // console.log(user); // Will print out the user. Delete when finished.
    
        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.title}>{rs.title}</div>
                    <div className={styles.details}>
                        <div className={styles.left}>
                            <div className={styles.description}>{rs.location}</div>
                        </div>
                    </div>
                </div>
            </div>
        );	
    }
}

export default HostInstitutionListItem;