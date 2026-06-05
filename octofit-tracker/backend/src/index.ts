import { connectToDatabase, mongoUri } from './config/database';
import app, { port, apiBaseUrl, codespacesApiUrl } from './server';

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);

    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
      if (codespacesApiUrl) {
        console.log(`Codespaces API URL: ${codespacesApiUrl}`);
      }
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
