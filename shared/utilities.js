const EZ = 'EZ';

export const calculateSuccess = (percentage = 100) => {
  return Math.ceil(Math.random() * 100) <= percentage;
};

export const getActualYardline = (matchup) => {
  const { scrimmageLine, defensiveTeam } = matchup;
  if (scrimmageLine === EZ) {
    return 0;
  }
  if (scrimmageLine === '50') {
    return 50;
  }

  let [territory, yardline] = scrimmageLine.split(' ');
  yardline = parseInt(yardline);

  if (territory === defensiveTeam) {
    yardline = 100 - yardline;
  }
  return yardline;
};

export const getTerritoryYardline = (yardline, matchup) => {
  if (yardline === 50) {
    return '50';
  }
  const { offensiveTeam, defensiveTeam } = matchup;
  const territory =
    yardline < 50 ? offensiveTeam : defensiveTeam;

  if (yardline <= 0 || yardline >= 100) {
    return `${territory} ${EZ}`;
  }

  if (territory === offensiveTeam) {
    return `${territory} ${yardline}`;
  }
  return `${territory} ${100 - yardline}`;
};

export const randomWithinInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
