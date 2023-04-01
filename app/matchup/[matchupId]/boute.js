import { PLAY_TYPE } from '@client/utilities/constants';

const rushPlay = () => {
  return 'RAN';
};

const passPlay = () => {
  return 'PASSED';
};

export default function handler(req, res) {
  console.log(body);
  const { body, query } = req;
  const { playType } = body;

  let playResult;
  switch (playType) {
    case PLAY_TYPE.PASS:
      playResult = passPlay();
      break;
    case PLAY_TYPE.RUSH:
      playResult = rushPlay();
      break;
    default:
  }

  res.status(200).json({
    play: playResult,
  });
}
