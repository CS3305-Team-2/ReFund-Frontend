import React from 'react';
import styles from './ProjectListItem.scss';

const ProjectListItem = (props) => {
  const project = props.project;
  
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>{project.name}</div>
      </div>
    </div>
  );	
};

export default ProjectListItem;