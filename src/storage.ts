// src/storage.ts
import { AppState } from "./types";

const KEY = "habit-tracker:v1";

export function loadState(): AppState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { habits: [], logs: {} };
  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return { habits: [], logs: {} };
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}