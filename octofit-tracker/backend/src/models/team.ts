import mongoose, { Document } from 'mongoose';

export interface TeamDoc extends Document {
  name: string;
  memberIds: mongoose.Types.ObjectId[];
  wins: number;
  description: string;
}

const teamSchema = new mongoose.Schema<TeamDoc>(
  {
    name: { type: String, required: true },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    wins: { type: Number, default: 0 },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model<TeamDoc>('Team', teamSchema);
