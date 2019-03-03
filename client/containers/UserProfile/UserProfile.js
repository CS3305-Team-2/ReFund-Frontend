import React, { Component} from 'react';
import axios from 'axios';
import cx from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from '@material-ui/icons/KeyboardArrowRight';
import styles from './UserProfile.scss';
import { apiUrl } from '../../config';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfileField from '../../components/ProfileField/ProfileField';



class UserProfile extends Component {
	constructor(props) {
		super(props);
    this.state = {
      editing: false,
      loaded: false,
      user: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log('url', apiUrl + `/users/${id}`);
    axios.get(apiUrl + `/users/${id}`).then(
      res => {
        console.log('fetched', res, res.data);
        let loaded = true;
        if (res.data === "") loaded = false
        this.setState({ user: res.data, loaded });
      }
    ).catch(err => console.log(err));
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
                <li className={styles.sectionItem}>ORCID: {user.orcid}</li>
            </div>
        </div>
      </>
        )
    }

    handleSubmit(event) {
    // alert('Submitted');
    }

    render() {
        const state = this.state;
        const props = this.props;
        const { user, loaded } = state;

        //let profile = {"id":1,"firstName":"John","lastName":"Joe","email":"john@ucc.ie","password":"$2a$10$bMsk0129xRwtevQt.V4SUOQxVw.0bDYmI/S2YZaQpG6Is0S4COzly","jobTitle":"Builder at Insight","title":"Mr","suffix":"Sr","phoneNumber":"123123","phoneCountryCode":"+353","orcid":"0000-0000-0000-0001","type":{"type":"researcher"},"educations":[{"educationIdentity":{"educationId":2,"userId":1},"degree":"PhD","field":"Computer Science","institution":"University College Cork","location":"Cork, Ireland","year":1998}],"employments":[{"employmentIdentity":{"employmentId":2,"userId":1},"institution":"CIT","location":"Cork","years":2008},{"employmentIdentity":{"employmentId":3,"userId":1},"institution":"NUIG","location":"Galway","years":20010},{"employmentIdentity":{"employmentId":1,"userId":1},"institution":"UCC","location":"Cork","years":2008}],"societyMemberships":[{"societyMembershipIdentity":{"societyMembershipId":1,"userId":1},"startDate":"2019-01-23 00:00:00.0","endDate":"2019-01-23 00:00:00.0","name":"Kebab","type":"Fiance","status":"Idk"},{"societyMembershipIdentity":{"societyMembershipId":2,"userId":1},"startDate":"2019-01-23 00:00:00.0","endDate":"2019-01-28 00:00:00.0","name":"Kebab man","type":"OCM","status":"Idk again"}],"awards":[{"awardsIdentity":{"awardsId":1,"userId":1},"year":2002,"awardingBody":"Yes","details":"no thank u"}]}

        if (!loaded) return <div>Loading</div>;
        console.log('user', user);

        if (!state.editing) return (
            <div className={styles.root}>
                <div className={styles.exampleClass}>
          Users Profile Page
                </div>
                <div className={styles.tabs}>
                    <button onClick={()=>this.setState({editing: true})}>
            Edit Profile
                    </button>
                </div>
                {!loaded ? <CircularProgress />:
                    this.getProfileCard(user)
                }
                <div>
                    <h1>Research Profile Information</h1>
                    <div className={styles.profileSections}>

                        <ProfileField heading="Education" data={user.educations} />
                        <ProfileField heading="Employment" data={user.employments} />
                        <ProfileField heading="Professional Societies" data={user.societyMemberships} />
                        <ProfileField heading="Awards" data={user.awards} />

                        <div
                            onClick={() => this.expandInfo('awards')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Distinctions/awards</div>
                            {this.expandIcon('awards')}
                        </div>
                        <Collapse in={this.state.awards} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Year: </li>
                                <li className={styles.sectionItem}>Awarding Body: </li>
                                <li className={styles.sectionItem}>Details: </li>
                                <li className={styles.sectionItem}>Team member name: </li>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => this.expandInfo('funding')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Funding diversification</div>
                            {this.expandIcon('funding')}
                        </div>
                        <Collapse in={this.state.funding} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Start date: </li>
                                <li className={styles.sectionItem}>End date: </li>
                                <li className={styles.sectionItem}>Amount: </li>
                                <li className={styles.sectionItem}>Funding body: </li>
                                <li className={styles.sectionItem}>Funding programme: </li>
                                <li className={styles.sectionItem}>Status: </li>
                                <li className={styles.sectionItem}>Primary attribution: </li>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => this.expandInfo('team')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Team Members</div>
                            {this.expandIcon('team')}
                        </div>
                        <Collapse in={this.state.team} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Arrival date: </li>
                                <li className={styles.sectionItem}>Departure date: </li>
                                <li className={styles.sectionItem}>Name: </li>
                                <li className={styles.sectionItem}>Position: </li>
                                <li className={styles.sectionItem}>Primary attribution: </li>
                            </div>
                        </Collapse>


                        <div
                            onClick={() => this.expandInfo('impacts')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Impacts</div>
                            {this.expandIcon('impacts')}
                        </div>
                        <Collapse in={this.state.impacts} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Impact title: </li>
                                <li className={styles.sectionItem}>Impact category: </li>
                                <li className={styles.sectionItem}>Primary beneficiary: </li>
                                <li className={styles.sectionItem}>Primary attribution: </li>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => this.expandInfo('innovation')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Innovation and Commercialisation</div>
                            {this.expandIcon('innovation')}
                        </div>
                        <Collapse in={this.state.innovation} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Year: </li>
                                <li className={styles.sectionItem}>Type: </li>
                                <li className={styles.sectionItem}>Title: </li>
                                <li className={styles.sectionItem}>Primary attribution: </li>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => this.expandInfo('publications')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Publications</div>
                            {this.expandIcon('publications')}
                        </div>
                        <Collapse in={this.state.publications} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Publication year: </li>
                                <li className={styles.sectionItem}>Publication type: </li>
                                <li className={styles.sectionItem}>Title: </li>
                                <li className={styles.sectionItem}>Journal/conference name: </li>
                                <li className={styles.sectionItem}>Publication status: </li>
                                <li className={styles.sectionItem}>DOI: </li>
                                <li className={styles.sectionItem}>Primary attribution: </li>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => this.expandInfo('presentations')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Presentations</div>
                            {this.expandIcon('presentations')}
                        </div>
                        <Collapse in={this.state.presentations} timeout="auto" unmountOnExit>
                            <div className={styles.section}>
                                <li className={styles.sectionItem}>Year: </li>
                                <li className={styles.sectionItem}>Title: </li>
                                <li className={styles.sectionItem}>Event type: </li>
                                <li className={styles.sectionItem}>Organising body: </li>
                                <li className={styles.sectionItem}>Location: </li>
                                <li className={styles.sectionItem}>Primary attribution: </li>
                            </div>
                        </Collapse>

                        <div
                            onClick={() => this.expandInfo('academicCollabs')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Academic collaborations</div>
                            {this.expandIcon('academicCollabs')}
                        </div>
                        <Collapse in={this.state.academicCollabs} timeout="auto" unmountOnExit>
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

                        <div
                            onClick={() => this.expandInfo('nonAcademicCollabs')}
                            className={styles.sectionHeader}
                        >
                            <div className={styles.sectionHeading}>Non-Academic collaborations</div>
                            {this.expandIcon('nonAcademicCollabs')}
                        </div>
                        <Collapse in={this.state.nonAcademicCollabs} timeout="auto" unmountOnExit>
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
            

                        <div
                            onClick={() => this.expandInfo('conferences')}
                            className={styles.sectionHeader}
                        >
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

                        <div
                            onClick={() => this.expandInfo('comms')}
                            className={styles.sectionHeader}
                        >
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
                            <div
                                onClick={() => this.expandInfo('fundingratio')}
                                className={styles.sectionHeader}
                            >
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

                    {/* What's this?
            <li>Education and public
              <ul>
                <li>Name of project: </li>
                <li>Start date: </li>
                <li>End date: </li>
                <li>Activity type: </li>
                <li>Project type: </li>P
                <li>Target geograpical area: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>*/}

                </div>
        
            </div>
        )
        else return (
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
                        <div className={styles.section}>
                            <p>Year: <input type="text" name="awards_year"></input></p>
                            <p>Awarding Body: <input type="text" name="awards_awardingBody"></input></p>
                            <p>Details: <input type="text" name="awards_details"></input></p>
                            <p>Team member name: <input type="text" name="awards_teamMemberName"></input></p>
                        </div>
            
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
                            <p>Location: <input type="text" name="nonAcademicCollabs_location"></input>></p>
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