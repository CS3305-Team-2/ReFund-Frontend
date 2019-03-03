import React, { Component} from 'react';
import styles from './ProjectDetail.scss';
import cx from 'classnames';
import axios from 'axios';
import { apiUrl } from '../../config';
import displayFriendly from '../../utils/displayFriendly';
import { codeToArea } from '../../utils/nrpAreas';
import toggleModal from '../../utils/toggleModal';
import SubmitProposalModal from '../../components/SubmitProposalModal/SubmitProposalModal';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffState:0,
      projectState:0,
      loaded: false,
      proposalModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;      
    axios.get(apiUrl + `/project/${id}`).then(
      res => {
        console.log('project', res.data);
        this.setState({ project: res.data, loaded: true });
      }
    ).catch(e => console.log(e.response));
  }

  getProposalControls() {
    return (
      <div className="d-flex">
        <div 
          className={styles.proposalApprove} 
          onClick={() => this.toggleModal('proposalModalOpen')}
        >
          Edit
        </div>
        {/*<div 
          className={styles.proposalDelete} 
          onClick={() => this.updateProposal(proposal, 'delete', index)}
        >
          Delete
        </div>*/}
      </div>
    );
  }

  toggleModal(modalType) {
    const bodyClass = document.body.className;
    if (bodyClass.includes(' modal-open')) {
      document.body.className = bodyClass.replace(' modal-open', '');
      this.setState({[modalType]: false });
    } else {
      document.body.className += ' modal-open';
      this.setState({[modalType]: true});
    }
  }
  

  getProposal(proposal) {
    return (
      <>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>{proposal.title}</div>
          {this.getProposalControls()}
        </div>
        <div className={styles.detail}><span className={styles.label}>Status - </span>{displayFriendly(proposal.status.toLowerCase())}</div>
        <div className={styles.detail}><span className={styles.label}>Duration (months) - </span>{proposal.duration}</div>
        <div className={styles.detail}><span className={styles.label}>Ethical Issues - </span>{proposal.ethicalIssues}</div>
        <div className={styles.detail}><span className={styles.label}>Lay Abstract - </span>{proposal.layAbstract}</div>
        <div className={styles.detail}><span className={styles.label}>Scientific Abstract - </span>{proposal.scientificAbstract}</div>
        <div className={styles.detail}><span className={styles.label}>Alignment to legal remit - </span>{proposal.legalRemitAlignment}</div>
        <div className={styles.detail}><span className={styles.label}>NRP Area - </span>{codeToArea(proposal.nrpArea)}</div>
        <div className={styles.detail}><span className={styles.label}>Status - </span>{proposal.status}</div>
      </>
    );
  }

  getReports() {
    /*
      challenges: "A lot of em"
      id: 1
      planDeviation: "No deviation"
      plannedActivities: "yes"
      projectId: 1
      threeHighlights: "No highlights"
      year: 2018
    */
    return this.state.project.annualReport.map((report) => {
      return (
        <div className={styles.profileSections}>
          <div className={styles.section}>
            <div className={styles.detail}>
              <span className={styles.label}>Year - </span>
              {report.year}
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Challenges - </span>
              {report.challenges}
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Plan Deviation - </span>
              {report.planDeviation}
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Highlights - </span>
              {report.threeHighlights}
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Planned Activities - </span>
              {report.plannedActivities}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const state = this.state;
    const props = this.props;

    if (!state.loaded) return <div>Loading...</div>;

    const project = state.project;
    const proposal = project.proposal;

    return (
      <div>
        <div className={styles.sectionHeading}>Project</div>
        <div className={styles.profileSections}>
            <div className={styles.section}>
                <div className={styles.headingContainer}>
                  <div className={styles.heading}>{project.name}</div>
                </div>
                <div className={styles.detail}>{project.description}</div>
                <div className={styles.detail}><span className={styles.label}>Budget - </span>€{project.budget}</div>
                <div className={styles.detail}>
                  <div className={styles.label}>Project Members</div>
                  {project.teamMembers.map((member) => {
                    return (<div>{member.name} - {member.role}</div>);
                  })}
                </div>
            </div>
        </div>
        <div className={styles.sectionHeading}>Grant Proposal</div>
        <div className={styles.profileSections}>
          <div className={styles.section}>
          { proposal ? 
            <>
            {this.getProposal(proposal)}
            <SubmitProposalModal 
              open={this.state.proposalModalOpen}
              onClose={() => this.toggleModal('proposalModalOpen')}
              proposal={proposal}
              fileNotRequired
            />
            </>
          : <div >No Proposal Created</div>}
          </div>

        </div>

        <div className={styles.sectionHeading}>Reports</div>
        {this.getReports()}
      </div>
    );	
  }
}

export default ProjectDetail;