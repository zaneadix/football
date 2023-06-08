import mongoose from 'mongoose';

import Team from './Team';

const PlaySchema = new mongoose.Schema({
  down: Number,
  gain: Number,
  quarter: Number,
  yardsToGo: Number,
  ballSpot: String,
  description: String,
  penaltyType: String,
  scoreType: String,
  scoringTeam: String,
  scrimmageLine: String,
  startClockTime: String,
  stopClockTime: String,
  turnoverType: String,
  teamId: String,
  big: Boolean,
  firstDown: Boolean,
  goalToGo: Boolean,
  redZone: Boolean,
  type: { type: String },
  stats: [],
});

const DriveSchema = new mongoose.Schema({
  netYards: Number,
  playCount: Number,
  teamId: String,
  timeOfPossession: String,
  plays: [PlaySchema],
});

const ScoreSchema = new mongoose.Schema({
  q1: Number,
  q2: Number,
  q3: Number,
  q4: Number,
  overtime: Number,
  total: Number,
});

const MatchupSchema = new mongoose.Schema(
  {
    down: Number,
    quarter: Number,
    yardsToGo: Number,
    defensiveTeam: String,
    gameClock: String,
    offensiveTeam: String,
    phase: String,
    scrimmageLine: String,
    state: String,
    goalToGo: Boolean,
    redZone: Boolean,
    homeTeam: { type: String, ref: Team.modelName },
    visitingTeam: { type: String, ref: Team.modelName },
    homePoints: ScoreSchema,
    visitingPoints: ScoreSchema,
    drives: [DriveSchema],
  },
  {
    methods: {},
    statics: {
      populateById(matchupId) {
        return mongoose
          .model('Matchup')
          .findById(matchupId)
          .populate('homeTeam')
          .populate('visitingTeam')
          .exec();
      },
    },
  }
);

export default mongoose.models.Matchup ||
  mongoose.model('Matchup', MatchupSchema);
