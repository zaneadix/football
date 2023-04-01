import MatchupPage from '@components/MatchupPage/MatchupPage';
// import MatchupBanner from '@components/MatchupPage/MatchupBanner';
import Matchup from '@models/Matchup';

const getMatchup = async matchupId => {
  const matchup = await Matchup.findById(matchupId).populate('homeTeam').populate('visitingTeam').exec();
  // const matchup = await Matchup.populateMatchup(matchupId);
  return JSON.parse(JSON.stringify(matchup));
};

export default async ({ params }) => {
  const matchup = await getMatchup(params.matchupId);

  return <MatchupPage matchup={matchup}></MatchupPage>;
};
