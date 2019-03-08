import React, { Component} from 'react';
import styles from './HostInstitutionPage.scss';
import cx from 'classnames';
import HostInstitutionItem from '../../components/HostInstitutionStaff/HostInstitutionStaff';
import { func } from 'prop-types';
import axios from 'axios';
import { apiUrl } from '../../config';
import { Link } from 'react-router-dom';

class HostInstitution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffState: 0,
            projectState: 0,
            projects: [],
            hostLoaded: false,
            host: null,
        }
    }

    getProjectItems(projects){
        return projects.map((project)=>{
            return (
                <Link to={`/project/${project.id}`}>
                    <HostInstitutionItem project={project}/>
                </Link>
            )
        });
    }
    
    componentDidMount() {
        axios.get(`${apiUrl}/hostInstitution/${this.props.match.params.id}/projects`).then(res => {
            this.setState({projects: res.data})
        })
        axios.get(`${apiUrl}/hostInstitution/${this.props.match.params.id}`).then(res => {
            this.setState({host: res.data, hostLoaded: true})
        })
    }

    render() {
        const state = this.state;
        const props = this.props;

        let projectItems = this.getProjectItems(this.state.projects);
		
        return (
            <>
            { !this.state.hostLoaded ? <>Loading</> : (
                <div>
                <div className={styles.title}>
                    {this.state.host.name}
                </div>
                <div className={styles.cols}>
                    <div className={styles.Main}>
                        <div className={styles.mainCol}>
                            <h1>Description</h1>
                            {this.state.host.description}
                            <div style={{display: 'flex', textAlign: 'center'}}>
                                <div className={styles.projects} style={{margin: '0 auto'}}>
                                    <div className={styles.header}>
                                        <h1>Projects</h1>
                                    </div>
                                    {projectItems}
                                </div>
                            </div>
                        </div>
			    </div>
                    <div>
                        <h1>Number</h1>
                        {this.state.host.telephone}
                        <h1>Address</h1>
                        <li>{this.state.host.address1}</li>
                        <li>{this.state.host.address2}</li>
                        <li>{this.state.host.address3}</li>
                        <h1>Email</h1>
                        {this.state.host.email}
                    </div>
                </div>
            </div>
            ) }
            </>
        );	
    }
}

export default HostInstitution;