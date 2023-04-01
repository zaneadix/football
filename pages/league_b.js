import Link from 'next/link';

import connectToDatabase from '@server/database';
import Team from '@models/Team';

export default function League({ prerender }) {
  const { teams } = prerender;
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

export async function getServerSideProps() {
  await connectToDatabase();
  const teams = await Team.find({});

  return {
    props: {
      prerender: {
        teams: JSON.parse(JSON.stringify(teams)),
      },
    },
  };
}
