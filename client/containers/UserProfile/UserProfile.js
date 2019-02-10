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
    this.state = { // Have an edit mode for changing (must check if own profile)
      loaded: false
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(apiUrl + `/users/${id}`).then(
      res => {
        console.log(res.data);
        this.setState({ user: res.data, loaded: true });
      }
    );
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

	render() {
    const state = this.state;
    const props = this.props;
    const { user, loaded } = state;


    if (!loaded) return <div>Loading</div>;
    
		return (
			<div className={styles.root}>
        <div className={styles.exampleClass}>
          Users Profile Page
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
;	}
}

export default UserProfile;