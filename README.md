<img width="798" height="394" alt="image" src="https://github.com/user-attachments/assets/eb00bc8c-f2b9-4cfa-91b2-533cc5b26301" />

[Habit Tracker] 
1. 제작목적
   - 매일 반복되는 습관을 기록하고 체크할 수 있는 간단한 도구를 만들며, 프론트엔드의 기본인 CRUD 흐름(추가/조회/수정/삭제) 과 상태 관리를 연습하기 위함
   - 날짜별로 완료 여부를 누적해 사용자에게 성취감과 동기부여를 주는 화면 구성을 목표로 했고, DB 없이도 데이터를 유지할 수 있도록 localStorage 기반 저장을 적용
   - 이를 통해 “UI 입력 → 상태 업데이트 → 화면 반영 → 저장”으로 이어지는 데이터 흐름을 정확히 이해하는 데 집중함

2. 포인트
  - CRUD (습관 추가/삭제/체크)
  - 날짜별 체크 기록
  - localStorage 저장
  - TypeScript 타입 설계 연습

3. 폴더 구조
   habit-tracker/
 ├─ package.json
 ├─ vite.config.ts
 ├─ tsconfig.json
 ├─ index.html
 └─ src/
    ├─ main.tsx
    ├─ App.tsx
    ├─ types.ts
    ├─ storage.ts
    ├─ hooks/useLocalStorageState.ts
    └─ styles.css
