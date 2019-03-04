import React from 'react';
import styles from './ProjectListItem.scss';

const friendlyStatus = status => {
  const map = {
    "DRAFT": 'Draft',
    'SFI_APPROVED': 'Approved',
    'RO_SUBMITTED': 'Awaiting RO Approval',
    'RO_APPROVED': 'Awaiting SFI Approval',
    'REJECTED': 'Rejected',
  }
  return map[status];
}

const ProjectListItem = (props) => {
  const project = props.project;
  const proposal = project.proposal;

  const proposalStatus = (
    <div className={styles.detail}>
      <span className={styles.label}>Proposal Status - </span>
      {proposal ? friendlyStatus(proposal.status) : 'No Proposal'} 
    </div>
  )
  
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>{project.name}</div>
        {proposalStatus}
      </div>
    </div>
  );	
};

export default ProjectListItem;