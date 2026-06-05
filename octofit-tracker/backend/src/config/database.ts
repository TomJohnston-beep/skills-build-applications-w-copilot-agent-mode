import mongoose from 'mongoose';

export const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase() {
  return mongoose.connect(mongoUri);
}

export default mongoose;
