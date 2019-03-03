import React, { Component} from 'react';
import styles from './SubmitProposalModal.scss';
import cx from 'classnames';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { apiUrl } from '../../config';
import jwtHeader from '../../utils/jwtHeader';
import { areaToCode } from '../../utils/nrpAreas';

const emptyForm = {
  title: '',
  projectId: null,
  duration: '',
  declaration: false,
  ethicalIssues: '',
  layAbstract: '',
  scientificAbstract: '',
  legalRemitAlignment: '',
  applicantLocationStatement: '',
  nrpArea: areaToCode[Object.keys(areaToCode)[0]],  
}

class SubmitProposalModal extends Component {
	constructor(props) {
    super(props);
    let form = emptyForm;
    if (props.proposal) form = props.proposal
    console.log('PRO EDIT', props.proposal);
		this.state = {
      form,
      loaded: false,
      showError: false,
      selectedFile: null,
    }

    this.submitProposal = this.submitProposal.bind(this);
    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.selectProject = this.selectProject.bind(this);
  }

  componentDidMount() {
    console.log('fetcing', jwtHeader());
    axios.get(apiUrl + '/project', { headers: jwtHeader()}).then(
      res => {
        console.log('fetched', res.data);
        const projects = res.data.filter((project) => project.proposal == null);
        if (projects.length > 0) {
          this.updateForm('projectId', projects[0].id);
        } 
        this.setState({ projects, loaded: true });
      }
    ).catch(e => console.log(e.response));
  }

  updateForm(key, value) {
    const form = Object.assign({}, this.state.form);
    form[key] = value;
    this.setState({ form });
  }

  validate(form, file) {
    let isValid = true;
    for (let field in form) {
      if (!form[field]) {
        isValid = false;
      }
    }
    const isFileNotRequired = this.props.fileNotRequired;

    if ( (!isFileNotRequired && file == null) || !isValid) {
      this.setState({ showError: true });
    } else {
      this.setState({ showError: false });
    }

    return isValid;
  }

  selectProject(evt) {
    const project = this.state.projects[evt.target.selectedIndex];
    this.updateForm('projectId', project.id);
  }

  idToProjectName(id) {
    const projects = this.state.projects.slice();
    for (let i = 0; i < projects.length; i += 1) {
      const project = projects[i];
      if (project.id == id) {
        return project.name;
      };
    }
  }

  handleselectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  postProposal(file, proposal) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("proposal", new Blob([JSON.stringify(proposal)], {
      type: 'application/json'    
    }));
    
    console.log('submitting', file, proposal);
    // return ;
    if (this.props.editMode) {
      axios.post(apiUrl + '/proposal/update', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.response));
    } else {
      axios.post(apiUrl + '/proposal', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.response));      
    }
  }

  submitProposal(status) {
    const form = Object.assign({}, this.state.form);

    form.status = status;
    if (!this.props.editMode) {
      form.primaryAttribution = this.props.grant.id;
    }
    const selectedFile = this.state.selectedFile;
    
    const isValid = this.validate(form, selectedFile);
    console.log('isValid', isValid, form, selectedFile);
    if (isValid) {
      this.postProposal(selectedFile, form);
      this.props.onClose();
      if(this.props.editMode) this.props.proposalEdited();
    }
  }
  
  render() {
    const state = this.state;
    const open = this.props.open;
    const rootStyle = {};
    if (open) {
        rootStyle.transform = 'translateY(0%)';
        rootStyle.opacity = '1';
    }
    if(!state.loaded) return <div></div>;
    const form = state.form;

    return (
      <div id="modalid" className={cx(styles.modalRoot, {'d-block' : this.props.open}, {[styles.modalShow] : this.props.open})}>
        <div className={cx(styles.modalContent, {[styles.modalShow] : this.props.open})}
          style={rootStyle}
        >
        { !state.loaded ?
          <div>Loading...</div> : 
        <div>
          <Close className={styles.closeButton} onClick={this.props.onClose}/>
          <div className={styles.title}>Apply for Grant</div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Proposal Title</label>
            <input 
              type="text" 
              value={form.title}
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('title', evt.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            { this.props.editMode ? 
              <label className={styles.inputLabel}>Project Already Set</label> :           
              <>
              <label className={styles.inputLabel}>For Project</label>
              <select 
                type="text" 
                className={styles.textInput} 
                value={this.idToProjectName(state.form.projectId)}
                onChange={this.selectProject}
              >
                {this.state.projects.map((project)=> <option key={project.name}>{project.name}</option>)}
              </select>
              </>
            }
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Applicant Location</label>
            <input 
              type="text" 
              placeholder="Enter Country"
              value={form.applicantLocationStatement}
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('applicantLocationStatement', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Duration (months)</label>
            <input 
              type="number" 
              value={form.duration}
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('duration', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Ethical Issues</label>
            <input 
              type="text" 
              value={form.ethicalIssues}
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('ethicalIssues', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Lay Abstract</label>
            <textarea 
              type="text" 
              value={form.layAbstract}
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('layAbstract', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Scientific Abstract</label>
            <textarea 
              type="text" 
              value={form.scientificAbstract}
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('scientificAbstract', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Legal Remit Alignment</label>
            <textarea 
              type="text" 
              value={form.legalRemitAlignment}
              placeholder="Please describe how your proposal is aligned with SFI's legal remit (max 250 words)"
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('legalRemitAlignment', evt.target.value)}
            />
          </div>


          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>NRP Area</label>
            <select 
              type="text" 
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('nrpArea', areaToCode[evt.target.value])}
            >
              {Object.keys(areaToCode).map((area) => <option key={area}>{area}</option>)} 
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.consentLabel}>
              Submission of an application confirms acceptance of and agreement with
              the SFI Terms and Conditions of Research Grants; that the applicant meets eligiblity 
              requirements; that the project is in full agreement with all legal and regulatory matters governing research in Ireland;
              that no aspect of this project is already being funded from another source and that all details
              provided are correct. Do you agree?
            </label>
            <input 
              type="checkbox" 
              checked={form.declaration}
              onChange={(evt)=>this.updateForm('declaration', !this.state.form.declaration)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Upload Proposal</label>
            <input 
              type="file" 
              className={styles.textInput} 
              onChange={this.handleselectedFile}
            />
          </div>
          <div className={cx(styles.validationMessage, {[styles.showError]: this.state.showError })}>
            *All Fields and declaration agreement are mandatory
          </div>
          <div className={styles.buttonContainer}>
            <div 
              className={styles.loginButton}
              onClick={() => this.submitProposal('RO_SUBMITTED')}
            >Submit</div>

            <div 
              className={styles.loginButton}
              onClick={() => this.submitProposal('DRAFT')}
            >Draft</div>

            <div 
              className={styles.loginButton}
              onClick={() => this.validate(state.form, state.selectedFile)}
            >Validate</div>
          </div>

        </div>
        }
      </div>
    </div>
  );
	}
}

export default SubmitProposalModal;