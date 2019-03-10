import React, { Component } from 'react';
import cx from 'classnames';
import axios from 'axios';
import { apiUrl } from '../../config';
import getCurrentUser from '../../utils/getCurrentUser';
import { Link } from 'react-router-dom';
import styles from './Notifications.scss';
import jwtHeader from '../../utils/jwtHeader';
import {displayFriendlyUnderscore, toAllCapsSpace} from '../../utils/displayFriendly'

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'proposals',
      loaded: false,
      actionResult: {}
    }
  }

  componentDidMount() {
    const currentUser = getCurrentUser().user;
    const userType = currentUser.type.type;

    if (userType === 'researcher') {
      this.fetchYourProposals();
    } else {
      this.fetchProposals();
    }
  }

  fetchProposals() {
    const currentUser = getCurrentUser().user;
    const userType = currentUser.type.type;
    
    const typeToStatus = {
      'ro_admin': 'RO_SUBMITTED',
      'sfi_admin': 'RO_APPROVED'
    };

    axios.get(apiUrl + '/proposal', { params: { status: typeToStatus[userType] }}).then(
      res => {
        console.log('fetched proposals', res.data);
        this.setState({ proposals: res.data, loaded: true });
      }
    ).catch(e => console.log(e.response));
  }

  fetchYourProposals() {
    axios.get(apiUrl + '/proposal/owned', { headers: jwtHeader() } ).then(
      res => {
        console.log('your proposals', res.data);
        this.setState({ proposals: res.data.filter((proposal) => proposal != null), loaded: true });
      }
    ).catch(e => console.log(e.response));
  }

  updateProposal(proposal, decision, index) {
    let resultLabels = { 'approve': 'Approved', 'reject': 'Rejected', 'delete': 'Deleted' };
    axios.post(apiUrl + `/proposal/${proposal.id}/${decision}`).then(
      res => {
        const actionResult = Object.assign({}, this.state.actionResult);
        actionResult[index] = resultLabels[decision];
        this.setState({ actionResult });
        console.log('done', res.data, decision, proposal, actionResult)
      }).catch(e => console.log(e.response));      
  }

  getProposalControls(proposal, index) {
    return (
      <>
        <div 
          className={styles.proposalApprove} 
          onClick={() => this.updateProposal(proposal, 'approve', index)}
        >
          Approve
        </div>
        <div 
          className={styles.proposalReject} 
          onClick={() => this.updateProposal(proposal, 'reject', index)}
        >
          Reject
        </div>
        <div 
          className={styles.proposalDelete} 
          onClick={() => this.updateProposal(proposal, 'delete', index)}
        >
          Delete
        </div>
      </>
    )
  }

  getProposals(isResearcher) {
    const proposals = this.state.proposals;
    console.log(this.state.proposals);
    if (proposals.length < 1) return <div>Nothing to Review</div>
    const actionResult = this.state.actionResult;
    return proposals.map((proposal, index) => {
      return (
        <div className={styles.proposalNotification}>
          <Link to={`/project/${proposal.projectId}`} className={styles.proposalLink}><div className={styles.proposalName}>{proposal.title}</div></Link>
          {isResearcher ? <div className={styles.proposalApprove} >{toAllCapsSpace(proposal.status)}</div> :
    
            actionResult[index] ? <div className={styles.resultLabel}>{actionResult[index]}</div> : 
            this.getProposalControls(proposal, index)
          }
        
        </div>
      );
    });
  }

  render() {
    const state = this.state;
    const props = this.props;

    const currentUser = getCurrentUser().user;
    const isResearcher = currentUser.type.type == 'researcher';

    const label = isResearcher ? 'Your Proposals' : 'Proposals To Review';

    return (
      <div className={styles.root}>
        <div className={styles.tabs}>
          <div
            className={cx(styles.tab, { [styles.activeTab]: state.activeTab === 'proposals' })}   
            onClick={() => this.setState({ activeTab: 'proposals' })}
          >
          {label}
          </div>
        </div>

        <div className={cx(styles.notificationsContainer)}>
          {this.state.loaded ? this.getProposals(isResearcher) : (
            <div className={styles.title}>Nothing to see here!</div>
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;