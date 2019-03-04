import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import axios from 'axios';
import { apiUrl } from '../../config';
import styles from './ProjectListPage.scss';
import ProjectListItem from '../../components/ProjectListItem/ProjectListItem';
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal';
import getCurrentUser from '../../utils/getCurrentUser';

class ProjectListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      searchVal: '',
      searchType: 'Title',
      searchTerm: null,
      projects: []
    }

    this.search = this.search.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.onCreateProject = this.onCreateProject.bind(this);
  }

  componentDidMount() {
    this.fetchProjects();
    // this.toggleModal('modalOpen');
  }

  fetchProjects() {
    axios.get(apiUrl + '/project/associatedTo/1').then(
      res => {
        console.log('projects', res.data);
        this.setState({ projects: res.data });
      }
    );
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
    return projects.map((project)=>{
      return <Link to={`/project/${project.id}`} className={styles.userLink}><ProjectListItem project={project} /></Link> // Each <ProjectListItem shows an user in the list of users this page shows.
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
      if (user[type].toLowerCase().includes(term)) results.push(user);
    });

    return results;
  }

  onCreateProject() {
    console.log('onCREATE', this);
    this.fetchProjects();
    this.toggleModal('modalOpen');
  }

	render() {
    const state = this.state;
    const activeTab = styles.activeTab;
    let projectList = this.state.projects.slice();

    const { searchType, searchTerm } = state;
    if (searchTerm != null && searchTerm.length > 1) projectList = this.searchFilter(projectList, searchType, searchTerm);

    let projectListItems = this.getProjects(projectList);

    const currentUser = getCurrentUser().user;

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
          currentUser={currentUser}
          onCreateProject={this.onCreateProject}
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
        );	
    }
}

export default ProjectListPage;