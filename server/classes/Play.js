import {
  PLAY_TYPE,
  SCORE_TYPE,
  STATE,
  TURNOVER_TYPE,
} from '@shared/constants';

import {
  randomWithinInterval,
  getActualYardline,
  getTerritoryYardline,
} from '@shared/utilities';

export default class Play {
  ballSpot = 0;
  distanceToGoal = 0;
  down = 1;
  gain = 0;
  quarter = 1;
  scrimmageLine = 0;
  yardsToGo = 0;
  description = '';
  penaltyType = '';
  scoreType = '';
  scoringTeam = '';
  startClockTime = '';
  teamId = '';
  turnoverType = '';
  type = '';
  big = false;
  firstDown = false;
  goalToGo = false;
  redZone = false;
  matchup = null;
  stats = [];

  constructor(matchup, type) {
    this.matchup = matchup;
    this.down = matchup.down;
    this.teamId = matchup.offensiveTeam;
    this.goalToGo = matchup.goalToGo;
    this.redZone = matchup.redZone;
    this.type = type;

    const notKick =
      type === PLAY_TYPE.PASS || type === PLAY_TYPE.RUSH;
    if (matchup.state === STATE.TOUCHDOWN && notKick) {
      this.yardsToGo = 2;
    } else {
      this.yardsToGo = 15;
    }

    const scrimmageLine = getActualYardline(matchup);
    this.scrimmageLine = scrimmageLine;
    this.distanceToGoal = 100 - scrimmageLine;

    this.#run();
  }

  #run() {
    let playResult;
    switch (this.type) {
      case PLAY_TYPE.EXTRA_POINT:
        playResult = this.#runExtraPointKick();
        break;
      case PLAY_TYPE.PASS:
        playResult = this.#runPass();
        break;
      case PLAY_TYPE.RUSH:
        playResult = this.#runRush();
        break;
      default:
    }
    const { action, gain = 0 } = playResult;
    this.gain = gain;

    if (gain >= this.yardsToGo) {
      this.firstDown = true;
    }

    if (gain >= this.distanceToGoal) {
      this.scoreType = SCORE_TYPE.TOUCHDOWN;
    }

    if (this.down === 4 && !this.firstDown) {
      this.turnoverType = TURNOVER_TYPE.DOWNS;
    }

    this.ballSpot = this.scrimmageLine + gain;

    const territoryBallSpot = getTerritoryYardline(
      this.scrimmageLine + gain,
      this.matchup
    );
    this.description = `${action} to ${territoryBallSpot} for ${gain} yards`;
  }

  #runExtraPointKick() {
    let success = calculateSuccess(80);
    let action = '[K] extra point is';
    if (success) {
      action += ' GOOD';
    } else {
      action += ' NO GOOD';
    }
    return { action };
  }

  #runPass() {
    let success = calculateSuccess(55);
    let gain = 0;
    let action = '[QB] pass';

    if (success) {
      gain = randomWithinInterval(
        3,
        Math.min(15, this.distanceToGoal)
      );
    } else {
      action += ' incomplete';
    }

    return { action, gain };
  }

  #runRush() {
    let success = calculateSuccess(75);
    let gain = 0;
    let action = 'up the middle';

    if (success) {
      gain = randomWithinInterval(
        1,
        Math.min(10, this.distanceToGoal)
      );
    } else {
      gain = randomWithinInterval(0, 5) * -1;
    }

    return { action, gain };
  }

  serialize() {
    const scrimmageLine = getTerritoryYardline(
      this.scrimmageLine,
      this.matchup
    );
    const ballSpot = getTerritoryYardline(
      this.scrimmageLine + this.gain,
      this.matchup
    );

    return {
      down: this.down,
      gain: this.gain,
      description: this.description,
      ballSpot,
      scrimmageLine,
      startClockTime: this.startClockTime,
      teamId: this.teamId,
      type: this.type,
      penaltyType: this.penaltyType,
      scoreType: this.scoreType,
      turnoverType: this.turnoverType,
      matchupId: this.matchup._id,
      big: this.big,
      firstDown: this.firstDown,
      goalToGo: this.goalToGo,
      redZone: this.redZone,
      stats: this.stats,
    };
  }
}
