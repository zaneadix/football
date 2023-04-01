// import { ObjectId } from 'mongodb';

import connectToDatabase from '@server/database';
import Matchup from '@server/models/Matchup';

import MatchupPage from '@client/components/MatchupPage/MatchupPage';

export default ({ matchup }) => {
  return <MatchupPage matchup={matchup} />;
};

export async function getServerSideProps(context) {
  const { matchupId } = context.query;

  await connectToDatabase();

  let matchup = await Matchup.findById(matchupId).populate('homeTeam').populate('visitingTeam').exec();

  // let matchup = await db
  //   .collection('matchups')
  //   .aggregate([
  //     { $match: { _id: new ObjectId(matchupId) } },
  //     { $lookup: { from: 'teams', localField: 'homeTeam', foreignField: '_id', as: 'homeTeam' } },
  //     { $lookup: { from: 'teams', localField: 'visitingTeam', foreignField: '_id', as: 'visitingTeam' } },
  //     { $unwind: { path: '$homeTeam' } },
  //     { $unwind: { path: '$visitingTeam' } },
  //     {
  //       $set: {
  //         id: '$_id',
  //         'homeTeam.id': '$homeTeam._id',
  //         'visitingTeam.id': '$visitingTeam._id',
  //       },
  //     },
  //     { $unset: ['_id', 'homeTeam._id', 'visitingTeam._id'] },
  //   ])
  //   .tryNext();

  matchup = JSON.parse(JSON.stringify(matchup));

  return {
    props: {
      matchup,
    },
  };
}
