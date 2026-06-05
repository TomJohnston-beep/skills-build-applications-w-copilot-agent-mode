/* Seed the octofit_db database with test data */
import mongoose, { connectToDatabase, mongoUri } from '../config/database';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();
  console.log('Connected to MongoDB for seed:', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Alex Morgan', email: 'alex.morgan@example.com', team: 'Velocity' },
    { name: 'Jordan Lee', email: 'jordan.lee@example.com', team: 'Pulse' },
    { name: 'Taylor Kim', email: 'taylor.kim@example.com', team: 'Velocity' }
  ]);

  const teams = await Team.create([
    { name: 'Velocity', memberIds: [users[0]._id, users[2]._id], wins: 8, description: 'High-performance speed and endurance team.' },
    { name: 'Pulse', memberIds: [users[1]._id], wins: 5, description: 'Strong focus on consistency and recovery.' }
  ]);

  await Activity.create([
    { type: 'Run', durationMinutes: 42, calories: 410, userId: users[0]._id },
    { type: 'Strength Training', durationMinutes: 55, calories: 520, userId: users[2]._id },
    { type: 'Yoga', durationMinutes: 60, calories: 210, userId: users[1]._id }
  ]);

  await Leaderboard.create([
    { position: 1, team: teams[0].name, score: 980 },
    { position: 2, team: teams[1].name, score: 860 }
  ]);

  await Workout.create([
    { name: 'Full Body Blast', durationMinutes: 50, difficulty: 'Intermediate', description: 'A balanced full-body workout for strength and endurance.' },
    { name: 'Recovery Stretch', durationMinutes: 30, difficulty: 'Beginner', description: 'A gentle stretch flow to accelerate recovery.' }
  ]);

  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments()
  ]);

  console.log('Seed complete:');
  console.log(`  users: ${userCount}`);
  console.log(`  teams: ${teamCount}`);
  console.log(`  activities: ${activityCount}`);
  console.log(`  leaderboard entries: ${leaderboardCount}`);
  console.log(`  workouts: ${workoutCount}`);

  await mongoose.disconnect();
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });
