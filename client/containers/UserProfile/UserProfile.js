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
import {displayFriendlyUnderscore} from '../../utils/displayFriendly';
import getCurrentUser from '../../utils/getCurrentUser';


class UserProfile extends Component {
	constructor(props) {
        super(props);
        let user = getCurrentUser().user;
        this.state = {
            editing: false,
            loaded: false,
            user: null,
            projects: [],
            awards: user.awards,
            fundings: [],
            impacts: user.impact,
            innovations: user.innovation,
            publications: user.publication,
            presentations: user.presentation,
            academics: user.academicCollaborations,
            nonAcademics: user.nonAcademicCollaborations,
            /* conferences: user., */
            communications: user.communicationOverview,
            fundingRatio: user.sfiFundingRatio,
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
                <div className={styles.profileSections}>
                    <Link to={`/project/${projects[i].id}`} key={i} >
                        <div className={styles.section}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className={styles.projectHeading} style={{marginBottom: '0.7em'}}>{projects[i].name}</div>
                            <div style={{fontWeight: '500', color: '#031b4e'}}>Status: {projects[i].status}</div>
                        </div>
                        <div className={styles.detail}>
                        <span className={styles.label}>Budget: </span>
                          &euro;{projects[i].budget}
                        </div>
                        <div>
                            {projects[i].description.split('\n').map(val => {
                                return (
                                    <>
                                        {val}
                                        <br/>
                                    </>
                                )
                            }
                        )}</div></div>
                    </Link>
                </div>
            )
        }
        return stuff
    }

    handleSubmit(event) {
        let user = JSON.parse(JSON.stringify(this.state.user))
        user.awards = this.state.awards;
        user.impact = this.state.impacts;
        user.innovation = this.state.innovations;
        user.publication = this.state.publications;
        user.presentation = this.state.presentations;
        user.academicCollaborations = this.state.academics;
        user.nonAcademicCollaborations = this.state.nonAcademics;
        user.communicationOverview = this.state.communications;
        user.sfiFundingRatio = this.state.fundingRatio;
        console.log(JSON.stringify(user, null, 2))
    }

    render() {
        const state = this.state;
        const props = this.props;
        const { user, loaded, projects } = state;

        if (!loaded) return <div>Loading</div>;

        if (!state.editing) {
            return this.profilePage(loaded, user, projects);
        } else {
            return this.editingPage();
        }
    }

    profilePage(loaded, user, projects) {
        let isUser = getCurrentUser().user.id == this.props.match.params.id;
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
        let awards = []
        const updateState = (evt, item, field, int) => {
            let x = this.state[item]
            x[evt.target.getAttribute('data-key')][field] = int ? parseInt(evt.target.value) : evt.target.value
            if (x[evt.target.getAttribute('data-key')]['userId'] == undefined) x[evt.target.getAttribute('data-key')]['userId'] = this.state.user.id;
            this.setState({item: x})
        }

        this.state.awards.forEach((award, i) => {
            awards.push(<>
                <div className={styles.inputLabel}>Year:</div>
                <input type="text" data-key={i} value={this.state.awards[i].year} onChange={(evt) => updateState(evt, 'awards', 'year', true)}></input>
                <div className={styles.inputLabel}>Awarding Body:</div>
                <input type="text" data-key={i} value={this.state.awards[i].awardingBody} onChange={(evt) => updateState(evt, 'awards', 'awardingBody')}></input>
                <div className={styles.inputLabel}>Details:</div>                
                <input type="text" data-key={i} value={this.state.awards[i].details} onChange={(evt) => updateState(evt, 'awards', 'details')}></input>
            </>)
        })
        
        let impacts = []
        this.state.impacts.forEach((impact, i) => {
            impacts.push(<>
                <div className={styles.inputLabel}>Impact title: </div>
                <input type="text" data-key={i} value={this.state.impacts[i].title} onChange={(evt) => updateState(evt, 'impacts', 'title')}></input>
                <div className={styles.inputLabel}>Impact category: </div>
                <input type="text" data-key={i} value={this.state.impacts[i].category} onChange={(evt) => updateState(evt, 'impacts', 'category')}></input>
                <div className={styles.inputLabel}>Primary beneficiary: </div>
                <input type="text" value={this.state.impacts[i].primaryBeneficiary} onChange={(evt) => updateState(evt, 'impacts', 'primaryBeneficiary')}></input>
                <div className={styles.inputLabel}>Primary attribution: </div>
                <input type="text" value={this.state.impacts[i].primaryAttribution} onChange={(evt) => updateState(evt, 'impacts', 'primaryAttribution')}></input>
            </>)
        })

        let innovations = []
        this.state.innovations.forEach((innovation, i) => {
            innovations.push(<>
                <div className={styles.inputLabel}>Year:</div>
                <input type="text" data-key={i} value={this.state.innovations[i].year} onChange={(evt) => updateState(evt, 'innovations', 'year', true)}></input>
                <div className={styles.inputLabel}>Type: </div>
                <input type="text" data-key={i} value={this.state.innovations[i].type} onChange={(evt) => updateState(evt, 'innovations', 'type')}></input>
                <div className={styles.inputLabel}>Title: </div>
                <input type="text" data-key={i} value={this.state.innovations[i].title} onChange={(evt) => updateState(evt, 'innovations', 'title')}></input>
                <div className={styles.inputLabel}>Primary attribution: </div> 
                <input type="text" data-key={i} value={this.state.innovations[i].primaryAttribution} onChange={(evt) => updateState(evt, 'innovations', 'primaryAttribution')}></input>
            </>)
        })

        let publications = []
        this.state.publications.forEach((pub, i) => {
            publications.push(<>
                <div className={styles.inputLabel}>Publication type: </div>    
                <select data-key={i} onChange={(evt) => updateState(evt, 'publications', 'type')} value={this.state.publications[i].type}>
                    <option value="REFEREED_ORIGINAL_ARTICLE">Refereed Original Article</option>
                    <option value="REFEREED_REVIEW_ARTICLE">Refereed Review Article</option>
                    <option value="REFEREED_CONFERENCE_ARTICLE">Refereed Conference Article</option>
                    <option value="BOOK">Book</option>
                    <option value="TECHNICAL_REPORT">Technical Report</option>
                </select>
                <div className={styles.inputLabel}>Title:</div>
                <input type="text" data-key={i} value={this.state.publications[i].title} onChange={(evt) => updateState(evt, 'publications', 'title')}></input>
                <div className={styles.inputLabel}>Journal/conference name: </div>
                <input type="text" data-key={i} value={this.state.publications[i].journalName} onChange={(evt) => updateState(evt, 'publications', 'journalName')}></input>
                <div className={styles.inputLabel}>Publication status:</div>
                <select data-key={i} onChange={(evt) => updateState(evt, 'publications', 'status')} value={this.state.publications[i].status}>
                    <option value="PUBLISHED">Published</option>
                    <option value="IN_PRESS">In Press</option>
                </select>
                {/* <p>DOI: 
                    <input type="text" data-key={i} value={this.state.publications[i].year} onChange={(evt) => updateState(evt, 'publications', 'year')}></input>
                </p> */}
                <div className={styles.inputLabel}>Primary attribution: </div>
                <input type="text" data-key={i} value={this.state.publications[i].primaryAttribution}></input>
            </>)
        })

        let presentations = []
        this.state.presentations.forEach((pres, i) => {
            presentations.push(<>
                <div className={styles.inputLabel}>Year: </div>
                <input type="text" data-key={i} value={this.state.presentations[i].year} onChange={(evt) => updateState(evt, 'presentations', 'year', true)}></input>
                <div className={styles.inputLabel}>Title: </div>
                <input type="text" data-key={i} value={this.state.presentations[i].title} onChange={(evt) => updateState(evt, 'presentations', 'title')}></input>
                <div className={styles.inputLabel}>Event type: </div>
                <select data-key={i} onChange={(evt) => updateState(evt, 'presentations', 'eventType')} value={this.state.presentations[i].eventType}>
                    <option value="CONFERENCE">Conference</option>
                    <option value="INVITED_SEMINAR">Invited Seminar</option>
                    <option value="KEYNOTE">Keynote</option>
                </select>
                <div className={styles.inputLabel}>Organising body: </div>
                <input type="text" data-key={i} value={this.state.presentations[i].organisingBody} onChange={(evt) => updateState(evt, 'presentations', 'organisingBody')}></input>
                <div className={styles.inputLabel}>Location: </div>
                <input type="text" data-key={i} value={this.state.presentations[i].location} onChange={(evt) => updateState(evt, 'presentations', 'location')}></input>
                <div className={styles.inputLabel}>Primary attribution: </div>
                <input type="text" data-key={i} value={this.state.presentations[i].primaryAttribution} onChange={(evt) => updateState(evt, 'presentations', 'primaryAttribution')}></input>
            </>)
        })

        let academicCollaborations = []
        this.state.academics.forEach((acs, i) => {
            academicCollaborations.push(<>
                <div className={styles.inputLabel}>Start date: </div>
                <input type="date" data-key={i} value={this.state.academics[i].startDate} onChange={(evt) => updateState(evt, 'academics', 'startDate')}></input>
                <div className={styles.inputLabel}>End date: </div>
                <input type="date" data-key={i} value={this.state.academics[i].endDate} onChange={(evt) => updateState(evt, 'academics', 'startDate')}></input>
                <div className={styles.inputLabel}>Name of institution: </div>
                <input type="text" data-key={i} value={this.state.academics[i].institutionName} onChange={(evt) => updateState(evt, 'academics', 'institutionName')}></input>
                <div className={styles.inputLabel}>Department within institution: </div>
                <input type="text" data-key={i} value={this.state.academics[i].institutionDepartment} onChange={(evt) => updateState(evt, 'academics', 'institutionDepartment')}></input>
                <div className={styles.inputLabel}>Location: </div>
                <input type="text" data-key={i} value={this.state.academics[i].location} onChange={(evt) => updateState(evt, 'academics', 'location')}></input>
                <div className={styles.inputLabel}>Name of collaborator: </div>
                <input type="text" data-key={i} value={this.state.academics[i].nameOfCollaborator} onChange={(evt) => updateState(evt, 'academics', 'nameOfCollaborator')}></input>
                <div className={styles.inputLabel}>Primary goal of collaboration: </div>
                <select data-key={i} onChange={(evt) => updateState(evt, 'academics', 'goalOfCollaboration')} value={this.state.academics[i].goalOfCollaboration}>
                    <option value="ACCESS_TO_SOFTWARE_DATA_MATERIAL_EQUIPMENT">Access to Software Data Material Equipment</option>
                    <option value="TRAINING_AND_CAREER_DEVELOPMENT">Training and Career Development</option>
                    <option value="JOINT_PUBLICATION">Joint Publication</option>
                    <option value="STARTUP_DEVELOPMENT">Startup Development</option>
                    <option value="LICENSE_DEVELOPMENT">License Development</option>
                    <option value="BUILDING_NETWORK_AND_RELATIONSHIPS">Building Networks and Relationships</option>
                </select>
                <div className={styles.inputLabel}>Frequency of interaction: </div>
                <input type="text" data-key={i} value={this.state.academics[i].interactionFrequency} onChange={(evt) => updateState(evt, 'academics', 'interactionFrequency')}></input>
                <div className={styles.inputLabel}>Primary attribution: </div>
                <input type="text" data-key={i} value={this.state.academics[i].primaryAttribution} onChange={(evt) => updateState(evt, 'academics', 'primaryAttribution')}></input>
            </>)
        })

        let nonAcademicCollaborations = []
        this.state.nonAcademics.forEach((acs, i) => {
            nonAcademicCollaborations.push(<>
                <div className={styles.inputLabel}>Start date: </div>
                <input type="date" data-key={i} value={this.state.nonAcademics[i].startDate} onChange={(evt) => updateState(evt, 'nonAcademics', 'startDate')}></input>
                <div className={styles.inputLabel}>End date: </div>
                <input type="date" data-key={i} value={this.state.nonAcademics[i].endDate} onChange={(evt) => updateState(evt, 'nonAcademics', 'endDate')}></input>
                <div className={styles.inputLabel}>Name of institution: </div>
                <input type="text" data-key={i} value={this.state.nonAcademics[i].institutionName} onChange={(evt) => updateState(evt, 'nonAcademics', 'institutionName')}></input>
                <div className={styles.inputLabel}>Department within institution: </div>
                <input type="text" data-key={i} value={this.state.nonAcademics[i].institutionDepartment} onChange={(evt) => updateState(evt, 'nonAcademics', 'institutionDepartment')}></input>
                <div className={styles.inputLabel}>Location: 
                </div>
                <input type="text" data-key={i} value={this.state.nonAcademics[i].location} onChange={(evt) => updateState(evt, 'nonAcademics', 'location')}></input>
                <div className={styles.inputLabel}>Name of collaborator: </div>
                <input type="text" data-key={i} value={this.state.nonAcademics[i].nameOfCollaborator} onChange={(evt) => updateState(evt, 'nonAcademics', 'nameOfCollaborator')}></input>
                <div className={styles.inputLabel}>Primary goal of collaboration: </div>
                <input type="text" data-key={i} value={displayFriendlyUnderscore(this.state.nonAcademics[i].goalOfCollaboration)} onChange={(evt) => updateState(evt, 'nonAcademics', 'goalOfCollaboration')}></input>
                <div className={styles.inputLabel}>Frequency of interaction: </div>
                <input type="text" data-key={i} value={this.state.nonAcademics[i].interactionFrequency} onChange={(evt) => updateState(evt, 'nonAcademics', 'interactionFrequency')}></input>
                <div className={styles.inputLabel}>Primary attribution: </div>
                <input type="text" data-key={i} value={this.state.nonAcademics[i].primaryAttribution} onChange={(evt) => updateState(evt, 'nonAcademics', 'primaryAttribution')}></input>
            </>)
        })



        let sfiRatios = []
        this.state.fundingRatio.forEach((ratio, i) => {
            sfiRatios.push(<>
                <div className={styles.inputLabel}>Year: </div>
                <input type="text" data-key={i} value={this.state.fundingRatio[i].year} onChange={(evt) => updateState(evt, 'fundingRatio', 'year', true)}></input>
                <div className={styles.inputLabel}>Percentage of annual spend from SFI:</div>
                <select data-key={i} onChange={(evt) => updateState(evt, 'fundingRatio', 'annualTimePercent')} value={this.state.fundingRatio[i].annualTimePercent}>
                    <option value="PERCENT_0_20">0 - 20%</option>
                    <option value="PERCENT_21_40">21 - 40%</option>
                    <option value="PERCENT_41_60">41 - 60%</option>
                    <option value="PERCENT_61_80">61 - 80%</option>
                    <option value="PERCENT_81_100">81 - 100%</option>
                </select>
            </>)
        })

        return (
            <div className={[styles.root, styles.editSection]}>
                <div className={styles.exampleClass}>
                Users Profile Page
                </div>
                <div className={styles.tabs}>
                    <button onClick={()=>this.setState({editing: false})}>
                    Profile
                    </button>
                </div>
                <div className={styles.editContainer}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.sectionHeading}>Distinctions/Awards</div>
                        <div className={styles.section}>
                            {awards}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({awards: this.state.awards.concat([{}])})}}></input>
                        </div>
                        
                        {/* <div className={styles.sectionHeading}>Funding Diversification</div>
                        <div className={styles.section}>
                            
                        </div> */}

                        <div className={styles.sectionHeading}>Impacts</div>
                        <div className={styles.section}>
                            {impacts}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({impacts: this.state.impacts.concat([{}])})}}></input>
                        </div>

                        <div className={styles.sectionHeading}>Innovation and Commercialisation</div>
                        <div className={styles.section}>
                            {innovations}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({innovations: this.state.innovations.concat([{}])})}}></input>
                        </div>

                        <div className={styles.sectionHeading}>Publications</div>
                        <div className={styles.section}>
                            {publications}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({publications: this.state.publications.concat([{}])})}}></input>
                        </div>

                        <div className={styles.sectionHeading}>Presentations</div>
                        <div className={styles.section}>
                            {presentations}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({presentations: this.state.presentations.concat([{}])})}}></input>
                        </div>

                        <div className={styles.sectionHeading}>Academic collaborations</div>
                        <div className={styles.section}>
                            {academicCollaborations}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({academics: this.state.academics.concat([{}])})}}></input>
                        </div>

                        <div className={styles.sectionHeading}>Non-Academic collaborations</div>
                        <div className={styles.section}>
                            {nonAcademicCollaborations}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({nonAcademics: this.state.nonAcademics.concat([{}])})}}></input>
                        </div>

                        {/* <div className={styles.sectionHeading}>Conferences/workshops/seminars organised</div>
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
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({awards: this.state.awards.concat([{}])})}}></input>
                        </div> */}

                        {/* <div className={styles.sectionHeading}>Communications overview</div>
                        <div className={styles.section}>
                            <p>Year: <input type="text" name="comms_year"></input></p>
                            <p>Number of public lectures/demonstrations: <input type="text" name="comms_numberOfPublicLectures"></input></p>
                            <p>Number of visits: <input type="text" name="comms_numberOfVisits"></input></p>
                            <p>Number of media interactions: <input type="text" name="comms_numberOfMediaInteractions"></input></p>
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({communications: this.state.communications.concat([{}])})}}></input>
                        </div> */}

                        <div className={styles.sectionHeading}>SFI funding ratio</div>
                        <div className={styles.section}>
                            {sfiRatios}
                            <input type="button" value="Add New Entry" onClick={() => {this.setState({fundingRatio: this.state.fundingRatio.concat([{}])})}}></input>
                        </div>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default UserProfile;