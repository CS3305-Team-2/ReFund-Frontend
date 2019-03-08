import React, { Component} from 'react';
import styles from './HostInstitutionListPage.scss';
import cx from 'classnames';
import HostInstitutionListItem from '../../components/HostInstitutionListItem/HostInstitutionListItem';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { apiUrl } from '../../config';

class HostInstitutionListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            searchType: 'Name',
            searchTerm: null,
            hosts: [],
        }
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        axios.get(`${apiUrl}/hostInstitution/`).then(res => {
            this.setState({hosts: res.data})
        })
    }
  
    getHostInstitutions(hostInstitutions) {
        return hostInstitutions.map(hostInstitution => {
            return <Link to={`/hostInstitution/${hostInstitution.id}`} className={styles.userLink}><HostInstitutionListItem project={hostInstitution} /></Link> 
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
            console.log(type, user[type], term);
            if (user[type].toLowerCase().includes(term)) results.push(user);
        });

        return results;
    }
	
    render() {
        const state = this.state;
        const activeTab = styles.activeTab;
        let hostInstitutions = this.state.hosts.slice();

        const { searchType, searchTerm } = state;
        if (searchTerm != null && searchTerm.length > 1) hostInstitutions = this.searchFilter(hostInstitutions, searchType, searchTerm);
    
        let hostInstitutionListItems = this.getHostInstitutions(hostInstitutions);
  
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.title}>Host Institutions</div>
                    <div className={styles.desc}></div>
                </div>

                <div className={styles.search} style={{marginBottom: '5em'}}>
                    <select 
                        className={styles.select} 
                        value={this.state.searchType}
                        onChange={(evt) => this.setState({searchType: evt.target.value})}
                    >

                        <option>Name</option>
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
                    {hostInstitutionListItems}
                </div>
            </div>
        );	
    }
}

export default HostInstitutionListPage;