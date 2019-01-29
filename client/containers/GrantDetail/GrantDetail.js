import React, { Component} from 'react';
import styles from './GrantDetail.scss';
import cx from 'classnames';

const grant = {

}

class GrantDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
    }
  }
  
	render() {
    const state = this.state;
    const props = this.props;

		const grant = grant;
		
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
        <div className={styles.exampleClass}>
					Grant Detail Page
        </div>

        <div>
          {/* Add in data like so. e.g for a user: add in their name with {user.name} into a div */}
          {exampleData.stuff} 
        </div>
			</div>
		)
;	}
}

export default GrantDetail;