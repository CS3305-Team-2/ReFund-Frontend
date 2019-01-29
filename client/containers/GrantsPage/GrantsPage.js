import React, { Component} from 'react';
import styles from './GrantsPage.scss';
import cx from 'classnames';
import '../../components/GrantsListItem/GrantsListItem';
import GrantsListItem from '../../components/GrantsListItem/GrantsListItem';

const fundedGrants = [
  {
    title: 'Cambridge Research Funding',
    description:'In certain circumstances, SFI supports the hosting of a conference event to create opportunities for Ireland and Irish researchers in the European Research Area.',
    amount: 300000,
    duration: '1 years',
    deadline: 'Rolling'
  },
  {
    title: 'Stockholm International Research Conference',
    description: 'The Science Foundation Ireland Discover Programme Call aims to support and develop science, technology, engineering and maths (STEM) education and public engagement sector in Ireland.',
    amount: 50000,
    duration: '9 Months',
    deadline: 'Rolling'
  },
  {
    title: 'MIT Robotics Fellowship Programme',
    description: 'MIT Robotics have entered an agreement to welcome, encourage and support research applications that cut across national boundaries involving collaborative teams led by researchers from the UK and Ireland.',
    amount: 200000,
    duration: '18 Months',
    deadline: 'Rolling'
  },
]

const availableGrants = [
  {
    title: 'SFI Fellowship Programme',
    description: 'Science Foundation Ireland is pleased to launch the Science Foundation Ireland Fellowship Programme. This programme aims to provide successful candidates with the opportunity to develop their career through experiencing first-hand, the diversity of activities carried out by a funding agency.',
    amount: 20000,
    duration: '2 years',
    deadline: 'Rolling'
  },
  {
    title: 'Brussels Conference Programme',
    description: 'In certain circumstances, SFI supports the hosting of a conference event to create opportunities for Ireland and Irish researchers in the European Research Area.',
    amount: 50000,
    duration: '1 years',
    deadline: 'Rolling'
  },
  {
    title: 'EPSRC-SFI Joint Funding of Research',
    description: 'EPSRC and Science Foundation Ireland (SFI) have entered an agreement to welcome, encourage and support research applications that cut across national boundaries involving collaborative teams led by researchers from the UK and Ireland.',
    amount: 500000,
    duration: '3 years',
    deadline: 'Rolling'
  },
  {
    title: 'SFI Research Centres - Spokes',
    description: ' This programme is a vehicle to enable the addition of new industrial and academic partners and projects to a SFI Research Centre, so allowing the Centre to expand and develop in line with new priorities and opportunities.',
    amount: 300000,
    duration: '1 years',
    deadline: 'Rolling'
  },
  {
    title: 'SFI Research Professorship Programme',
    description: 'Attracting outstanding research talent to Ireland is one of the principal ambitions of SFI. The recruitment of world-leading scientists and engineers will help to build the national research base and enhance Ireland’s reputation as a location to carry out high-impact, high-quality research.',
    amount: 25000,
    duration: '2 years',
    deadline: 'Rolling'
  },
  {
    title: 'SFI Discover Programme - Opportunistic Funding Mechanism',
    description: 'The Science Foundation Ireland Discover Programme Call aims to support and develop science, technology, engineering and maths (STEM) education and public engagement sector in Ireland by: investing in, developing and extending activity and ability in this area, and exploring and encouraging novel means of engaging the public', 
    amount: null,
    duration: '3 years',
    deadline: 'Rolling'
  }
]


class GrantsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
      activeTab: 'unfunded',
    }
  }
  
  getGrants() {
    let grants = this.state.activeTab == 'unfunded' ? availableGrants : fundedGrants;
    return grants.map((grant)=>{
      return <GrantsListItem grant={grant} />
    });
  }
	
	render() {
    const state = this.state;
    const activeTab = styles.activeTab;
    console.log(state.activeTab)
    const grants = this.getGrants();
		return (
			<div className={cx('container', styles.container)}>
        <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.title}>Funding Calls</div>
            <div className={styles.desc}></div>
          </div>
          <div className={styles.tabs}>
            <div 
              className={cx(styles.tab, { [activeTab]: state.activeTab == 'unfunded'}) }   
              onClick={()=>this.setState({activeTab: 'unfunded'})}
            >
              Taking Applications
            </div>
            <div 
              className={cx(styles.tab, { [activeTab]: state.activeTab == 'funded'})}
              onClick={()=>this.setState({activeTab: 'funded'})}            
            >
              Already Funded
            </div>
          </div>
          <div className={styles.grants}>
          {grants}
          </div>
				</div>
			</div>
		)
;	}
}

export default GrantsPage;