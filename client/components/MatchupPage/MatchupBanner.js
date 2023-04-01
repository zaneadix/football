'use client';

import clsx from 'clsx';

import styles from './MatchupBanner.module.css';

const Team = ({ team = {}, flip = false }) => {
  const { location, name } = team;
  return (
    <>
      <div
        className={clsx({
          [styles.team]: true,
          [styles.flip]: flip,
        })}
      >
        <div className={styles.details}>
          <small className={styles.teamLocation}>{location}</small>
          <h1 className={clsx(styles.teamName)}>{name}</h1>
          {/* <small>record</small> */}
        </div>
      </div>
    </>
  );
};

const PointsSummary = ({ homeTeam, homePoints, visitingTeam, visitingPoints }) => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th class="quarter">1</th>
          <th class="quarter">2</th>
          <th class="quarter">3</th>
          <th class="quarter">4</th>
          <th class="total">T</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="abv-name">{visitingTeam.abbreviatedName}</td>
          <td>{visitingPoints.q1}</td>
          <td>{visitingPoints.q2}</td>
          <td>{visitingPoints.q3}</td>
          <td>{visitingPoints.q4}</td>
          <td>{visitingPoints.overtime}</td>
        </tr>
        <tr>
          <td class="abv-name">{homeTeam.abbreviatedName}</td>
          <td>{homePoints.q1}</td>
          <td>{homePoints.q2}</td>
          <td>{homePoints.q3}</td>
          <td>{homePoints.q4}</td>
          <td>{homePoints.overtime}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Value = ({ label, value, big }) => {
  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={clsx({
          [styles.valueContainer]: true,
          [styles.big]: big,
        })}
      >
        <div className={styles.value}>{value}</div>
      </div>
    </>
  );
};

const Scoreboard = ({ homeTeam, visitingTeam, homePoints, visitingPoints }) => {
  return (
    <>
      <div className={clsx(styles.scoreboard, 'four-pixel-radius')}>
        <div className={styles.homeScore}>
          <Value label={homeTeam.abbreviatedName} value={homePoints.total}></Value>
        </div>
        <div className={styles.time}>
          <Value value="5:00" big={true}></Value>
        </div>
        <div className={styles.visitingScore}>
          <Value label={visitingTeam.abbreviatedName} value={visitingPoints.total}></Value>
        </div>
        <div className={styles.spot}>
          <Value label="Spot" value={23}></Value>
        </div>
        <div className={styles.down}>
          <Value label="Down" value={3}></Value>
        </div>
        <div className={styles.togo}>
          <Value label="To Go" value={7}></Value>
        </div>
        <div className={styles.quarter}>
          <Value label="Qtr" value={2}></Value>
        </div>
      </div>
    </>
  );
};

export default ({ matchup }) => {
  const { homeTeam, visitingTeam, homePoints, visitingPoints } = matchup;

  return (
    <div className={styles.banner}>
      <Team team={homeTeam} flip={true}></Team>
      <Scoreboard
        homeTeam={homeTeam}
        homePoints={homePoints}
        visitingTeam={visitingTeam}
        visitingPoints={visitingPoints}
      ></Scoreboard>
      <Team team={visitingTeam}></Team>
    </div>
  );
};
