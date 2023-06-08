import Team from '@models/Team';
import TeamPage from '@components/TeamPage';

const getTeam = async teamId => {
  const matchup = await Team.findById(teamId).exec();
  return JSON.parse(JSON.stringify(matchup));
};

export default async ({ params }) => {
  const team = await getTeam(params.teamId);

  return <TeamPage team={team}></TeamPage>;
};
