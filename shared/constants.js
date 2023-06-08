export const SOCKET_EVENTS = Object.freeze({
  CONNECT: 'connect',
  MATCHUP_SUBSCRIBE: 'matchup-subscribe',
  MATCHUP_UPDATE: 'matchup-update',
});

export const PLAY_TYPE = Object.freeze({
  EXTRA_POINT: 'EXTRA POINT',
  FIELD_GOAL: 'FIELD GOAL',
  KICK_OFF: 'KICK OFF',
  PASS: 'PASS',
  PUNT: 'PUNT',
  RUSH: 'RUSH',
});

export const SCORE_TYPE = Object.freeze({
  CONVERSION: 'CONVERSION',
  EXTRA_POINT: 'EXTRA POINT',
  FIELD_GOAL: 'FIELD GOAL',
  SAFETY: 'SAFETY',
  TOUCHDOWN: 'TOUCHDOWN',
});

export const TURNOVER_TYPE = Object.freeze({
  DOWNS: 'DOWNS',
  FUMBLE: 'FUMBLE',
  INTERCEPTION: 'INTERCEPTION',
});

export const STATE = Object.freeze({
  DOWN: 'DOWN',
  FOURTH_DOWN: 'FOURTH DOWN',
  END_POSSESSION: 'END POSSESSION',
  END_HALF: 'END HALF',
  SAFETY: 'SAFETY',
  TOUCHBACK: 'TOUCHBACK',
  TOUCHDOWN: 'TOUCHDOWN',
  TURNOVER: 'TURNOVER',
});

// definitely need to make this logic based
export const OFFENSIVE_PLAY_SETS = Object.freeze({
  [STATE.DOWN]: [PLAY_TYPE.PASS, PLAY_TYPE.RUSH],
  [STATE.FOURTH_DOWN]: [
    PLAY_TYPE.PASS,
    PLAY_TYPE.RUSH,
    PLAY_TYPE.FIELD_GOAL,
    PLAY_TYPE.PUNT,
  ],
  [STATE.TOUCHDOWN]: [
    PLAY_TYPE.EXTRA_POINT,
    PLAY_TYPE.PASS,
    PLAY_TYPE.RUSH,
  ],
  [STATE.END_POSSESSION]: [
    PLAY_TYPE.EXTRA_POINT,
    PLAY_TYPE.PASS,
    PLAY_TYPE.RUSH,
  ],
});

export const QUARTERS = Object.freeze([
  'q1',
  'q2',
  'q3',
  'q4',
  'overtime',
]);
