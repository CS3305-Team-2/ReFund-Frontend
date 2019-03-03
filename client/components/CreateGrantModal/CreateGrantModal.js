import React, { Component} from 'react';
import styles from './CreateGrantModal.scss';
import cx from 'classnames';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { apiUrl } from '../../config';

class CreateGrantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: '',
        amount: '',
        startDate: '',
        endDate: '',
        fundingBody: '',
        fundingProgramme: '',
      },
      selectedFile: null,
      showError: false,
    }

    this.createGrant = this.createGrant.bind(this);
    this.handleselectedFile = this.handleselectedFile.bind(this);
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
    if (file == null || !isValid) {
      this.setState({ showError: true });
    } else {
      this.setState({ showError: false });
    }

    return isValid;
  }

  handleselectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  postGrant(file, grant) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("grant", new Blob([JSON.stringify(grant)], {
      type: 'application/json'    
    }));
    
    console.log('submitting', file, grant);
    // return ;
    axios.post(apiUrl + '/grants', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
    .then((res) => {
      console.log(res.data);
      this.props.onCreateGrant(form);
    })
    .catch((e) => console.log(e.response));
  }

  createGrant() {
    const form = Object.assign({}, this.state.form);
    form.amount = Number(form.amount);
    form.status = 'open';

    const selectedFile = this.state.selectedFile;

    const isValid = this.validate(form, selectedFile);
    console.log('isValid', isValid, form, selectedFile);
    if (isValid) {
      this.postGrant(selectedFile, form);
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

    return (
      <div id="modalid" className={cx(styles.modalRoot, {'d-block' : this.props.open}, {[styles.modalShow] : this.props.open})}>
        <div 
          className={cx(styles.modalContent, {[styles.modalShow] : this.props.open})}
          style={rootStyle}
        >
          <Close className={styles.closeButton} onClick={this.props.onClose}/>
          <div className={styles.title}>Create Grant</div>
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
            <label className={styles.inputLabel}>Amount</label>
            <input 
                type="number" 
                className={styles.textInput} 
                onChange={(evt)=> this.updateForm('amount', evt.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Start Date</label>
            <input 
              type="text"
              placeholder="YYYY-MM-DD"
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('startDate', evt.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>End Date</label>
            <input 
              type="text"
              placeholder="YYYY-MM-DD"
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('endDate', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Funding Body</label>
            <input 
              type="text"
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('fundingBody', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Funding Programme</label>
            <input 
              type="text"
              className={styles.textInput} 
              onChange={(evt)=>this.updateForm('fundingProgramme', evt.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Proposal Template</label>
            <input 
              type="file" 
              className={styles.textInput} 
              onChange={this.handleselectedFile}
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
    );
  }
}
/*
title: "VR Gaming Research "
description: "Epic Games is pleased to launch the Science Foundation Ireland Fellowship Programme. This programme aims to provide successful candidates with the opportunity to develop their career through experiencing first-hand, the diversity of activities carried out by a funding agency."
amount: 1000000
endDate: "2020-02-20"
fundingBody: "Epic Games"
fundingProgramme: "VR Gaming Capability"
id: 1
startDate: "2019-02-02"
status: "open"
url: "grants_1.pdf"

*/
export default CreateGrantModal;