import React, { Component} from 'react';
import styles from './HostInstitutionPage.scss';
import cx from 'classnames';
import HostInstitutionItem from '../../components/HostInstitutionStaff/HostInstitutionStaff';
import { func } from 'prop-types';

const staffMembs = [
  {
    title:"John Ferguson"
  },
  {
    title:"Chris Hayes"
  },
  {
    title:"Jesse Eisinger"
  },
  {
    title:"Tressie McMillian"
  },
  {
    title:"Stacey Abrams"
  },
  {
    title:"Joanne Hill"
  },
  {
    title:"Jonah Brown"
  },
  {
    title:"Micheal Tester"
  },
  {
    title:"Eric Ries"
  },
  {
    title:"Alex Wagner"
  },
  {
    title:"Amy Chua"
  }
]

const projects = [
  {
    title:"Project A"
  },
  {
    title:"Project B"
  },
  {
    title:"Project C"
  },
  {
    title:"Project D"
  },
  {
    title:"Project E"
  },
  {
    title:"Project F"
  },
  {
    title:"Project G"
  },
  {
    title:"Project H"
  }
]


class HostInstitution extends Component {
	constructor(props) {
    super(props);
		this.state = {
      staffState:0,
      projectState:0
    }
  }

  getStaffItems(staffMembs){
    return staffMembs.map((staffMemb)=>{
      return <HostInstitutionItem project={staffMemb} />
    });
  }

  getProjectItems(projects){
    return projects.map((project)=>{
      return <HostInstitutionItem project={project} />
    });
  }

  decreaseStaff() {
    if (this.state.staffState>0){
      this.setState({staffState: this.state.staffState-1});
    }
  }
  
  increaseStaff() {
    if (this.state.staffState*5+5<staffMembs.length){
      this.setState({staffState: this.state.staffState+1});
    }
  }

  decreaseProjects() {
    if (this.state.projectState>0){
      this.setState({projectState: this.state.projectState-1});
    }
  }
  
  increaseProjects() {
    if (this.state.projectState*5+5<projects.length){
      this.setState({projectState: this.state.projectState+1});
    }
  }

	render() {
    const state = this.state;
    const props = this.props;
    const staff = ["example1","example2","example3","example4","example5","example6","example7","example8","example9","example10"];

		const rc = {
      title: 'University College Cork',
      Desc: "We’re an award-winning institution with a history of independent thinking stretching back over 170 years. UCC is proud to be ranked in the top 2% of universities in the world. Our beautiful university opened its gates to just 115 students in 1849. We now have a student population of over 21,000.",
      extra: ['email@email.com'],
      startDate: "353 (0)21 490 3000",
      addr1:"College Road,",
      addr2:"University college,",
      addr3:"Cork",
      staff:[],
      email:"email@email.com"
    }
    const extraItems = rc.extra.map((extra) => <li>{extra}</li>);
    const staffItems = rc.staff.map((staff) => <li>{staff}</li>);
		const exampleData = {
      stuff: 'example stuff'
    }
    

    let staffListItems = this.getStaffItems(staffMembs.slice(5*this.state.staffState,5*this.state.staffState+5));
    let projectItems = this.getStaffItems(projects.slice(5*this.state.projectState,5*this.state.projectState+5));

		
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
          {rc.title}
        </div>
        <div className={styles.cols}>
          <div className={styles.Main}>
            <div className={styles.mainCol}>
              {/* Add in data like so. e.g for a user: add in their name with {user.name} into a div */}
              <h1>Description</h1>
              {rc.Desc}
              <div>
              <div className={styles.staff}>
                <div className={styles.header}>
                  <button className={styles.lbutton} onClick={()=>this.decreaseStaff()} >
                    &larr;
                  </button>
                  <h1>staff</h1>
                  <button className={styles.rbutton} onClick={()=>this.increaseStaff()}>
                    &rarr;
                  </button>
                </div>
                {staffListItems}
              </div>
              <div className={styles.projects}>
                <div className={styles.header}>
                  <button className={styles.lbutton} onClick={()=>this.decreaseProjects()} >
                    &larr;
                  </button>
                  <h1>Projects</h1>
                  <button className={styles.rbutton} onClick={()=>this.increaseProjects()}>
                  &rarr;
                  </button>
                </div>
                {projectItems}
              </div>
              </div>
            </div>
			    </div>
          <div className={styles.sideCol}>
            <h1>Number</h1>
            {rc.startDate}
            <h1>Address</h1>
            <li>{rc.addr1}</li>
            <li>{rc.addr2}</li>
            <li>{rc.addr3}</li>
            <h1>Email</h1>
            {rc.email}
          </div>
        </div>
      </div>
    )
;	}
}

export default HostInstitution;