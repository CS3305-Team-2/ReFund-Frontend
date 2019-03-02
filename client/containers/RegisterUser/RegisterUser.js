import React, { Component} from 'react';
import styles from './RegisterUser.scss';
import { apiUrl } from '../../config';
import axios from 'axios';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = { // becomes part of url on submit (need to fix)
      email: '',
      password: '',
      user_type: '',
      host_institution: '',
      institutes: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getHostInstitutes();
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

  getHostInstitutes() {
    axios.get(apiUrl + `/hostInstitution`).then(
      res => {
        //console.log('fetched', res, res.data);
        this.setState({institutes: res.data})
      }
    ).catch(err => console.log(err));
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
              <option name="ro_admin" value="ro_admin">Research Office Administrator</option>
              <option name="sfi_admin" value="sfi_admin">SFI Administrator</option>
            </select></p>
          <p>Host institute: <select name="host_institution" value={this.state.host_institution.value} onChange={this.handleChange}>
            {
              this.state.institutes.map(function(inst) {
                return <option key={inst.id}
                  value={inst.id}>{inst.name}</option>;
              })
            }
            </select></p>
        </div>

        <input type="submit" value="Submit" />
      </form>
    );

  }

}

export default RegisterUser;