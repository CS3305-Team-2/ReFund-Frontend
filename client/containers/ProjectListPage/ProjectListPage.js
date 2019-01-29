import React, { Component} from 'react';
import styles from './ProjectListPage.scss';
import cx from 'classnames';

// Create mock data to use
const projects = [
  {
    projectName: 'Project Name',
    // Etc add all the fields
  }
]

class ProjectListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
    }
  }
  
  getProjects() {
    // This will return a list of ProjectListItem components for each 'project' in the list at the top

    // projects is the project list at the top of this page
    return projects.map((project)=>{
      // Finish the <ProjectListItem />  component. Found in /components. 
      // return <ProjectListItem project={project} /> // Each <ProjectListItem shows an user in the list of users this page shows.
    });
  }
	
	render() {
    const state = this.state;
    const activeTab = styles.activeTab;

    const projectListItems = this.getProjects();

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
          Project List Page
        </div>

        <div>
          {/* Add in data like so. e.g for a user: add in their name with {user.name} into a div */}
          {exampleData.stuff} 
        </div>
			</div>
		)
;	}
}

export default ProjectListPage;