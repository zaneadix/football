import Link from 'next/link';
import Team from '@models/Team';

async function getTeams() {
  const teams = await Team.find({});
  return teams;
}

export default async function League() {
  const teams = await getTeams();
  return (
    <>
      <h3>Teams</h3>
      <ul>
        {teams.map(team => {
          return (
            <li key={team._id}>
              <Link href={`/team/${team._id}`}>{team.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
