import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { postRequest } from '@client/utilities/crud';
import { PLAY_TYPE } from '@client/utilities/constants';

export default () => {
  const { query } = useRouter();

  const { mutate: callPlay } = useMutation({
    mutationFn: playType => {
      return postRequest(`/api/matchup/${query.matchupId}/call-play`, { playType });
    },
    onSuccess: async response => {
      console.log(response);
    },
  });

  return (
    <div>
      <button onClick={() => callPlay(PLAY_TYPE.PASS)}>Pass</button>
      <button onClick={() => callPlay(PLAY_TYPE.RUSH)}>Rush</button>
    </div>
  );
};
