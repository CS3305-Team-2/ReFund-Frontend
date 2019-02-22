import React, { Component } from 'react';
import styles from './ProfileField.scss';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from '@material-ui/icons/KeyboardArrowRight';
import displayFriendly from '../../utils/displayFriendly';

class ProfileField extends Component {
	constructor(props) {
		super(props);
		this.state = {
      expanded: false,
    }
  }
  
  expandInfo(section) {
    this.setState(prevState => ({[section]: !prevState[section]}))
  }
  
  expandIcon() {
    const arrowStyle = {
      fontSize:'24px', 
      cursor:'pointer',
      color: '#00A79A',
      transition: 'transform 0.3s'
    }
    if (this.state.expanded) arrowStyle.transform = 'rotate(90deg)';
    return <ExpandIcon style={arrowStyle} />;
  }

  dataFields(data) {
    console.log('df', data);
    let dataArr = data;
    if (!Array.isArray(data)) dataArr = [data];
    const entries = [];
    dataArr.forEach((entry, index)=>{
      const entryFields = Object.keys(entry);
      const entryItems = [];
      entryFields.forEach((field)=> {
        if (typeof entry[field] != "object") {
          entryItems.push(
            <li className={styles.entryItem} key={entry[field]}>
              {displayFriendly(field)}: <span className={styles.entryVal}>{entry[field]}</span>
            </li>
          );
        }
      });
      entries.push(
        <div className={styles.entry} key={`entry ${index}`}>
          {entryItems}
        </div>
      )
    });
    return (
      <div className={styles.section}>
        {entries}
      </div>
    )
  }
	
	render() {
    const state = this.state;
    const props = this.props;

    const { heading, data } = props;

    const dataFields = this.dataFields(data);
    
		return (
      <div>
        <div
        onClick={() => this.setState(prevState => ({expanded: !prevState.expanded}))}
        className={styles.sectionHeader}
      >
        <div className={styles.sectionHeading}>{heading}</div>
        {this.expandIcon()}
      </div>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        {dataFields}
      </Collapse>
      </div>
		)
;	}
}

export default ProfileField;