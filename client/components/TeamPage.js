import styles from './TeamPage.module.css';

export default ({ team }) => {
  return <div className={styles.TeamPage}>{team.name}</div>;
};
