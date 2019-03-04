import React, { Component} from 'react';
import styles from './BottomBar.scss';
import { withRouter } from 'react-router-dom';

class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={styles.bottomBar}>
                <div style={{padding: '0.5em 1rem', textAlign: 'left'}}>
                    <div>
                    Copyright &copy; 2019 Team 2
                    </div>
                </div>
            </div>
        );	
    }
}

export default withRouter(BottomBar);
