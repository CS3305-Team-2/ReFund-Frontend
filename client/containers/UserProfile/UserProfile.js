import React, { Component} from 'react';
import axios from 'axios';
import cx from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from '@material-ui/icons/KeyboardArrowRight';
import styles from './UserProfile.scss';
import { apiUrl } from '../../config';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfileField from '../../components/ProfileField/ProfileField';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
	constructor(props) {
		super(props);
        this.state = {
            editing: false,
            loaded: false,
            user: null,
            projects: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.profilePage = this.profilePage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log('url', apiUrl + `/users/${id}`);
        axios.get(apiUrl + `/users/${id}`)
            .then(res => {
                console.log('fetched', res, res.data.data);
                let loaded = true;
                if (res.data === "") loaded = false
                this.setState({ user: res.data, loaded });
            })
            .catch(console.log);

        axios.get(apiUrl + `/project/associatedTo/${id}`)
            .then(res => {
                console.log('fetched', res, res.data);
                this.setState({projects: res.data})
            })
            .catch(console.log)
    }

    expandInfo(section) {
        this.setState(prevState => ({[section]: !prevState[section]}))
    }
  
    expandIcon(section) {
        const arrowStyle = {
            fontSize:'24px', 
            cursor:'pointer',
            color: '#00A79A',
            transition: 'transform 0.3s'
        }
        if (this.state[section]) arrowStyle.transform = 'rotate(90deg)';
        return <ExpandIcon style={arrowStyle} />;
    }

    getProfileCard(user) {
        return (
            <>
                <h1>General Information</h1>
                <div className={styles.profileSections}>
                    <div className={styles.section}>
                        <li className={styles.sectionItem}>First name: {user.firstName}</li>
                        <li className={styles.sectionItem}>Last name: {user.lastName}</li>
                        <li className={styles.sectionItem}>Job title: {user.jobTitle}</li>
                        <li className={styles.sectionItem}>title: {user.title}</li>
                        <li className={styles.sectionItem}>Suffix: {user.suffix}</li>
                        <li className={styles.sectionItem}>Phone: {user.phoneNumber}</li>
                        <li className={styles.sectionItem}>Email: {user.email}</li>
                        {user.type.type === "researcher" && 
                            <li className={styles.sectionItem}>ORCID: {user.orcid}</li>
                        }
                    </div>
                </div>
            </>
        )
    }

    getProjects(projects) {
        let stuff = []
        for(var i = 0; i < projects.length; i++) {
            stuff.push(
                <div className={styles.profileSections} style={{padding: '2em'}}>
                    <Link to={`/projects/${projects[i].id}`} key={i} >
                        <div className={styles.sectionHeading} style={{marginBottom: '1.3em'}}>{projects[i].name}</div>
                        <div>
                            {projects[i].description.split('\n').map(val => {
                                return (
                                    <>
                                        {val}
                                        <br/>
                                    </>
                                )
                            }
                        )}</div>
                    </Link>
                </div>
            )
        }
        return stuff
    }

    handleSubmit(event) {
    // alert('Submitted');
    }

    addNewEntry(index, name) {
        /*this.state.entries[0] += 1;
        console.log(this.state.entries);
        */
        var node = document.createElement("div");
        var elt = document.createTextNode(`${this.createElement(index)}`);
        node.appendChild(elt);
        document.getElementById(name).appendChild(node);
    }

    createElement(index) {
        if (index === 0) {
            return (
                <div className={styles.section}>
                    <p>Year: <input type="text" name="awards_year"></input></p>
                    <p>Awarding Body: <input type="text" name="awards_awardingBody"></input></p>
                    <p>Details: <input type="text" name="awards_details"></input></p>
                    <p>Team member name: <input type="text" name="awards_teamMemberName"></input></p>
                </div>
            );
            //return ("<div className={styles.section}><p>Year: <input type=\"text\" name=\"awards_year\"></input></p><p>Awarding Body: <input type=\"text\" name=\"awards_awardingBody\"></input></p><p>Details: <input type=\"text\" name=\"awards_details\"></input></p><p>Team member name: <input type=\"text\" name=\"awards_teamMemberName\"></input></p></div>");
        }
    }

    render() {
        const state = this.state;
        const props = this.props;
        const { user, loaded, projects } = state;

        if (!loaded) return <div>Loading</div>;
        console.log('user', user);

        if (!state.editing) {
            return this.profilePage(loaded, user, projects);
        } else {
            return this.editingPage();
        }
    }

    profilePage(loaded, user, projects) {
        let isUser = JSON.parse(localStorage.getItem("user")).id == this.props.match.params.id;
        return (
            <div className={styles.root}>
                {!loaded ? <CircularProgress />: (
                    <>
                        <div className={styles.exampleClass}>
                            {user.firstName} {user.lastName}'s Profile Page
                        </div>
                        { !isUser ? <></> : (
                                <div className={styles.tabs}>
                                    <button onClick={()=>this.setState({editing: true})}>
                                    Edit Profile
                                    </button>
                                </div>
                            )
                        }
                        <div id={styles.profileWrapper}>
                            <div id={styles.profileLeft}>
                                <div>
                                    { this.getProfileCard(user) }
                                </div>
                                <div>
                                    <h1>Research Profile Information</h1>
                                    <div className={styles.profileSections}>
                                        <ProfileField heading="Education" data={user.educations} />
                                        <ProfileField heading="Employment" data={user.employments} />
                                        <ProfileField heading="Professional Societies" data={user.societyMemberships} />
                                        <ProfileField heading="Awards" data={user.awards} />
                                        <ProfileField heading="Impacts" data={user.impact} />
                                        <ProfileField heading="Innovations" data={user.innovation} />
                                        <ProfileField heading="Presentations" data={user.presentation} />
                                        <ProfileField heading="Academic Collaborations" data={user.academicCollaborations} />
                                        <ProfileField heading="Non-Academic Collaborations" data={user.nonAcademicCollaborations} />

                                        <div onClick={() => this.expandInfo('conferences')} className={styles.sectionHeader}>
                                            <div className={styles.sectionHeading}>Conferences/workshops/seminars organised</div>
                                            {this.expandIcon('conferences')}
                                        </div>
                                        <Collapse in={this.state.conferences} timeout="auto" unmountOnExit>
                                            <div className={styles.section}>
                                                <li className={styles.sectionItem}>Start date: </li>
                                                <li className={styles.sectionItem}>End date: </li>
                                                <li className={styles.sectionItem}>Name of institution: </li>
                                                <li className={styles.sectionItem}>Department within institution: </li>
                                                <li className={styles.sectionItem}>Location: </li>
                                                <li className={styles.sectionItem}>Name of collaborator: </li>
                                                <li className={styles.sectionItem}>Primary goal of collaboration: </li>
                                                <li className={styles.sectionItem}>Frequency of interaction: </li>
                                                <li className={styles.sectionItem}>Primary attribution: </li>
                                            </div>
                                        </Collapse>

                                        <div onClick={() => this.expandInfo('comms')} className={styles.sectionHeader}>
                                            <div className={styles.sectionHeading}>Communications overview</div>
                                            {this.expandIcon('comms')}
                                        </div>
                                        <Collapse in={this.state.comms} timeout="auto" unmountOnExit>
                                            <div className={styles.section}>
                                                <li className={styles.sectionItem}>Year: </li>
                                                <li className={styles.sectionItem}>Number of public lectures/demonstrations: </li>
                                                <li className={styles.sectionItem}>Number of visits: </li>
                                                <li className={styles.sectionItem}>Number of media interactions: </li>
                                            </div>
                                        </Collapse>

                                        <section>
                                            <div onClick={() => this.expandInfo('fundingratio')} className={styles.sectionHeader}>
                                                <div className={styles.sectionHeading}>SFI funding ratio</div>
                                                {this.expandIcon('fundingratio')}
                                            </div>
                                            <Collapse in={this.state.fundingratio} timeout="auto" unmountOnExit>
                                                <div className={styles.section}>
                                                    <li className={styles.sectionItem}>Year: </li>
                                                    <li className={styles.sectionItem}>Percentage of annual spend from SFI: </li>
                                                </div>
                                            </Collapse>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div id={styles.profileRight}>
                                <h1>Projects</h1>
                                { this.getProjects(projects) }
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    editingPage() {
        return (
            <div className={styles.root}>
                <div className={styles.exampleClass}>
                Users Profile Page
                </div>
                <div className={styles.tabs}>
                    <button onClick={()=>this.setState({editing: false})}>
                    Profile
                    </button>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>





                        <div className={styles.sectionHeading}>Distinctions/Awards</div>
                        <div id="sec_awards">
                            <div className={styles.section}>
                                <p>Year: <input type="text" name="awards_year"></input></p>
                                <p>Awarding Body: <input type="text" name="awards_awardingBody"></input></p>
                                <p>Details: <input type="text" name="awards_details"></input></p>
                                <p>Team member name: <input type="text" name="awards_teamMemberName"></input></p>
                            </div>
                        </div>
                        <input type="button" name="btn_awards" value="Add new 'Distinctions/Awards' entry" onClick={()=>this.addNewEntry(0, "sec_awards")}></input>
                        







                        <div className={styles.sectionHeading}>Funding Diversification</div>
                        <div className={styles.section}>
                            <p>Start date: <input type="date" name="funding_startDate"></input></p>
                            <p>End date: <input type="date" name="funding_endDate"></input></p>
                            <p>Amount: <input type="text" name="funding_amount"></input></p>
                            <p>Funding body: <input type="text" name="funding_fundingBody"></input></p>
                            <p>Funding programme: <input type="text" name="funding_fundingProgramme"></input></p>
                            <p>Status: <input type="text" name="funding_status"></input></p>
                            <p>Primary attribution: <input type="text" name="funding_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Team Members</div>
                        <div className={styles.section}>
                            <p>Arrival date: <input type="date" name="team_arrivalDate"></input></p>
                            <p>Departure date: <input type="date" name="team_departureDate"></input></p>
                            <p>Name: <input type="text" name="team_name"></input></p>
                            <p>Position: <input type="text" name="team_position"></input></p>
                            <p>Primary attribution: <input type="text" name="team_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Impacts</div>
                        <div className={styles.section}>
                            <p>Impact title: <input type="text" name="impacts_title"></input></p>
                            <p>Impact category: <input type="text" name="impacts_category"></input></p>
                            <p>Primary beneficiary: <input type="text" name="impacts_primaryBeneficiary"></input></p>
                            <p>Primary attribution: <input type="text" name="impacts_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Innovation and Commercialisation</div>
                        <div className={styles.section}>
                            <p>Year: <input type="text" name="innovation_year"></input></p>
                            <p>Type: <input type="text" name="innovation_type"></input></p>
                            <p>Title: <input type="text" name="innovation_title"></input></p>
                            <p>Primary attribution: <input type="text" name="innovation_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Publications</div>
                        <div className={styles.section}>
                            <p>Publication year: <input type="text" name="publications_year"></input></p>
                            <p>Publication type: <input type="text" name="publications_type"></input></p>
                            <p>Title: <input type="text" name="publications_title"></input></p>
                            <p>Journal/conference name: <input type="text" name="publications_journalName"></input></p>
                            <p>Publication status: <input type="text" name="publications_status"></input></p>
                            <p>DOI: <input type="text" name="publications_doi"></input></p>
                            <p>Primary attribution: <input type="text" name="publications_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Presentations</div>
                        <div className={styles.section}>
                            <p>Year: <input type="text" name="presentations_year"></input></p>
                            <p>Title: <input type="text" name="presentations_title"></input></p>
                            <p>Event type: <input type="text" name="presentations_type"></input></p>
                            <p>Organising body: <input type="text" name="presentations_organisingBody"></input></p>
                            <p>Location: <input type="text" name="presentations_location"></input></p>
                            <p>Primary attribution: <input type="text" name="presentations_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Academic collaborations</div>
                        <div className={styles.section}>
                            <p>Start date: <input type="date" name="academicCollabs_startDate"></input></p>
                            <p>End date: <input type="date" name="academicCollabs_endDate"></input></p>
                            <p>Name of institution: <input type="text" name="academicCollabs_institutionName"></input></p>
                            <p>Department within institution: <input type="text" name="academicCollabs_institutionDepartment"></input></p>
                            <p>Location: <input type="text" name="academicCollabs_location"></input></p>
                            <p>Name of collaborator: <input type="text" name="academicCollabs_collaboratorName"></input></p>
                            <p>Primary goal of collaboration: <input type="text" name="academicCollabs_primaryCollaborationGoal"></input></p>
                            <p>Frequency of interaction: <input type="text" name="academicCollabs_interactionFrequency"></input></p>
                            <p>Primary attribution: <input type="text" name="academicCollabs_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Non-Academic collaborations</div>
                        <div className={styles.section}>
                            <p>Start date: <input type="date" name="nonAcademicCollabs_startDate"></input></p>
                            <p>End date: <input type="date" name="nonAcademicCollabs_endDate"></input></p>
                            <p>Name of institution: <input type="text" name="nonAcademicCollabs_institutionName"></input></p>
                            <p>Department within institution: <input type="text" name="nonAcademicCollabs_institutionDepartment"></input></p>
                            <p>Location: <input type="text" name="nonAcademicCollabs_location"></input></p>
                            <p>Name of collaborator: <input type="text" name="nonAcademicCollabs_collaboratorName"></input></p>
                            <p>Primary goal of collaboration: <input type="text" name="nonAcademicCollabs_primaryCollaborationGoal"></input></p>
                            <p>Frequency of interaction: <input type="text" name="nonAcademicCollabs_interactionFrequency"></input></p>
                            <p>Primary attribution: <input type="text" name="nonAcademicCollabs_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Conferences/workshops/seminars organised</div>
                        <div className={styles.section}>
                            <p>Start date: <input type="date" name="conferences_startDate"></input></p>
                            <p>End date: <input type="date" name="conferences_endDate"></input></p>
                            <p>Name of institution: <input type="text" name="conferences_institutionName"></input></p>
                            <p>Department within institution: <input type="text" name="conferences_institutionDepartment"></input></p>
                            <p>Location: <input type="text" name="conferences_location"></input></p>
                            <p>Name of collaborator: <input type="text" name="conferences_collaboratorName"></input></p>
                            <p>Primary goal of collaboration: <input type="text" name="conferences_primaryCollaborationGoal"></input></p>
                            <p>Frequency of interaction: <input type="text" name="conferences_interactionFrequency"></input></p>
                            <p>Primary attribution: <input type="text" name="conferences_primaryAttribution"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>Communications overview</div>
                        <div className={styles.section}>
                            <p>Year: <input type="text" name="comms_year"></input></p>
                            <p>Number of public lectures/demonstrations: <input type="text" name="comms_numberOfPublicLectures"></input></p>
                            <p>Number of visits: <input type="text" name="comms_numberOfVisits"></input></p>
                            <p>Number of media interactions: <input type="text" name="comms_numberOfMediaInteractions"></input></p>
                        </div>

                        <div className={styles.sectionHeading}>SFI funding ratio</div>
                        <div className={styles.section}>
                            <p>Year: <input type="text" name="fundingratio_year"></input></p>
                            <p>Percentage of annual spend from SFI: <input type="text" name="fundingratio_annualSpendPercentage"></input></p>
                        </div>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default UserProfile;