// src/App.tsx
import React, { useMemo, useState } from "react";
import { AppState, Habit } from "./types";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function todayKey(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function uid() {
  return crypto.randomUUID();
}

export default function App() {
  const [state, setState] = useLocalStorageState<AppState>("habit-tracker:v1", {
    habits: [],
    logs: {}
  });

  const [newHabit, setNewHabit] = useState("");
  const dateKey = todayKey();

  const todayCheckedCount = useMemo(() => {
    const map = state.logs[dateKey] ?? {};
    return Object.keys(map).length;
  }, [state.logs, dateKey]);

  const completionRate = useMemo(() => {
    if (state.habits.length === 0) return 0;
    return Math.round((todayCheckedCount / state.habits.length) * 100);
  }, [todayCheckedCount, state.habits.length]);

  const addHabit = () => {
    const name = newHabit.trim();
    if (!name) return;
    const habit: Habit = { id: uid(), name, createdAt: Date.now() };
    setState((prev) => ({ ...prev, habits: [habit, ...prev.habits] }));
    setNewHabit("");
  };

  const removeHabit = (id: string) => {
    setState((prev) => {
      const habits = prev.habits.filter((h) => h.id !== id);
      // logs에서도 제거
      const logs = { ...prev.logs };
      for (const dk of Object.keys(logs)) {
        if (logs[dk]?.[id]) {
          const copy = { ...logs[dk] };
          delete copy[id];
          logs[dk] = copy;
        }
      }
      return { habits, logs };
    });
  };

  const toggleCheck = (habitId: string) => {
    setState((prev) => {
      const day = prev.logs[dateKey] ?? {};
      const nextDay = { ...day };
      if (nextDay[habitId]) delete nextDay[habitId];
      else nextDay[habitId] = true;

      return { ...prev, logs: { ...prev.logs, [dateKey]: nextDay } };
    });
  };

  return (
    <div className="wrap">
      <header className="header">
        <h1>Habit Tracker</h1>
        <div className="meta">
          <span className="pill">{dateKey}</span>
          <span className="pill">
            오늘 달성률: <b>{completionRate}%</b>
          </span>
        </div>
      </header>

      <section className="card">
        <h2>습관 추가</h2>
        <div className="row">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="예) 물 2L 마시기"
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
          />
          <button onClick={addHabit}>추가</button>
        </div>
      </section>

      <section className="card">
        <h2>오늘 체크</h2>
        {state.habits.length === 0 ? (
          <p className="muted">습관을 먼저 추가해줘!</p>
        ) : (
          <ul className="list">
            {state.habits.map((h) => {
              const checked = !!state.logs[dateKey]?.[h.id];
              return (
                <li key={h.id} className="item">
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCheck(h.id)}
                    />
                    <span className={checked ? "done" : ""}>{h.name}</span>
                  </label>
                  <button className="danger" onClick={() => removeHabit(h.id)}>
                    삭제
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <footer className="footer">
        <small className="muted">
          localStorage에 저장됩니다 (DB 연동 없음).
        </small>
      </footer>
    </div>
  );
}