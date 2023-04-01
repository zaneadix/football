'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

import Controls from './Controls';
import MatchupBanner from './MatchupBanner';
import PlayByPlay from './PlayByPlay';

import styles from './MatchupPage.module.css';

let socket;
export default ({ matchup }) => {
  //   const { query } = useRouter();
  const { homeTeam, visitingTeam } = matchup;

  const initializeSocket = async () => {
    if (!socket) {
      await fetch(`/io`);
      socket = io();
      socket.on('connect', () => {
        console.log('CONNECTED');
      });
    }
  };

  useEffect(() => {
    console.log('init');
    initializeSocket();
  }, []);

  return (
    <div>
      <MatchupBanner matchup={matchup} />
      <div className={styles.MatchupContent}>
        <section>
          <PlayByPlay drives={matchup.drives} homeTeam={homeTeam} visitingTeam={visitingTeam}></PlayByPlay>
        </section>
        <section>
          <Controls></Controls>
        </section>
      </div>
    </div>
  );
};
