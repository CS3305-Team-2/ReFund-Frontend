import React, { Component } from 'react';
import styles from './LoginForm.scss';
import {apiUrl, baseUrl} from '../../config';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: 'noah@santschi-cooney.ch',
        password: 'hihowareyou'
    }
    this.submitLogin = this.submitLogin.bind(this);
  }
  
  submitLogin() {
    const {
        email,
        password
    } = this.state;
    this.props.onSubmit(email, password)
  }

  render() {
      const state = this.state;
      const props = this.props;

    return (
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
          <div>
              <a href={`https://orcid.org/oauth/authorize?client_id=APP-XT4GEE3Q57GDS0HW&response_type=code&scope=/authenticate&redirect_uri=${baseUrl}#/oauth`}><img src="https://members.orcid.org/sites/default/files/create_connect_button.png"/></a>
          </div>
      </div>
    );
  }
}

export default LoginForm;