import { Router } from 'express';
import { body, validationResult } from 'express-validator';
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

router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('memberIds').optional().isArray(),
    body('wins').optional().isInt(),
    body('description').optional().isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newTeam = await Team.create(req.body);
      res.status(201).json(newTeam);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create team', details: error instanceof Error ? error.message : String(error) });
    }
  }
);

export default router;
