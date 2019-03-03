import React, { Component} from 'react';
import styles from './ProjectDetail.scss';
import cx from 'classnames';
import axios from 'axios';
import { apiUrl } from '../../config';
import displayFriendly from '../../utils/displayFriendly';
import { codeToArea } from '../../utils/nrpAreas';
import toggleModal from '../../utils/toggleModal';
import SubmitProposalModal from '../../components/SubmitProposalModal/SubmitProposalModal';
import getCurrentUser from '../../utils/getCurrentUser';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        year: '',
        plannedActivities: '',
        planDeviation: '',
        threeHighlights: '',
        challenges: ''
      },
      staffState:0,
      projectState:0,
      loaded: false,
      proposalModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.postReport = this.postReport.bind(this);
  }

  componentDidMount() {
    this.fetchProject();
  }

  fetchProject() {
    const id = this.props.match.params.id;      
    axios.get(apiUrl + `/project/${id}`).then(
      res => {
        console.log('project', res.data);
        this.setState({ project: res.data, loaded: true });
      }
    ).catch(e => console.log(e.response));
  }

  updateForm(key, value) {
    const form = Object.assign({}, this.state.form);
    form[key] = value;
    this.setState({ form });
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
  

  getProposal(project, isProjectMember) {
    const proposal = project.proposal;
    return (
      <>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>{proposal.title}</div>
          {isProjectMember && project.status == 'DRAFT' ? this.getProposalControls() : ''}
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

  isProjectMember(currentUser, project) {
    const members = project.teamMembers;
    for (let i = 0; i < members.length; i += 1) {
      if (currentUser.id === members[i].userId) {
        return true;
      }
    }
    return false;
  }

  postReport() {
    const form = Object.assign({}, this.state.form);
    form.projectId = this.state.project.id;
    console.log('report post', form);
    axios.post(apiUrl + `/annualReport/`, form).then(
      res => {
        console.log('annualreport res', res.data);
        location.reload();
      }
    ).catch(e => console.log(e.response));
  }

  createReport() {
    return (
      <div className={styles.section}>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>Create Report</div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Year</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('year', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Planned Activities</label>
          <textarea 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('plannedActivities', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Plan Deviation</label>
          <textarea 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('planDeviation', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Three Highlights</label>
          <textarea 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('threeHighlights', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Challenges</label>
          <textarea 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('challenges', evt.target.value)}
          />
        </div>
        <div 
          className={styles.submitReport} 
          onClick={this.postReport}
        >
          Submit Report
        </div>

      </div>
    );
  }

  proposalEdited() {
    location.reload();
  }

  render() {
    const state = this.state;
    const props = this.props;

    if (!state.loaded) return <div>Loading...</div>;

    const project = state.project;
    const proposal = project.proposal;
    
    const currentUser = getCurrentUser().user;
    const isProjectMember = this.isProjectMember(currentUser, project)

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
            {this.getProposal(project, isProjectMember)}
            <SubmitProposalModal 
              open={this.state.proposalModalOpen}
              onClose={() => this.toggleModal('proposalModalOpen')}
              proposalEdited={this.proposalEdited}
              proposal={proposal}
              fileNotRequired
              editMode
            />
            </>
          : <div >No Proposal Created</div>}
          </div>

        </div>

        <div className={styles.sectionHeading}>Reports</div>
        {this.getReports()}
        {this.createReport()}
      </div>
    );	
  }
}

export default ProjectDetail;