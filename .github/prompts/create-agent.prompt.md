---
mode: 'agent'
model: GPT-5.5
description: 'Bootstrap the OctoFit Tracker multi-tier application using GitHub Copilot agent mode'
---

Create or update the OctoFit Tracker application in the workspace.

Requirements:

1. Do not change directories; use path-qualified commands.
2. Scaffold the multi-tier app under `octofit-tracker/`.
3. Create the backend in `octofit-tracker/backend` with Express, TypeScript, Mongoose, and API routes for users, teams, activities, leaderboard, and workouts.
4. Create the frontend in `octofit-tracker/frontend` with React 19, Vite, react-router-dom, and Bootstrap.
5. Configure MongoDB connection to `mongodb://localhost:27017/octofit_db` and use `octofit_db`.
6. Keep ports `8000`, `5173`, and `27017` consistent with the project expectations.
7. Include scripts for building, developing, and starting both frontend and backend.
8. Add a seed script at `octofit-tracker/backend/src/scripts/seed.ts` to populate realistic test data.
9. Add a short note in the prompt file explaining how to rerun `/create-agent`.
