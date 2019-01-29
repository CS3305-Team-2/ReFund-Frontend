import React, { Component} from 'react';
import styles from './GrantsListItem.scss';
import cx from 'classnames';

class GrantsListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
      activeTab: 'unfunded',
    }
	}
	
	render() {
    const state = this.state;
    const grant = this.props.grant;
    
		return (
			<div className={styles.root}>
        <div className={styles.title}>{grant.title}</div>
        <div className={styles.grant}>
          <div className={styles.left}>
            <div className={styles.description}>{grant.description}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.detail}><span className={styles.label}>Deadline - </span>{grant.deadline}</div>
            <div className={styles.detail}><span className={styles.label}>Duration - </span>{grant.duration}</div>
            <div className={styles.detail}><span className={styles.label}>Amount - </span>€{grant.amount}</div>
          </div>
        </div>


			</div>
		)
;	}
}

export default GrantsListItem;