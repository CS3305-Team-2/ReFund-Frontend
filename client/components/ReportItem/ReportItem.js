import React, { Component} from 'react';
import styles from './ReportItem.scss';
import cx from 'classnames';


class ReportItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
     
    }
	}
	
	render() {
    const state = this.state;
    const props = this.props;

    // The research center data passed down from ResearcCenter component

		// console.log(user); // Will print out the user. Delete when finished.
		const user = props.user;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();

		if (dd < 10) {
  		dd = '0' + dd;
		}

		if (mm < 10) {
  		mm = '0' + mm;
		}
		today = dd + '/' + mm + '/' + yyyy;
    
		return (
			<div>
				<h1>Report On Project</h1>
				<form>
					User:  
					<input className={styles.tBox} type="text" value={user} name="user" disabled/>
					Date:  
					<input className={styles.tBox} type="text" value={today} name="date" disabled/>
					<h5>Title:</h5>
					<input type="text" name="title"/>
					<h5>Details:</h5>
					<textarea name="details" cols="80" rows="15"/>
					<input type="file" name="pdf" accept="application/pdf"/>
					<input type="submit"/>
				</form>
			</div>
		)
;	}
}

export default ReportItem;
