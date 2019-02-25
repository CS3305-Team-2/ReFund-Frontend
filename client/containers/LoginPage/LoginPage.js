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
            email: '0000-0000-0000-0001',
            password: 'hihowareyou'
        }

        this.submitLogin = this.submitLogin.bind(this);
    }
  
  submitLogin() {
    const {
      email,
      password
    } = this.state;

    
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    console.log(email, password);
    axios.post(apiUrl + '/login', formData).then((res)=>{
      // console.log(res.status, res.body, res.data, res.headers)
      console.log(res);
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      this.props.history.push("/home");
    }).catch(e => {console.log(e)});

  }

	render() {
    const state = this.state;
    const props = this.props;

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
			</div>
		);
  }
}

export default withRouter(LoginPage);