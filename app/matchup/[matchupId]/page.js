import MatchupPage from '@client/components/matchup/MatchupPage';
import Matchup from '@models/Matchup';

const getMatchup = async matchupId => {
  const matchup = await Matchup.populateById(matchupId);
  return JSON.parse(JSON.stringify(matchup));
};

export default async ({ params }) => {
  const matchup = await getMatchup(params.matchupId);

  return <MatchupPage matchup={matchup}></MatchupPage>;
};
