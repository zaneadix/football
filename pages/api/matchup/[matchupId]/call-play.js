// import { ObjectId } from 'mongodb';

// import { getDatabase } from '@server/database';
import { PLAY_TYPE } from '@client/utilities/constants';

const rushPlay = () => {
  return 'RAN';
};

const passPlay = () => {
  return 'PASSED';
};

export default async function handler(req, res) {
  // const { body, query } = req;
  // const { db } = await getDatabase();

  // const matchup = await db.collection('matchups').findOne({ _id: new ObjectId(query.matchupId) });
  // // HANDLE no matchup found

  // const { playType } = body;

  // let playResult;
  // switch (playType) {
  //   case PLAY_TYPE.PASS:
  //     playResult = passPlay();
  //     break;
  //   case PLAY_TYPE.RUSH:
  //     playResult = rushPlay();
  //     break;
  //   default:
  // }

  // console.log(playResult);

  res.status(200).json({
    // play: playResult,
  });
}
