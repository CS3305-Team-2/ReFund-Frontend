import React, { Component } from 'react';
import styles from './LoginForm.scss';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
      orcid: '0000-0000-0000-0001',
      password: 'hihowareyou'
    }
    this.submitLogin = this.submitLogin.bind(this);
  }
  
  submitLogin() {
    const {
      orcid,
      password
    } = this.state;
    this.props.onSubmit(orcid, password)
  }

	render() {
    const state = this.state;
    const props = this.props;

		return (
      <div className={styles.loginContainer}>
        <div className={styles.title}>Login</div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Orcid</label>
          <input 
            type="text" 
            className={styles.textInput} 
            value={state.orcid}
            onChange={(evt)=>this.setState({orcid: evt.target.value})}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Password</label>
          <input 
            type="password" 
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
		);
  }
}

export default LoginForm;