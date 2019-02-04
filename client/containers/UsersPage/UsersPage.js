import React, { Component} from 'react';
import styles from './UsersPage.scss';
import cx from 'classnames';
import UserListItem from '../../components/UsersListItem/UsersListItem';

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
      searchType: 'Name',
      searchTerm: null,
    }

    this.search = this.search.bind(this);
  }
  
  getUsers(users) {
    // This will return a list of UserListItem components for each 'user' in the list at the top

    // users is the user list at the top of this page
    return users.map((user)=>{
      // Finish the UserListItem component. Found in /components. 
      return <UserListItem user={user} /> // Each <UserListItem shows an user in the list of users this page shows.
    });
  }

  search() {
    this.setState({})
  }

  searchFilter(users, searchType, searchTerm) {
    let type = searchType.toLowerCase();
    let term = searchTerm.toLowerCase();

    let results = [];
    users.slice().forEach(user => {
      console.log(user[type], term);
      if (user[type].toLowerCase().includes(term)) results.push(user);
    });

    return results;
  }
	
	render() {
    const state = this.state;
    console.log(state);
    const activeTab = styles.activeTab;
    let userList = users.slice();

    const { searchType, searchTerm } = state;
    if (searchTerm != null && searchTerm.length > 1) userList = this.searchFilter(userList, searchType, searchTerm);

    let userListItems = this.getUsers(userList);

    const exampleData = {
      stuff: 'example stuff'
    }
  
		return (
			<div>
        {/* 
          CSS Example. When adding a class remember to use "className" not "class".
          e.g <div className={styles.exampleClass}> </div>
          Then in the .scss file. write the css class exampleClass

          If you want to use multiple classes. use the 'cx' library I've imported at the top
          how to use: 'https://github.com/JedWatson/classnames'
          <div className={cx(styles.exampleClass, styles.exampleClass2)}> </div>
        */}


        <div className={styles.header}>
          <div className={styles.title}>Researchers</div>
          <div className={styles.desc}></div>
        </div>

        <div className={styles.search}>
          <select 
            className={styles.select} 
            value={this.state.searchType}
            onChange={(evt) => this.setState({searchType: evt.target.value})}
          >

            <option>Name</option>
            <option>Institution</option>
          </select>
          <input 
            className={styles.searchInput}
            type="text" 
            onChange={(evt)=>this.setState({searchVal: evt.target.value})} value={this.state.searchVal}
          />
          <button 
            className={styles.searchButton}
            onClick={() => this.setState(prevState => ({searchTerm: prevState.searchVal}))}
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