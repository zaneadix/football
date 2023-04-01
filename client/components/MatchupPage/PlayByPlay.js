'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';

import styles from './PlayByPlay.module.css';
import TeamBadge from '@client/components/TeamBadge';

const Drive = ({ drive, team }) => {
  const [showPlays, setShowPlays] = useState(false);
  const toggleOpen = () => {
    setShowPlays(!showPlays);
  };

  return (
    <div className={styles.Drive} role="button">
      <button className={styles.DriveOutcome} onClick={toggleOpen}>
        <TeamBadge team={team}></TeamBadge>
        <div>
          <div>Punt</div>
          <div>3 plays for 6 yards</div>
        </div>
      </button>
      <ul
        className={clsx({
          [styles.Plays]: true,
          [styles.open]: showPlays,
        })}
      >
        {drive.plays.map((play, index) => (
          <li className={styles.Play} key={`play-${index}`}>
            <small>{play.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ({ drives = [], homeTeam, visitingTeam }) => {
  const teamById = useMemo(() => {
    return { [homeTeam._id]: homeTeam, [visitingTeam._id]: visitingTeam };
  });

  return (
    <section className={styles.PlayByPlay}>
      {drives.map((drive, index) => {
        const team = teamById[drive.teamId];
        return <Drive key={`drive-${index}`} drive={drive} team={team} />;
      })}
    </section>
  );
};
