import mongoose, { Document } from 'mongoose';

export interface LeaderboardDoc extends Document {
  position: number;
  team: string;
  score: number;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDoc>(
  {
    position: { type: Number, required: true },
    team: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Leaderboard || mongoose.model<LeaderboardDoc>('Leaderboard', leaderboardSchema);
