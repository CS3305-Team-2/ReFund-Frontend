import React, { Component } from "react";
import styles from './GroupListItem.scss';

class GroupListItem extends Component {
  
    groups(item) {
        const groupItems = item.team.map((team, index) =>
            <p key={index}>{team}</p>
        );
        return <li key={item.key} className={styles.Item}>
            <div className="card">
                <h1 className="card-header" className={styles.header}>{item.text}</h1>
                <div className="card-body" className={styles.body}>
                    {groupItems}
                </div>
            </div>
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
}
 
export default GroupListItem;