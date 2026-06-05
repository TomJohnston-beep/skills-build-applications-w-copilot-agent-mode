import { connectToDatabase, mongoUri } from './config/database';
import './server';

connectToDatabase()
  .then(() => console.log('Connected to MongoDB at', mongoUri))
  .catch((err) => console.error('MongoDB connection error:', err));
