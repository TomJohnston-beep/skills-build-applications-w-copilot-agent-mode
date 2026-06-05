import mongoose, { Document } from 'mongoose';

export interface ActivityDoc extends Document {
  type: string;
  durationMinutes: number;
  calories: number;
  userId: mongoose.Types.ObjectId;
  performedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDoc>(
  {
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    performedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Activity || mongoose.model<ActivityDoc>('Activity', activitySchema);
