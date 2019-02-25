import React, { Component } from "react";
import styles from './GroupListItem.scss';

class GroupListItem extends Component {
  
  groups(item) {
    const groupItems = item.team.map((team, index) =>
      <p key={index}>{team}</p>
    );
    return <li key={item.key} className={styles.Item}>
              <h1>{item.text}:</h1>
              {groupItems}
          </li>
  }
  render() {
    var groupEntries = this.props.entries;
    var listItems = groupEntries.map(this.groups);
 
    return (
      <div>
        <ul className={styles.theList}>
            {listItems}
        </ul>
        
      </div>
    );
  }
};
 
export default GroupListItem;