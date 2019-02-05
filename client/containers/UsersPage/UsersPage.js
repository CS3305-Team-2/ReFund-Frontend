import React, { Component} from 'react';
import styles from './UsersPage.scss';
import cx from 'classnames';

// Create mock data to use
const users = [
  {
    name: 'John Doe',
    institution: 'UCC',
    // Etc etc, add all the necessary fields.
  },
  {
    name: 'Jane Doe',
    institution: 'Trinity College Dublin',
    // Etc etc, add all the necessary fields.
  },
]

class UsersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
    }
  }
  
  getUsers() {
    // This will return a list of UserListItem components for each 'user' in the list at the top

    // users is the user list at the top of this page
    return users.map((grant)=>{
      // Finish the UserListItem component. Found in /components. 
      // return <UserListItem user={user} /> // Each <UserListItem shows an user in the list of users this page shows.
    });
  }
	
	render() {
    const state = this.state;
    const activeTab = styles.activeTab;

    const userListItems = this.getUsers();

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
        <div className={styles.exampleClass}>
          Users List Page
        </div>
        
        <div>
          {/* Add in data like so. e.g for a user: add in their name with {user.name} into a div */}
          {exampleData.stuff} 
        </div>
			</div>
		)
;	}
}

export default UsersPage;