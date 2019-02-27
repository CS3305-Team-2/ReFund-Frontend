import React, { Component} from 'react';
import styles from './ProjectListPage.scss';
import cx from 'classnames';
import ProjectListItem from '../../components/ProjectListItem/ProjectListItem';
import { Link } from 'react-router-dom';
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal';
// Create mock data to use
const projects = [
  {
    title: 'Project Name',
    description: 'Project Desc'
    // Etc add all the fields
  },  
  {
    title: 'Project Name 2',
    description: 'Project Desc'
    // Etc add all the fields
  },
  {
    title: 'Project Name 3',
    description: 'Project Desc'
    // Etc add all the fields
  },
  {
    title: 'Project Name',
    description: 'Project Desc'
    // Etc add all the fields
  },
  {
    title: 'Project Name',
    description: 'Project Desc'
    // Etc add all the fields
  }
]

class ProjectListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      searchVal: '',
      searchType: 'Title',
      searchTerm: null,
    }

    this.search = this.search.bind(this);
  }
  
  toggleModal(modalType) {
    const bodyClass = document.body.className;
    if (bodyClass.includes(' modal-open')) {
      document.body.className = bodyClass.replace(' modal-open', '');
      this.setState({[modalType]: false });
    } else {
      document.body.className += ' modal-open';
      this.setState({[modalType]: true});
    }
  }

  getProjects(projects) {
    // This will return a list of ProjectListItem components for each 'project' in the list at the top

    // projects is the project list at the top of this page
    return projects.map((project)=>{
      // Finish the <ProjectListItem />  component. Found in /components. 
      return <Link to={`/project/`} className={styles.userLink}><ProjectListItem project={project} /></Link> // Each <ProjectListItem shows an user in the list of users this page shows.
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
    let userList = projects.slice();

    const { searchType, searchTerm } = state;
    if (searchTerm != null && searchTerm.length > 1) userList = this.searchFilter(userList, searchType, searchTerm);

    let projectListItems = this.getProjects(userList);

    const exampleData = {
      stuff: 'example stuff'
    }
  
		return (
			<div>
        <div className={styles.header}>
          <div className={styles.title}>Projects</div>
          <div className={styles.button}
              onClick={() => this.toggleModal('modalOpen')}
            >Create Project
          </div>
        </div>
        <CreateProjectModal 
          open={this.state.modalOpen}
          onClose={() => this.toggleModal('modalOpen')}
          onCreateGrant={this.onCreateGrant}
        />
        <div className={styles.search}>
          <select 
            className={styles.select} 
            value={this.state.searchType}
            onChange={(evt) => this.setState({searchType: evt.target.value})}
          >

            <option>Title</option>
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
          {projectListItems}
        </div>
			</div>
		)
;	}
}

export default ProjectListPage;