import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', port, mongodb: mongoUri });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB at', mongoUri))
  .catch((err) => console.error('MongoDB connection error:', err));
