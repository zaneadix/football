'use client';

import { useEffect } from 'react';
import _merge from 'lodash/merge';
import _set from 'lodash/set';

import styles from './MatchupPage.module.css';
import Controls from './Controls';
import MatchupBanner from './MatchupBanner';
import PlayByPlay from './PlayByPlay';
import useMatchupStore from '@client/stores/matchup';

export default ({ matchup: matchupData }) => {
  const matchup =
    useMatchupStore((state) => state.matchup) ||
    matchupData;

  const { haltMatchup, initializeMatchup } =
    useMatchupStore((state) => state);

  useEffect(() => {
    initializeMatchup(matchupData);
    return () => {
      //cleanup socket connections?
      //haltMatchup();
    };
  }, []);

  return (
    <div>
      <MatchupBanner matchup={matchup} />
      <div className={styles.MatchupContent}>
        <section>
          <PlayByPlay
            drives={matchup.drives}
            homeTeam={matchup.homeTeam}
            visitingTeam={matchup.visitingTeam}
          ></PlayByPlay>
        </section>
        <section>
          <Controls matchup={matchup}></Controls>
        </section>
      </div>
    </div>
  );
};
