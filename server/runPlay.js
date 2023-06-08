import Play from '@server/classes/Play';
import Matchup from '@server/models/Matchup';
import { getTerritoryYardline } from '@shared/utilities';
import {
  QUARTERS,
  SCORE_TYPE,
  STATE,
} from '@shared/constants';

export default async (matchupId, playType) => {
  const matchup = await Matchup.populateById(matchupId);

  const currentDrive = matchup.drives.at(-1);

  const play = new Play(matchup, playType);
  const serializedPlay = play.serialize();
  currentDrive.plays.push(serializedPlay);
  currentDrive.playCount++; //account for penalties without loss of down?
  currentDrive.netYards += play.gain;

  if (play.scoreType) {
    handleScore(matchup, play);
    handleExchange(matchup, play);
    matchup.scrimmageLine = getTerritoryYardline(
      20,
      matchup
    );
  } else {
    if (play.turnoverType) {
      handleTurnover(matchup, play);
    } else if (play.firstDown) {
      handleFirstDown(matchup, play);
    } else {
      handleDown(matchup, play);
    }
    matchup.scrimmageLine = serializedPlay.ballSpot;
  }

  setState(matchup, play);

  await matchup.save();
};

const handleScore = (matchup, play) => {
  const { quarter, scoreType, scoringTeam } = play;
  const { homeTeam, homePoints, visitingPoints } = matchup;
  const pointKey = QUARTERS[quarter];
  const pointSet =
    scoringTeam === homeTeam._id
      ? homePoints
      : visitingPoints;

  let pointValue = 0;
  switch (scoreType) {
    case SCORE_TYPE.EXTRA_POINT:
      pointValue = 1;
    case SCORE_TYPE.CONVERSION:
    case SCORE_TYPE.SAFETY:
      pointValue = 2;
      break;
    case SCORE_TYPE.FIELD_GOAL:
      pointValue = 3;
      break;
    case SCORE_TYPE.TOUCHDOWN:
      pointValue = 6;
      break;
  }

  pointSet[pointKey] += pointValue;
  pointSet.Total += pointValue;
};

const handleDown = (matchup, play) => {
  matchup.down++;
  matchup.yardsToGo -= play.gain;
  setProgressions(matchup, play);
};

const handleFirstDown = (matchup, play) => {
  matchup.down = 1;
  setYardsToGo(matchup, play);
  setProgressions(matchup, play);
};

//temporary till kickoffs are added
const handleExchange = (matchup, play) => {
  matchup.down = 1;
  setYardsToGo(matchup, play, 20);
  swapTeams(matchup, play);
  setProgressions(matchup, play);
};

const handleTurnover = (matchup, play) => {
  matchup.down = 1;
  setYardsToGo(matchup, play);
  swapTeams(matchup, play);
  setProgressions(matchup, play);
};

const swapTeams = (matchup) => {
  const defensiveTeam = matchup.defensiveTeam;
  matchup.defensiveTeam = matchup.offensiveTeam;
  matchup.offensiveTeam = defensiveTeam;
  matchup.drives.push({
    netYards: 0,
    playCount: 0,
    teamId: matchup.offensiveTeam,
    timeOfPossession: '0:00',
    plays: [],
  });
};

const setYardsToGo = (matchup, play, from) => {
  const scrimmageLine = from || play.scrimmageLine;
  matchup.yardsToGo = Math.min(10, 100 - scrimmageLine);
};

const setProgressions = (matchup, play) => {
  if (play.scrimmageLine >= 80) {
    matchup.redZone = true;
  }
  if (100 - matchup.yardsToGo === play.scrimmageLine) {
    matchup.goalToGo = true;
  }
};

const setState = (matchup, play) => {
  if (play.scoreType) {
    switch (play.scoreType) {
      case SCORE_TYPE.TOUCHDOWN:
        matchup.state = STATE.TOUCHDOWN;
        break;
      case SCORE_TYPE.EXTRA_POINT:
      case SCORE_TYPE.CONVERSION:
        matchup.state = STATE.END_POSSESSION;
        break;
    }
  } else if (play.turnoverType) {
    matchup.state = STATE.TURNOVER;
  } else if (matchup.down === 4) {
    matchup.state = STATE.FOURTH_DOWN;
  } else {
    matchup.state = STATE.DOWN;
  }
};
