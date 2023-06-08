'use client';

import { useMutation } from '@tanstack/react-query';

import { postRequest } from '@client/utilities/crud';
import {
  PLAY_TYPE,
  OFFENSIVE_PLAY_SETS,
} from '@shared/constants';

export default ({ matchup }) => {
  const { _id: matchupId, down, state } = matchup;

  const { mutate: callPlay } = useMutation({
    mutationFn: (playType) => {
      return postRequest(
        `/matchup/${matchupId}/call-play`,
        { playType }
      );
    },
    // onSuccess: async response => {
    //   console.log(response);
    // },
  });

  const plays = OFFENSIVE_PLAY_SETS[state] || [];

  return (
    <div>
      {plays.map((play) => (
        <button onClick={() => callPlay(play)}>
          {play}
        </button>
      ))}
    </div>
  );
};
