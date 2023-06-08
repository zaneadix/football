import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  _id: String,
  abbreviatedName: String,
  location: String,
  name: String,
  logo: String,
  primaryColor: String,
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
