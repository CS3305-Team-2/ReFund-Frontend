import React, { Component } from 'react';
import styles from './Notifications.scss';
import cx from 'classnames';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'proposals'
        }
    }
  
    getProposals(proposals) {
        const arr = [];
        for (let i = 0; i < 5; i += 1) {
            arr.push(
                <div className={styles.proposalNotification}>
                    <div className={styles.proposalName}>Proposal Name</div>
                    <div className={styles.proposalApprove}>Approve</div>
                    <div className={styles.proposalReject}>Reject</div>
                </div>
            );
        }
        return arr;
    }

    render() {
        const state = this.state;
        const props = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.tabs}>
                    <div
                        className={cx(styles.tab, { [styles.activeTab]: state.activeTab === 'proposals' })}   
                        onClick={() => this.setState({ activeTab: 'proposals' })}
                    >
                    Proposals
                    </div>
                    <div 
                        className={cx(styles.tab, { [styles.activeTab]: state.activeTab === 'activeprojects' })}
                        onClick={() => this.setState({ activeTab: 'activeprojects' })}            
                    >
                    Other...
                    </div>
                </div>

                <div className={cx(styles.notificationsContainer)}>
                    {this.getProposals()}
                </div>
            
            </div>
        );
    }
}

export default Notifications;