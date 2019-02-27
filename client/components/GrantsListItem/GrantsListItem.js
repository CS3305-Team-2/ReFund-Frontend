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
    
    proposalButton() {
        if (false) return <div />; // If logged out
        return (
            <div className={cx(styles.applyButton)} onClick={this.props.onApply}>
            Apply
            </div>
        )
    }
        
    render() {
        const state = this.state;
        const grant = this.props.grant;
            
        return (
            <div className={styles.root}>
                <div className="row mb-2">
                    <div className={cx('col flex-grow-1', styles.title)}>{grant.title}</div>
                    {this.proposalButton()}
                </div>
                <div className={cx('row', styles.grant)}>
                    <div className={cx('col-12', styles.left)}>
                        <div className={styles.description}>{grant.description}</div>
                    </div>
                    <div className={cx('col-12', styles.right)}>
                        <div className={styles.detail}><span className={styles.label}>Deadline - </span>{grant.deadline}</div>
                        <div className={styles.detail}><span className={styles.label}>Duration - </span>{grant.duration}</div>
                        <div className={styles.detail}><span className={styles.label}>Amount - </span>€{grant.amount}</div>
                    </div>
                </div>               
            </div>
        );	
    }
}
            
export default GrantsListItem;