import { Router } from 'express';

import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.status(200).json({ teams });
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 });
    res.status(200).json({ activities });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.status(200).json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.status(200).json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default router;