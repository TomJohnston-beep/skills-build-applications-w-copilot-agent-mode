import mongoose, { Document } from 'mongoose';

export interface UserDoc extends Document {
  name: string;
  email: string;
  team: string;
  role: string;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    role: { type: String, default: 'member' }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);
