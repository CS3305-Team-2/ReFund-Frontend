import React, { Component} from 'react';
import styles from './ResearchCenterListPage.scss';
import cx from 'classnames';
import ResearchCenterListItem from '../../components/ResearchCenterListItem/ResearchCenterListItem';
import { Link } from 'react-router-dom';

// Create mock data to use
const researchCenters = [
  {
    title: 'University college Cork',
    location: 'Cork'
    // Etc add all the fields
  },  
  {
    title: 'UCD',
    location: 'Dublin'
    // Etc add all the fields
  },
  {
    title: 'NUIG',
    location: 'Galway'
    // Etc add all the fields
  },
  {
    title: 'Cork institute of technology',
    location: 'Cork'
    // Etc add all the fields
  },
  {
    title: 'Queens university',
    location: 'Belfast'
    // Etc add all the fields
  }
]

class ResearchCenterListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      searchVal: '',
      searchType: 'Title',
      searchTerm: null,
    }

    this.search = this.search.bind(this);
  }
  
  getResearchCenters(researchCenters) {
    // This will return a list of ResearchCenterListItem components for each 'research center'' in the list at the top

    // projects is the project list at the top of this page
    return researchCenters.map((researchCenter)=>{
      // Finish the <ResearchCenterListItem />  component. Found in /components. 
      return <Link to={`/researchCenter/`} className={styles.userLink}><ResearchCenterListItem project={researchCenter} /></Link> // Each <ProjectListItem shows an user in the list of users this page shows.
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
    let userList = researchCenters.slice();

    const { searchType, searchTerm } = state;
    if (searchTerm != null && searchTerm.length > 1) userList = this.searchFilter(userList, searchType, searchTerm);
    
    let ResearchCenterListItems = this.getResearchCenters(userList);

    const exampleData = {
      stuff: 'example stuff'
    }
  
		return (
			<div>
        <div className={styles.header}>
          <div className={styles.title}>Research Centers</div>
          <div className={styles.desc}></div>
        </div>

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
          {ResearchCenterListItems}
        </div>
			</div>
		)
;	}
}

export default ResearchCenterListPage;