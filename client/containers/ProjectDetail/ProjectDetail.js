import React, { Component} from 'react';
import styles from './ProjectDetail.scss';
import cx from 'classnames';

const project = {
    title: 'Sample Title',
    desc:"sample text",
    startDate: "sample",
    endDate:"sample",
    budget:"sample",
    staff:[],
    fundedRes:[],
    status:"sample",
    extra: 'email@email.com'
}

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
  
    render() {
        const state = this.state;
        const props = this.props;

        const project = {
            title: 'ERA-Net on the Blue Bioeconomy (BlueBio) – Unlocking the Potential of Aquatic Bioresources',
            Desc: "The 1st Transnational Call for research proposals under the ERA-NET Bluebio is now open. BlueBio aims at achieving a sustainable and competitive Blue Bioeconomy in Europe. The goal is to generate knowledge for Blue Bioeconomy value chains and improve the transfer of bio-based products and services from research, innovation and demonstrations to production scale implementing the multi-actor-approach. BlueBio contributes to the production of safe, nutritious and valuable bio-products and services, while applying the food first principle. BlueBio launches calls to attract projects that work on the use and value-added of aquatic biomass in integrated value chains from primary production to processing, generating innovative products and services within the bioeconomy.",
            extra: ['email@email.com'],
            startDate: "1st January 2018",
            endDate:"17th March 2019",
            budget:"1,500,000 Euro",
            staff:[],
            fundedRes:"The Cofund is being coordinated by Norway and consists of 28 partners from 16 countries with an estimated fund of €29.25m. The main objective of the Cofund is to establish a coordinated Research and Development funding scheme that will strengthen Europe’s position in the blue bioeconomy.",
            status:"Open",
        }
        const extraItems = project.extra.map((extra) => <li>{extra}</li>);
        const staffItems = project.staff.map((staff) => <li>{staff}</li>);
        const exampleData = {
            stuff: 'example stuff'
        }
		
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
                <div className={styles.title}>
                    {project.title}
                </div>
                <div className={styles.cols}>
                    <div className={styles.Main}>
                        <div className={styles.mainCol}>
                            {/* Add in data like so. e.g for a user: add in their name with {user.name} into a div */}
                            <h1>Description:</h1>
                            {project.Desc}
                            <h1>Budget:</h1>
                            {project.budget}
                            <h1>Staff:</h1>
                            {staffItems}
                            <h1>Funding:</h1>
                            {project.fundedRes}
                        </div>
			    </div>
                    <div className={styles.sideCol}>
                        <h1>Start Date</h1>
                        {project.startDate}
                        <h1>End Date</h1>
                        {project.endDate}
                        <h1>Status</h1>
                        {project.status}
                    </div>
                </div>
            </div>
        );	
    }
}

export default ProjectDetail;