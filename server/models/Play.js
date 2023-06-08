import mongoose from "mongoose";

const PlaySchema = new mongoose.Schema({
  down: Number,
  gain: Number,
  quarter: Number,
  yardsToGo: Number,
  ballSpot: String,
  description: String,
  lineToGain: String,
  penaltyType: String,
  scoreType: String,
  scrimmageLine: String,
  startClockTime: String,
  stopClockTime: String,
  turnoverType: String,
  teamId: String,
  firstDown: Boolean,
  goalToGo: Boolean,
  big: Boolean,
  redZone: Boolean,
  type: { type: String },
  stats: [],
});

export default mongoose.models.Play ||
  mongoose.model("Play", PlaySchema);
