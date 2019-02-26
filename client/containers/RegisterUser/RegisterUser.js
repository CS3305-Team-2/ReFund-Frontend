import React, { Component} from 'react';
import styles from './RegisterUser.scss';
import { apiUrl } from '../../config';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = { // becomes part of url on submit (need to fix)
      email: '',
      password: '',
      user_type: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    // Check password and confirm_password are equal (or do in handleChange?)
    alert('Submitted');
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.section}>
          <p>Email: <input type="text" name="email" onChange={this.handleChange}></input></p>
          <p>Password: <input type="password" name="password" onChange={this.handleChange}></input></p>
          <p>Confirm password: <input type="password" name="password_confirm"></input></p>
          <p>User type: <select name="user_type" value={this.state.user_type.value} onChange={this.handleChange}>
              <option defaultValue name="researcher" value="researcher">Researcher</option>
              <option name="admin" value="admin">Administrator</option>
              <option name="sfi_admin" value="sfi_admin">SFI Administrator</option>
            </select></p>
        </div>

        <input type="submit" value="Submit" />
      </form>
    );

  }

}

export default RegisterUser;