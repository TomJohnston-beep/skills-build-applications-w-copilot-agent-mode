import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users', details: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
