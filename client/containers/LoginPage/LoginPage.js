import React, { Component} from 'react';
import styles from './LoginPage.scss';
import cx from 'classnames';
import axios from 'axios';
import {apiUrl} from '../../config';
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      orcid: '',
      password: ''
    }

    this.submitLogin = this.submitLogin.bind(this);
  }
  
  submitLogin() {
    const {
      orcid,
      password
    } = this.state;
    // console.log('Loggin In. email: ' + email + ', pass: ' + password)
    /*axios.post(apiUrl + '/login', {
      email,
      password
    })*/
    const formData = new FormData();
    formData.set("orcid", orcid);
    formData.set("password", password);

    axios.post(apiUrl + '/login', formData).then((res)=>{
      console.log(res.status, res.body, res.data, res.headers)
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      this.props.history.push("/home");
    }).catch(e => {console.log(e)});


  }

	render() {
    const state = this.state;
    const props = this.props;

    const grant = grant;


		return (
			<div>
        <div className={styles.loginContainer}>
          <div className={styles.title}>Login</div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Orcid</label>
            <input 
              type="text" 
              className={styles.textInput} 
              value={state.email}
              onChange={(evt)=>this.setState({orcid: evt.target.value})}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Password</label>
            <input 
              type="text" 
              className={styles.textInput} 
              value={state.password}
              onChange={(evt)=>this.setState({password: evt.target.value})}
            />
          </div>
          <div className={styles.buttonContainer}>
            <div 
              className={styles.loginButton}
              onClick={this.submitLogin}
            >Login</div>
          </div>
        </div>
			</div>
		)
;	}
}

export default withRouter(LoginPage);