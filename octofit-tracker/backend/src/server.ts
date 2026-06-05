import express from 'express';
import cors from 'cors';
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

// Configure CORS to allow frontend dev server and Codespaces URL when present
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (codespacesApiUrl) {
  allowedOrigins.push(codespacesApiUrl);
}

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: Origin not allowed'));
  }
}));

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    port,
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

export default app;
export { apiBaseUrl, codespaceName, codespacesApiUrl, port };
