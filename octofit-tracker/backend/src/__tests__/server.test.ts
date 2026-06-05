import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../models/user', () => ({
  default: {
    find: vi.fn().mockResolvedValue([{ _id: '1', name: 'Alice', email: 'alice@example.com', team: 'Team A', role: 'member' }]),
    create: vi.fn().mockImplementation((body) => Promise.resolve({ ...body, _id: '2' }))
  }
}));

vi.mock('../models/activity', () => ({
  default: {
    find: vi.fn().mockResolvedValue([{ _id: '1', type: 'running', durationMinutes: 30, calories: 250, userId: '1' }]),
    create: vi.fn().mockImplementation((body) => Promise.resolve({ ...body, _id: '2' }))
  }
}));

vi.mock('../models/team', () => ({
  default: {
    find: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockImplementation((body) => Promise.resolve({ ...body, _id: '2' }))
  }
}));

const users = [{ _id: '1', name: 'Alice', email: 'alice@example.com', team: 'Team A', role: 'member' }];
const activities = [{ _id: '1', type: 'running', durationMinutes: 30, calories: 250, userId: '1' }];

vi.mock('../models/leaderboard', () => ({
  default: {
    find: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockImplementation((body) => Promise.resolve({ ...body, _id: '2' }))
  }
}));

vi.mock('../models/workout', () => ({
  default: {
    find: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockImplementation((body) => Promise.resolve({ ...body, _id: '2' }))
  }
}));

import app from '../server';

describe('backend API routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns health information', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status: 'ok', port: expect.any(Number), apiBaseUrl: expect.any(String) }));
  });

  it('returns users on GET /api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
  });

  it('returns validation error for invalid POST /api/users', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: '', email: 'not-an-email', team: '' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('returns activities on GET /api/activities', async () => {
    const response = await request(app).get('/api/activities');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(activities);
  });
});
