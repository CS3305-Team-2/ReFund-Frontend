import React, { Component} from 'react';
import styles from './AddTeamMember.scss';
import cx from 'classnames';
import Add from '@material-ui/icons/Add';
import axios from 'axios';
import { apiUrl } from '../../config';


class AddTeamMember extends Component {
	constructor(props) {
		super(props);
		this.state = {
    }
    this.addMember = this.addMember.bind(this);
  }

  selectMember(inputIndex, evt) {
    const user = this.props.users[evt.target.selectedIndex];
    const members = this.props.members.slice();
    members[inputIndex].userId = user.id;
    this.props.setMembers(members);
  }

  idToName(id) {
    const users = this.props.users.slice();
    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];
      if (user.id == id) {
        return `${user.firstName} ${user.lastName}`
      };
    }
  }

  updateRole(inputIndex, val) {
    const members = this.props.members.slice();
    members[inputIndex].role = val;
    this.props.setMembers(members);
  }

  getTeamMembers() {
    const userOptions = this.props.users
      .map((user)=> {
      const name = `${user.firstName} ${user.lastName}`;
      return (
        <option className={styles.memberOption} key={name}>{name}</option>
      );
    });

    const members = this.props.members.map((member, inputIndex) => {
      return (
        <div className={styles.teamMemberRow} key={member.userId}>
          <div className={styles.inputContainer}>
            <select className={styles.memberSelect} 
              onChange={(evt) => this.selectMember(inputIndex, evt)}
              value={this.idToName(member.userId)}
            >
              {userOptions}
            </select>
          </div>
          <div className={styles.inputContainer}>
            <input 
              type="text" 
              placeholder="Role"
              value={member.role}
              className={styles.textInput} 
              onChange={(evt)=> this.updateRole(inputIndex, evt.target.value)}
            />
          </div>
        </div>
      );
    });
    return members;
  }

  addMember() {
    const members = this.props.members.slice();
    const users = this.props.users.slice();
    members.push({ userId: users[0].id, role: ''});
    this.props.setMembers(members);
  }
	
	render() {
    const state = this.state;
    const props = this.props;
    if (!props.loaded) return <div>Loading..</div>

    console.log(state);
    const members = this.getTeamMembers();
    
		return (
			<div className={styles.root}>
        <div className={styles.heading}>
          Team Members
        </div>
        {members}
        <Add className={styles.addMember} style={{ fontSize: '28px' }} onClick={this.addMember}/>
			</div>
		)
;	}
}

export default AddTeamMember;