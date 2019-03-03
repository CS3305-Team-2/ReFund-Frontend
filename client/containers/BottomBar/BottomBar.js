import React, { Component} from 'react';
import styles from './BottomBar.scss';
import { withRouter } from 'react-router-dom';

class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log('topbar', this.props);
        return (
            <div className={styles.topBar}>
                <div style={{padding: '1em', textAlign: 'left'}}>
                    <div>
                    Copyright &copy; 2019 Team 2
                    </div>
                </div>
            </div>
        );	
    }
}

export default withRouter(BottomBar);
