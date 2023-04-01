import Team from '@models/Team';

export default ({ prerender }) => {
  const { team } = prerender;
  return (
    <>
      <h3>{team.name}</h3>
    </>
  );
};

export async function getServerSideProps(context) {
  const teamId = context.query.teamId;

  const team = await Team.findById(teamId);

  return {
    props: {
      prerender: {
        team: JSON.parse(JSON.stringify(team)),
      },
    },
  };
}
