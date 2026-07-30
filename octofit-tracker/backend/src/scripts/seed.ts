import mongoose from 'mongoose';

import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      {
        name: 'North Shore Ninjas',
        city: 'Seattle',
        coach: 'Maya Chen',
        memberCount: 12,
        weeklyGoalMinutes: 2400,
      },
      {
        name: 'Trail Blazers',
        city: 'Boulder',
        coach: 'Jordan Patel',
        memberCount: 9,
        weeklyGoalMinutes: 1800,
      },
      {
        name: 'Core Crushers',
        city: 'Austin',
        coach: 'Sam Rivera',
        memberCount: 15,
        weeklyGoalMinutes: 3000,
      },
    ]);

    await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex.runner@example.com',
        fullName: 'Alex Morgan',
        role: 'athlete',
        teamName: 'North Shore Ninjas',
        age: 29,
        fitnessGoal: 'Run a sub-45 minute 10K',
      },
      {
        username: 'priya_pedals',
        email: 'priya.pedals@example.com',
        fullName: 'Priya Shah',
        role: 'athlete',
        teamName: 'Trail Blazers',
        age: 34,
        fitnessGoal: 'Build cycling endurance for a century ride',
      },
      {
        username: 'marcus_lifts',
        email: 'marcus.lifts@example.com',
        fullName: 'Marcus Johnson',
        role: 'athlete',
        teamName: 'Core Crushers',
        age: 41,
        fitnessGoal: 'Increase compound lift totals by 15%',
      },
      {
        username: 'maya_coach',
        email: 'maya.chen@example.com',
        fullName: 'Maya Chen',
        role: 'coach',
        teamName: 'North Shore Ninjas',
        age: 37,
        fitnessGoal: 'Keep team weekly consistency above 90%',
      },
    ]);

    await Activity.insertMany([
      {
        userName: 'Alex Morgan',
        type: 'run',
        durationMinutes: 48,
        distanceMiles: 5.8,
        caloriesBurned: 610,
        activityDate: new Date('2026-07-27T07:30:00Z'),
      },
      {
        userName: 'Priya Shah',
        type: 'cycle',
        durationMinutes: 92,
        distanceMiles: 26.4,
        caloriesBurned: 870,
        activityDate: new Date('2026-07-28T13:15:00Z'),
      },
      {
        userName: 'Marcus Johnson',
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 430,
        activityDate: new Date('2026-07-29T18:00:00Z'),
      },
      {
        userName: 'Maya Chen',
        type: 'yoga',
        durationMinutes: 40,
        caloriesBurned: 180,
        activityDate: new Date('2026-07-30T06:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userName: 'Priya Shah',
        teamName: 'Trail Blazers',
        points: 1280,
        rank: 1,
        activityMinutes: 325,
      },
      {
        userName: 'Alex Morgan',
        teamName: 'North Shore Ninjas',
        points: 1165,
        rank: 2,
        activityMinutes: 288,
      },
      {
        userName: 'Marcus Johnson',
        teamName: 'Core Crushers',
        points: 1040,
        rank: 3,
        activityMinutes: 250,
      },
      {
        userName: 'Maya Chen',
        teamName: 'North Shore Ninjas',
        points: 910,
        rank: 4,
        activityMinutes: 220,
      },
    ]);

    await Workout.insertMany([
      {
        title: '10K Tempo Builder',
        focusArea: 'Running endurance',
        difficulty: 'intermediate',
        durationMinutes: 45,
        recommendedFor: 'Runners improving race pace',
        exercises: ['10 minute warmup jog', '3 x 8 minute tempo intervals', '5 minute cooldown'],
      },
      {
        title: 'Cycling Climb Intervals',
        focusArea: 'Cycling power',
        difficulty: 'advanced',
        durationMinutes: 60,
        recommendedFor: 'Cyclists training for hilly rides',
        exercises: ['15 minute spin warmup', '6 x 4 minute hill efforts', '10 minute easy spin'],
      },
      {
        title: 'Foundational Strength Circuit',
        focusArea: 'Full-body strength',
        difficulty: 'beginner',
        durationMinutes: 35,
        recommendedFor: 'Athletes building consistent strength habits',
        exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Plank holds'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
