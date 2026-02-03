// src/types.ts
export type Habit = {
  id: string;
  name: string;
  createdAt: number;
};

export type HabitLog = Record<string, Record<string, true>>;
// HabitLog[dateKey][habitId] = true

export type AppState = {
  habits: Habit[];
  logs: HabitLog;
};