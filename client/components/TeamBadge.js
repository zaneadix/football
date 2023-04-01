import css from './TeamBadge.module.css';

export default ({ team }) => {
  return (
    <div className={css.TeamBadge} style={{ backgroundColor: team?.primaryColor }}>
      {team.abbreviatedName}
    </div>
  );
};
