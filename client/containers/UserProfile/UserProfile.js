import React, { Component} from 'react';
import styles from './UserProfile.scss';
import cx from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from '@material-ui/icons/KeyboardArrowRight';

const profile_data = {
    first_name: 'Donagh',
    surname: 'Casey',
    job_title: 'Developer',
    prefix: 'Mr',
    suffix: 'Jr',
    phone: '0851234567',
    phone_extension: '61',
    email: 'donagh@email.com',
    orcid: 'https://orcid.org/0000-0001-2345-6789'
}


class UserProfile extends Component {
	constructor(props) {
		super(props);
    this.state = { // Have an edit mode for changing (must check if own profile)

    }
  }

  /*getProfile() {
    return Object.keys(profile_data).map((key) => (
      <li>{key.replace(/_/g, " ")}: {profile_data[key]}</li> // Also capitalize char at start (and after _?) (and acronyms?)
    ))
  }*/

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

	render() {
    const state = this.state;
    const props = this.props;

    //const profile = profile;
    //const profile = this.getProfile();
    
		return (
			<div className={styles.root}>
        <div className={styles.exampleClass}>
          Users Profile Page
        </div>

        <div>
          <h1>General Information</h1>
          <div className={styles.profileSections}>
            <div className={styles.section}>
              <li className={styles.sectionItem}>First name: {profile_data.first_name}</li>
              <li className={styles.sectionItem}>Last name: {profile_data.surname}</li>
              <li className={styles.sectionItem}>Job title: {profile_data.job_title}</li>
              <li className={styles.sectionItem}>Prefix: {profile_data.prefix}</li>
              <li className={styles.sectionItem}>Suffix: {profile_data.suffix}</li>
              <li className={styles.sectionItem}>Phone: {profile_data.phone}</li>
              <li className={styles.sectionItem}>Phone extension: {profile_data.phone_extension}</li>
              <li className={styles.sectionItem}>Email: {profile_data.email}</li>
              <li className={styles.sectionItem}>ORCID: {profile_data.orcid}</li>
            </div>
          </div>

          <h1>Research Profile Information</h1>
          <div className={styles.profileSections}>
            <div
              onClick={() => this.expandInfo('education')}
              className={styles.sectionHeader}
            >
              <div className={styles.sectionHeading}>Education</div>
              {this.expandIcon('education')}
            </div>
            <Collapse in={this.state.education} timeout="auto" unmountOnExit>
              <div className={styles.section}>
                <li className={styles.sectionItem}>Degree: </li>
                <li className={styles.sectionItem}>Field of study: </li>
                <li className={styles.sectionItem}>Institution: </li>
                <li className={styles.sectionItem}>Location: </li>
                <li className={styles.sectionItem}>Year of degree award: </li>
              </div>
            </Collapse>


            <div
              onClick={() => this.expandInfo('employment')}
              className={styles.sectionHeader}
            >
              <div className={styles.sectionHeading}>Employment</div>
              {this.expandIcon('employment')}
            </div>
            <Collapse in={this.state.employment} timeout="auto" unmountOnExit>
              <div className={styles.section}>
                <li className={styles.sectionItem}>Institution/company:</li>
                <li className={styles.sectionItem}>Location: </li>
                <li className={styles.sectionItem}>Years: </li>
              </div>
            </Collapse>

            <div
              onClick={() => this.expandInfo('societies')}
              className={styles.sectionHeader}
            >
              <div className={styles.sectionHeading}>Professional societies (membership)</div>
              {this.expandIcon('societies')}
            </div>
            <Collapse in={this.state.societies} timeout="auto" unmountOnExit>
              <div className={styles.section}>
                <li className={styles.sectionItem}>Start date: </li>
                <li className={styles.sectionItem}>End date: </li>
                <li className={styles.sectionItem}>Name of society: </li>
                <li className={styles.sectionItem}>Type of membership: </li>
                <li className={styles.sectionItem}>Status: </li>
              </div>
            </Collapse>

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