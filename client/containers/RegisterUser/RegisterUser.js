import React, { Component} from 'react';
import styles from './RegisterUser.scss';
import { apiUrl } from '../../config';

class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Submitted');
  }

  render() {
    return (
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
    );

  }

}

export default RegisterUser;