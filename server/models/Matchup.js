import mongoose from 'mongoose';

import Team from './Team.js';

const MatchupSchema = new mongoose.Schema(
  {
    homeTeam: { type: String, ref: 'Team' },
    homePoints: {
      q1: Number,
      q2: Number,
      q3: Number,
      q4: Number,
      overtime: Number,
      total: Number,
    },
    visitingTeam: { type: String, ref: 'Team' },
    visitingPoints: {
      q1: Number,
      q2: Number,
      q3: Number,
      q4: Number,
      overtime: Number,
      total: Number,
    },
    phase: String,
    drives: [
      {
        netYards: Number,
        playCount: Number,
        // teamId: String,
        timeOfPossession: String,
        plays: [
          {
            description: String,
            down: Number,
            stopClockTime: String,
            endYardLine: String,
            firstDown: Boolean,
            goalToGo: Boolean,
            big: Boolean,
            lineToGain: String,
            penaltyType: String,
            scoreType: String,
            turnoverType: String,
            startClockTime: String,
            startYardLine: String,
            // stats: [],
            teamId: String,
            type: { type: String },
          },
        ],
      },
    ],
  },
  {
    methods: {
      populateMatchup() {
        return mongoose.model('Matchup').findById(matchupId).populate('homeTeam').populate('visitingTeam').exec();
      },
    },
  },
);

module.exports = mongoose.models.Matchup || mongoose.model('Matchup', MatchupSchema);
