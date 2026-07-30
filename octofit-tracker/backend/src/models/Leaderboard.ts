import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  userName: string;
  teamName: string;
  points: number;
  rank: number;
  activityMinutes: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true, unique: true },
    activityMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
