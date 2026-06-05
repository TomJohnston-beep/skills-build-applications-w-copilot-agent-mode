import mongoose, { Document } from 'mongoose';

export interface WorkoutDoc extends Document {
  name: string;
  durationMinutes: number;
  difficulty: string;
  description: string;
}

const workoutSchema = new mongoose.Schema<WorkoutDoc>(
  {
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.models.Workout || mongoose.model<WorkoutDoc>('Workout', workoutSchema);
