import React, { Component} from 'react';
import styles from './LoginPage2.scss';
import cx from 'classnames';
import axios from 'axios';
import {apiUrl} from '../../config';
import { withRouter } from "react-router-dom";
import LoginForm from '../../components/LoginForm/LoginForm';
import VisibilitySensor from 'react-visibility-sensor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '0000-0000-0000-0001',
        password: 'hihowareyou'
    }

    this.submitLogin = this.submitLogin.bind(this);
  }

  triggerAnimation(animation, isVisible) {
    if (this.state[animation] || !isVisible) return;
    console.log('setting visible',animation, isVisible);
    this.setState({ [animation]: true });
  }


  submitLogin(email, password) {    
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    console.log(email, password);
    axios.post(apiUrl + '/login', formData).then((res)=>{
        // console.log(res.status, res.body, res.data, res.headers)
        console.log(res);
        const user = res.data;
        const token = res.headers['jwt-token'];
        const authData = JSON.stringify({ user, token });

        localStorage.setItem("authData", authData);
        this.props.history.push("/home");
    }).catch(e => {console.log(e)});
  }

  render() {
      const state = this.state;
      const props = this.props;


      const ringSquare = (
          <div className={styles.outerRing}>
              <div className={styles.ring}>
                  <div className={cx(styles.square, styles.smallSquare)}>
                      <div className={cx(styles.cornerDark, styles.smallCorner)} />
                      <div className={cx(styles.cornerLight, styles.smallCorner)} />
                      <div className={cx(styles.cornerLight, styles.smallCorner)} />
                      <div className={cx(styles.cornerDark, styles.smallCorner)} />
                  </div>
              </div>
          </div>
      );

      return (
        <div>
          <section className={cx(styles.section, styles.darkSection)}>
              <div className={cx('container-fluid', styles.content)}>

                  <div className={cx(styles.displayContainer, styles.headerSectionAnimation)}>
                      <div className={cx('col-sm-6', styles.leftPanel)}>
                          <LoginForm 
                              onSubmit={this.submitLogin}
                          />  
                      </div>

                      <div className={cx(styles.copy, 'col')}>
                          <div className={cx(styles.headerText, 'mb-1')}>
                          At Science Foundation Ireland, we believe in the ability of science, technology, engineering & maths to effect positive change in the world and drive a sustainable international economy.                </div>

                      </div>

                  </div>
              </div>
          </section>

          <section className={cx(styles.section, styles.whiteSection)}>
              <div className={cx('container-fluid', styles.content)}>
                  <div className={styles.heading}>about sfi</div>  

                  <div className={styles.detailContainer}>

                      <VisibilitySensor delayedCall partialVisibility onChange={(isVisible) => this.triggerAnimation('ringSquareAnimation', isVisible)}>
                          <div className={cx(
                              styles.visualContainer, 'col-12 col-sm-3 mb-2 mb-sm-0',
                              styles.ringSquare,
                              { [styles.ringSquareAnimation]: this.state.ringSquareAnimation },
                          )}
                          >
                              <div className={styles.outerRing}>
                                  <div className={styles.ring}>
                                      <FontAwesomeIcon
                                          icon={"atom"} 
                                          style={{
                                              fontSize: '80px',
                                              marginLeft: '0.25rem',
                                              color: '#00A79A'
                                          }}
                                      /></div></div>
                          </div>
                      </VisibilitySensor>
                      <div className={cx(styles.copy, 'col')}>
                          <div>
                              <div className={styles.mainText}>
                              Science Foundation Ireland funds oriented basic and applied research in the areas of science, technology, engineering and mathematics.                </div>
                              <div className={styles.subText}>
                              Applied research is an original investigation undertaken to acquire new knowledge and is directed primarily towards a specific practical aim or objective. The results of applied research are intended primarily to be valid for a single or limited number of products, operations, methods, or systems.
                              </div></div>
                      </div>
                  </div>

                  <div className={styles.detailContainer}>
                      <VisibilitySensor delayedCall partialVisibility onChange={(isVisible) => this.triggerAnimation('copy2', isVisible)}>
                          <div className={cx(styles.copy, 'col', 'order-1 order-sm-0',
                              styles.copyAnimationInitial,
                              { [styles.copyAnimation]: this.state.copy2 }
                          )}>
                              <div>
                                  <div className={styles.mainText}>
                                  SFI's Mission
                                  </div>
                                  <div className={styles.subText}>
                                  Science Foundation Ireland will progress Ireland’s society and economy by supporting the best scientific and engineering research while building an awareness of the role, impact and opportunities science creates.                
                                  </div>
                              </div>
                          </div>
                      </VisibilitySensor>

                      <VisibilitySensor delayedCall partialVisibility onChange={(isVisible) => this.triggerAnimation('ringSquareAnimation2', isVisible)}>
                          <div className={cx(
                              styles.visualContainer, 'col-12 col-sm-3 mb-2 mb-sm-0',
                              styles.ringSquareRight,
                              { [styles.ringSquareAnimationRight]: this.state.ringSquareAnimation2 },
                          )}
                          >
                              {ringSquare}
                          </div>
                      </VisibilitySensor>
                  </div>

                  <div className={styles.detailContainer}>
                      <VisibilitySensor delayedCall partialVisibility onChange={(isVisible) => this.triggerAnimation('ringSquareAnimation3', isVisible)}>
                          <div className={cx(
                              styles.visualContainer, 'col-12 col-sm-3 mb-2 mb-sm-0',
                              styles.ringSquare,
                              { [styles.ringSquareAnimation]: this.state.ringSquareAnimation3 },
                          )}
                          >
                              <div className={styles.outerRing}>
                                  <div className={styles.ring}>
                                      <FontAwesomeIcon
                                          icon={"flask"} 
                                          style={{
                                              fontSize: '80px',
                                              marginLeft: '0.25rem',
                                              color: '#00A79A'
                                          }}
                                      /></div></div>
                          </div>
                      </VisibilitySensor>
                      <div className={cx(styles.copy, 'col')}>
                          <div>
                              <div className={styles.mainText}>
                              SFI's Vision 
                              </div>
                              <div className={styles.subText}>
                              That Ireland will be a global leader in scientific and engineering research, discovery and innovation. A world class research capability in selected niches of these two enabling technologies is an essential foundation for future growth.
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
      );
  }
}

export default withRouter(LoginPage);