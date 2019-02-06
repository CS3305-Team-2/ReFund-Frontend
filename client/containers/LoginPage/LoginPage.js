import React, { Component} from 'react';
import styles from './LoginPage.scss';
import cx from 'classnames';
import axios from 'axios';
import {apiUrl} from '../../config';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      email: '',
      password: ''
    }

    this.submitLogin = this.submitLogin.bind(this);
  }
  
  submitLogin() {
    const {
      email,
      password
    } = this.state;
    // console.log('Loggin In. email: ' + email + ', pass: ' + password)
    /*axios.post(apiUrl + '/login', {
      email,
      password
    })*/
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
            <label className={styles.inputLabel}>Email</label>
            <input 
              type="text" 
              className={styles.textInput} 
              value={state.email}
              onChange={(evt)=>this.setState({email: evt.target.value})}
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

export default LoginPage;