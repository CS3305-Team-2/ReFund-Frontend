import React, { Component} from 'react';
import styles from './UserProfile.scss';
import cx from 'classnames';

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
  
	render() {
    const state = this.state;
    const props = this.props;

    //const profile = profile;
    //const profile = this.getProfile();
    
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
          Users Profile Page
        </div>

        <div>
          {/* Add in data like so. e.g for a user: add in their name with {user.name} into a div */}
          {/*profile*/}
          
          <h1>General Information</h1>
          <ul>
            <li>First name: {profile_data.first_name}</li>
            <li>Last name: {profile_data.surname}</li>
            <li>Job title: {profile_data.job_title}</li>
            <li>Prefix: {profile_data.prefix}</li>
            <li>Suffix: {profile_data.suffix}</li>
            <li>Phone: {profile_data.phone}</li>
            <li>Phone extension: {profile_data.phone_extension}</li>
            <li>Email: {profile_data.email}</li>
            <li>ORCID: {profile_data.orcid}</li>
          </ul>

          <h1>Research Profile Information</h1>
          <ul>
            <li>Education information
              <ul>
                <li>Degree: </li>
                <li>Field of study: </li>
                <li>Institution: </li>
                <li>Location: </li>
                <li>Year of degree award: </li>
              </ul>
            </li>
            <li>Employment
              <ul>
                <li>Institution/company: </li>
                <li>Location: </li>
                <li>Years: </li>
              </ul>
            </li>
            <li>Professional societies (membership)
              <ul>
                <li>Start date: </li>
                <li>End date: </li>
                <li>Name of society: </li>
                <li>Type of membership: </li>
                <li>Status: </li>
              </ul>
            </li>
            <li>Distinctions/awards
              <ul>
                <li>Year: </li>
                <li>Awarding body: </li>
                <li>Details: </li>
                <li>Team member name: </li>
              </ul>
            </li>
            <li>Funding diversification
              <ul>
                <li>Start date: </li>
                <li>End date: </li>
                <li>Amount: </li>
                <li>Funding body: </li>
                <li>Funding programme: </li>
                <li>Status: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Team members
              <ul>
                <li>Arrival date: </li>
                <li>Departure date: </li>
                <li>Name: </li>
                <li>Position: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Impacts
              <ul>
                <li>Impact title: </li>
                <li>Impact category: </li>
                <li>Primary beneficiary: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Innovation and Commercialisation
              <ul>
                <li>Year: </li>
                <li>Type: </li>
                <li>Title: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Publications
              <ul>
                <li>Publication year: </li>
                <li>Publication type: </li>
                <li>Title: </li>
                <li>Journal/conference name: </li>
                <li>Publication status: </li>
                <li>DOI: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Presentations
              <ul>
                <li>Year: </li>
                <li>Title: </li>
                <li>Event type: </li>
                <li>Organising body: </li>
                <li>Location: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Academic collaborations
              <ul>
                <li>Start date: </li>
                <li>End date: </li>
                <li>Name of institution: </li>
                <li>Department within institution: </li>
                <li>Location: </li>
                <li>Name of collaborator: </li>
                <li>Primary goal of collaboration: </li>
                <li>Frequency of interaction: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Non-academic collaborations
              <ul>
                <li>Start date: </li>
                <li>End date: </li>
                <li>Name of institution: </li>
                <li>Department within institution: </li>
                <li>Location: </li>
                <li>Name of collaborator: </li>
                <li>Primary goal of collaboration: </li>
                <li>Frequency of interaction: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Conferences/workshops/seminars organised
              <ul>
                <li>Start date: </li>
                <li>End date: </li>
                <li>Title: </li>
                <li>Event type: </li>
                <li>Role: </li>
                <li>Location: </li>
                <li>Primary attribution: </li>
              </ul>
            </li>
            <li>Communications overview
              <ul>
                <li>Year: </li>
                <li>Number of public lectures/demonstrations: </li>
                <li>Number of visits: </li>
                <li>Number of media interactions: </li>
              </ul>
            </li>
            <li>SFI funding ratio
              <ul>
                <li>Year: </li>
                <li>Percentafe of annual spend from SFI: </li>
              </ul>
            </li>
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
            </li>
          </ul>

        </div>
			</div>
		)
;	}
}

export default UserProfile;