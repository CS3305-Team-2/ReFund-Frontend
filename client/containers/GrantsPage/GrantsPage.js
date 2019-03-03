import React, { Component} from 'react';
import styles from './GrantsPage.scss';
import cx from 'classnames';
import GrantsListItem from '../../components/GrantsListItem/GrantsListItem';
import CreateGrantModal from '../../components/CreateGrantModal/CreateGrantModal';
import SubmitProposalModal from '../../components/SubmitProposalModal/SubmitProposalModal';
import {apiUrl} from '../../config';
import axios from 'axios';
import getCurrentUser from '../../utils/getCurrentUser';

class GrantsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'open',
      modalOpen: false,
      proposalModalOpen: false,
      loaded: false,
      grants: null,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.onCreateGrant = this.onCreateGrant.bind(this);
    this.fetchGrants = this.fetchGrants.bind(this);
  }

  componentDidMount() {
    this.fetchGrants();
  }

  fetchGrants() {
    axios.get(apiUrl + '/grants').then(
      res => {
        console.log('grants', res.data);
        this.setState({ grants: res.data, loaded: true });
      }
    ).catch(e => console.log(e.response));
  }

  getGrants(isResearcher) {
    let grants = this.state.grants;
    const grantsType = this.state.activeTab;
    grants = grants.filter((grant) => grant.status.toLowerCase() == grantsType);
    return grants.map((grant)=>{
        return <div className="mb-2"><GrantsListItem grant={grant} isResearcher={isResearcher} onApply={() => this.onApply(grant)}/></div>
    });
  }

  onApply(grant) {
    this.setState({ activeGrant: grant });
    this.toggleModal('proposalModalOpen')
  }

  toggleModal(modalType) {
    const bodyClass = document.body.className;
    if (bodyClass.includes(' modal-open')) {
      document.body.className = bodyClass.replace(' modal-open', '');
      this.setState({[modalType]: false });
    } else {
      document.body.className += ' modal-open';
      this.setState({[modalType]: true});
    }
  }

  onCreateGrant(grant) {
    this.fetchGrants();
    this.toggleModal('modalOpen');
  }

	render() {
    const state = this.state;
    const activeTab = styles.activeTab;
    const userType = getCurrentUser().user.type.type;
    const isSFIAdmin = userType === 'sfi_admin';
    const isResearcher = userType === 'researcher';

    let grants = <div>Loading...</div>
    if (this.state.loaded) grants = this.getGrants(isResearcher);


		return (
			<div className={styles.container}>
        <div className={styles.root}>
          <CreateGrantModal 
            open={this.state.modalOpen}
            onClose={() => this.toggleModal('modalOpen')}
            onCreateGrant={this.onCreateGrant}
          />
          <SubmitProposalModal 
            open={this.state.proposalModalOpen}
            onClose={() => this.toggleModal('proposalModalOpen')}
            grant={this.state.activeGrant}
          />
          {/* Heading */}
          <div className={styles.header}>
            <div className={styles.title}>Funding Calls</div>
            { isSFIAdmin ? <div className={styles.button}
              onClick={() => this.toggleModal('modalOpen')}
            >Create Funding Call</div> : '' }
          </div>

          {/* Tabs Section */}
          <div className={styles.tabs}>
              <div
                className={cx(styles.tab, { [activeTab]: state.activeTab == 'open'}) }   
                onClick={()=>this.setState({activeTab: 'open'})}
              >
              Open Calls 
              </div>
              <div 
                className={cx(styles.tab, { [activeTab]: state.activeTab == 'closed'})}
                onClick={()=>this.setState({activeTab: 'closed'})}            
              >
              Closed Calls
              </div>
          </div>

          {/* Grants List */}
          <div className={styles.grants}>
              {grants}
          </div>
        </div>
      </div>
    );	
    }
}

export default GrantsPage;