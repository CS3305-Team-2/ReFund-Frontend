import React, { Component} from 'react';
import styles from './CreateProjectModal.scss';
import cx from 'classnames';
import Close from '@material-ui/icons/Close';
import AddTeamMember from '../AddTeamMember/AddTeamMember';
import axios from 'axios';
import { apiUrl } from '../../config';
import getCurrentUser from '../../utils/getCurrentUser';

class CreateProjectModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
      form: {
        name: '',
        budget: null,
        description: '',
      },
      members: [],
      users: [],
      loaded: false,
      showError: false,
    }

    this.createProject = this.createProject.bind(this);
  }

  componentDidMount() {
    axios.get(apiUrl + '/users').then(
      res => {
        console.log(res.data);
        this.setState({users: res.data , loaded: true});
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

  createProject() {
    const { budget, name, description } = this.state.form;
    const members = this.state.members;
    const currentUser = this.props.currentUser;

    const todayDate = new Date().toISOString().slice(0,10);    
    const data = {
      budget,
      name,
      description,
      teamMembers: [{ 
        startDate: todayDate, endDate: todayDate,
        userId: currentUser.id, role: 'PI'
      }]
    };

    members.forEach((member)=> {
      const teamMember = Object.assign({}, member);
      teamMember.startDate = todayDate;
      teamMember.endDate = todayDate;
      data.teamMembers.push(teamMember);
    });

    console.log(data);
    axios.post(apiUrl + '/project', data)
    .then((res) => {
      console.log('created', res.data);
      this.props.onCreateProject();
    })
    .catch((e) => console.log(e.response));
  }

	render() {
    const { props, state } = this;
    const open = this.props.open;
    const { users, members, loaded } = state;
    
    const rootStyle = {};
    if (open) {
      rootStyle.transform = 'translateY(0%)';
      rootStyle.opacity = '1';
    }

    const otherUsers = users.filter((user) => user.id != this.props.currentUser.id)

		return (
      <div id="modalid" className={cx(styles.modalRoot, {'d-block' : this.props.open}, {[styles.modalShow] : this.props.open})}>
        <div className={cx(styles.modalContent, {[styles.modalShow] : this.props.open})}
          style={rootStyle}
        >
        <Close className={styles.closeButton} onClick={this.props.onClose}/>
        <div className={styles.title}>Create Project</div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Project Name</label>
          <input 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=>this.updateForm('name', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Budget</label>
          <input 
            type="number" 
            className={styles.textInput} 
            onChange={(evt)=> this.updateForm('budget', evt.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Description</label>
          <textarea 
            type="text" 
            className={styles.textInput} 
            onChange={(evt)=> this.updateForm('description', evt.target.value)}
          />
        </div>
        <AddTeamMember 
          users={otherUsers}
          members={members}
          loaded={state.loaded}
          setMembers={(members) => this.setState({ members })}
        />
        <div className={styles.buttonContainer}>
          <div 
            className={styles.loginButton}
            onClick={this.createProject}
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