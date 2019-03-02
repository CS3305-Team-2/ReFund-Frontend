import React, { Component} from 'react';
import styles from './SubmitProposalModal.scss';
import cx from 'classnames';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { apiUrl } from '../../config';

class SubmitProposalModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
      form: {
        title: '',
        description: '',
        projectId: 1,
        deadline: '',
        duration: '',
        amount: '',
      },
      showError: false,
      selectedFile: null,
    }

    this.submitProposal = this.submitProposal.bind(this);
    this.handleselectedFile = this.handleselectedFile.bind(this);
  }

  componentDidMount() {
    console.log('fetcing')
    axios.get(apiUrl + '/project/associatedTo/1').then(
      res => {
        console.log('fetched', res.data);
        this.setState({ projects: res.data });
      }
    );
  }

  updateForm(key, value) {
    const form = Object.assign({}, this.state.form);
    form[key] = value;
    this.setState({ form });
  }

  validate(form) {
    const fields = Object.keys(form);
    fields.forEach((field)=> { 
      if (form[field].length === 0) {
        this.setState({ showError: true });
        return false;
      }
    });
    return true;
  }

  submitProposal() {
    const { title, projectId } = this.state.form;
    const selectedFile = this.state.selectedFile;
    if (!title || projectId == null || selectedFile == null) return 
    this.props.onSubmit(selectedFile, { status: 'DRAFT', title, projectId });
  }

  handleselectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }
  
	render() {
    const state = this.state;
    
    const open = this.props.open;
    
    const rootStyle = {};
    if (open) {
      rootStyle.transform = 'translateY(0%)';
      rootStyle.opacity = '1';
    }



		return (
      <div id="modalid" className={cx(styles.modalRoot, {'d-block' : this.props.open}, {[styles.modalShow] : this.props.open})}>
        <div className={cx(styles.modalContent, {[styles.modalShow] : this.props.open})}
          style={rootStyle}
        >
        <div>

        <Close className={styles.closeButton} onClick={this.props.onClose}/>
        <div className={styles.title}>Apply for Grant</div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Proposal Title</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('title', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>For Project</label>
          <input 
            type="text" 
            className={styles.textInput} 
            placeholder="Enter emails of researchers "
            onChange={(evt)=>this.updateForm('project', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Duration (months)</label>
          <input 
            type="number" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('duration', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Ethical Issues</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('ethicalissues', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Lay Abstract</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('layabstract', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Scientific Abstract</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('scientificabstract', evt.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Legal Remit Alignment</label>
          <textarea 
            type="text" 
            placeholder="Please describe how your proposal is aligned with SFI's legal remit (max 250 words)"
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('legalremit', evt.target.value)}
          />
        </div>


        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>NRP Area</label>
          <select 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('nrparea', evt.target.value)}
          >
          <option>A</option>  
          <option>B</option>  
          <option>C</option>  
          <option>D</option>  
          </select>
        </div>

 
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Upload Proposal</label>
          <input 
            type="file" 
            className={styles.textInput} 
            onChange={this.handleselectedFile}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div 
            className={styles.loginButton}
            onClick={this.submitProposal}
          >Submit</div>
        </div>
        <div className={cx(styles.validationMessage, {[styles.showError]: this.state.showError })}>
          *All Fields are mandatory
        </div>
        </div>
      </div>
      </div>
		)
;	}
}

export default SubmitProposalModal;