import { Schema, model } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  fullName: string;
  role: 'athlete' | 'coach' | 'admin';
  teamName: string;
  age: number;
  fitnessGoal: string;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
    teamName: { type: String, required: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);
