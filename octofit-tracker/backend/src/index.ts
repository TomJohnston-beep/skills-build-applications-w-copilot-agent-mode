import express from 'express';
import { connectToDatabase, mongoUri } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const codespacesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : null;
const apiBaseUrl = codespacesApiUrl || `http://localhost:${port}`;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    port,
    mongodb: mongoUri,
    apiBaseUrl,
    codespaceName: codespaceName || null
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
  if (codespacesApiUrl) {
    console.log(`Codespaces API URL: ${codespacesApiUrl}`);
  }
});

connectToDatabase()
  .then(() => console.log('Connected to MongoDB at', mongoUri))
  .catch((err) => console.error('MongoDB connection error:', err));
