import React, { Component} from 'react';
import styles from './CreateProjectModal.scss';
import cx from 'classnames';
import Close from '@material-ui/icons/Close';

class CreateProjectModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
      form: {
        title: '',
        description: '',
        deadline: '',
        duration: '',
        amount: '',
      },
      showError: false,
    }

    this.createGrant = this.createGrant.bind(this);
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
  createGrant() {
    const form = Object.assign({}, this.state.form);
    const validated = this.validate(form);
    if (!validated) return;
    console.log('creating grant', form);
    this.props.onCreateGrant(form);
  }
  
	render() {
    const state = this.state;
    
    const open = this.props.open;
    
    const rootStyle = {};
    if (open) {
      rootStyle.transform = 'translateY(0%)';
      rootStyle.opacity = '1';
    }
    // Team Members, budget, 


		return (
      <div id="modalid" className={cx(styles.modalRoot, {'d-block' : this.props.open}, {[styles.modalShow] : this.props.open})}>
        <div className={cx(styles.modalContent, {[styles.modalShow] : this.props.open})}
          style={rootStyle}
        >
        <Close className={styles.closeButton} onClick={this.props.onClose}/>
        <div className={styles.title}>Create Project</div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Title</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('title', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Description</label>
          <textarea 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('description', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Deadline</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('deadline', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Duration</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('duration', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Amount</label>
          <input 
            type="number" 
            className={styles.textInput} 
            onChange={(evt)=> this.updateForm('amount', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Proposal Template</label>
          <input 
            type="file" 
            className={styles.textInput} 
            onChange={(evt)=>this.setState({password: evt.target.value})}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div 
            className={styles.loginButton}
            onClick={this.createGrant}
          >Create</div>
        </div>
        <div className={cx(styles.validationMessage, {[styles.showError]: this.state.showError })}>
          *All Fields are mandatory
        </div>
      </div>
      </div>
		)
;	}
}

export default CreateProjectModal;