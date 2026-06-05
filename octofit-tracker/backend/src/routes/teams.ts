import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams', details: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team', details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
