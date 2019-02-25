import React, { Component} from 'react';
import styles from './PrevReportItem.scss';
import cx from 'classnames';
import dload from '../../img/dload.png';


class PrevReportItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
     
    }
	}
	
	render() {
    const state = this.state;
    const props = this.props;

    // The research center data passed down from ResearcCenter componen
		// console.log(user); // Will print out the user. Delete when finished.
		const report = props.report;
		let file;
		
		if (report.pdf != null){
			file = <a href={report.pdf} download><img src={dload} alt="download pdf button" height="42" width="42"/></a>;
		}	else{
			file = "";
		}	
		return (
			
			<div>
				<h5>{report.title} - {report.date}</h5>
				<p>
					{report.details}
				</p>
				{file}
			</div>
		)
;	}
}

export default PrevReportItem;
