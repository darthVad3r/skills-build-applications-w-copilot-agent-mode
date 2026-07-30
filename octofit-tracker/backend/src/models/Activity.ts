import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  userName: string;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
  caloriesBurned: number;
  activityDate: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, required: false },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);