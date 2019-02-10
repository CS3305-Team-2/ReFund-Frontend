import React, { Component} from 'react';
import styles from './UsersPage.scss';
import { Link } from 'react-router-dom';
import UserListItem from '../../components/UsersListItem/UsersListItem';
import axios from 'axios';
import { apiUrl } from '../../config';
import displayFriendly from '../../utils/displayFriendly'

// Create mock data to use
const users = [
  {
    name: 'John Doe',
    institution: 'University College Cork',
    jobTitle: 'Professor of Mathematics',
    researchCenter: 'Fire'
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'Jane Doe',
    institution: 'Trinity College Dublin',
    jobTitle: 'Professor of Computer Science',
    researchCenter: 'Wind',
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'John Doe',
    institution: 'UCC',
    jobTitle: 'Professor of Mathematics',
    researchCenter: 'Fire'
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'Jane Doe',
    institution: 'University of Limerick',
    jobTitle: 'Professor of Computer Science',
    researchCenter: 'Wind',
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'John Doe',
    institution: 'NUI Galway',
    jobTitle: 'Professor of Mathematics',
    researchCenter: 'Fire'
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'Jane Doe',
    institution: 'Trinity College Dublin',
    jobTitle: 'Professor of Computer Science',
    researchCenter: 'Wind',
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'John Doe',
    institution: 'UCC',
    jobTitle: 'Professor of Mathematics',
    researchCenter: 'Fire'
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'Jane Doe',
    institution: 'Trinity College Dublin',
    jobTitle: 'Professor of Computer Science',
    researchCenter: 'Wind',
    // Etc etc, add all the necessary fields.
  },
]

class UsersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      searchVal: '',
      searchType: 'firstName',
      searchTerm: null,
      filterOptions: ['firstName', 'lastName', 'jobTitle'],
      users: [],
    }

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios.get(apiUrl + '/users').then(
      res => {
        console.log(res.data);
        this.setState({users: res.data });
      }
    );
  }
  
  getUsers(users) {
    // This will return a list of UserListItem components for each 'user' in the list at the top

    // users is the user list at the top of this page
    return users.map((user)=>{
      // Finish the UserListItem component. Found in /components. 
      return (
        <Link to={`/user/${user.id}`} className={styles.userLink}><UserListItem user={user} /></Link>
      ); // Each <UserListItem shows an user in the list of users this page shows.
    });
  }

  search() {
    this.setState(prevState => ({searchTerm: prevState.searchVal}));
  }

  searchFilter(users, searchType, searchTerm) {
    let term = searchTerm.toLowerCase();

    let results = [];

    users.slice().forEach(user => {
      if (user[searchType].toLowerCase().includes(term)) results.push(user);
    });

    return results;
  }
  

	render() {
    const state = this.state;
    const activeTab = styles.activeTab;
    let userList = state.users.slice();

    const { searchType, searchTerm } = state;
    if (searchTerm != null && searchTerm.length > 1) userList = this.searchFilter(userList, searchType, searchTerm);

    let userListItems = this.getUsers(userList);

    const exampleData = {
      stuff: 'example stuff'
    }
  
    const filterOptions = state.filterOptions.map((option)=>{
      return (
        <option>{displayFriendly(option)}</option>
      )
    });

		return (
			<div>
        <div className={styles.header}>
          <div className={styles.title}>Researchers</div>
          <div className={styles.desc}></div>
        </div>

        <div className={styles.search}>
          <select 
            className={styles.select} 
            selected
            value={displayFriendly(searchType)}
            onChange={(evt) => this.setState({searchType: state.filterOptions[evt.target.selectedIndex]})}
          >
            {filterOptions}
          </select>
          <input 
            className={styles.searchInput}
            type="text" 
            onKeyPress={(e)=> { if (e.key == 'Enter') this.search(); }}
            onChange={(evt)=>this.setState({searchVal: evt.target.value})} value={this.state.searchVal}
          />
          <button 
            className={styles.searchButton}
            onClick={this.search}
          >Search</button>
        </div>

        <div className={styles.users}>
          {userListItems}
        </div>
			</div>
		)
;	}
}

export default UsersPage;