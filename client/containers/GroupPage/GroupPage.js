import React, { Component} from 'react';
import styles from './GroupPage.scss';
import GroupListItem from '../../components/GroupListItem/GroupListItem';

class GroupPage extends Component {
    constructor(props){
        super(props);

        this.state ={
            items: [],
        };
        this.addItem = this.addItem.bind(this);
    }
    addItem(a){
        if (this.groupName.value !== "") {
            var newGroup = {
                key: Date.now(),
                text: this.groupName.value,
                team: ['Some Random Name','Some Other Random']
            };
   
            this.setState((prevState) => {
                return { 
                    items: prevState.items.concat(newGroup) 
                };
            });
     
            this.groupName.value = "";
        }
     
        a.preventDefault();
    }
  
    render() {
        return (
            <div className={styles.GroupsMain}>
                <div className={styles.header}>
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this.groupName = a} placeholder="Add Group">
                        </input>
                        <button type="submit"> Add Group </button>
                    </form>
                </div>
                <GroupListItem entries={this.state.items}/>
            </div>
        );	
    }
}

export default GroupPage;