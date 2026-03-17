# CLAUDE.md — Context for Claude Code

This file provides architectural context and conventions for this codebase.

---

## Project Overview

**MathQuest** is an offline-first, gamified math learning app for teens (12+) built with Expo (React Native). It covers Algebra, Geometry, Statistics, and Trigonometry across 80 interactive levels.

---

## Architecture Decisions

### Offline-First with SQLite
All game data is stored locally in `expo-sqlite`. The app works 100% without internet. When the user is online and logged in, `lib/db/sync.ts` pushes unsynced rows to Supabase. Every table that syncs has a `synced INTEGER DEFAULT 0` column (0 = pending, 1 = done).

### Guest vs. Logged-In User
- Guest user ID is the string `'guest'` in all SQLite tables.
- Logged-in user ID is the Clerk `userId` string (format: `user_xxx`).
- `useProgress.ts` abstracts this: callers don't need to know if the user is a guest.
- On first sign-in, `lib/db/sync.ts` `migrateGuestProgress()` merges the guest SQLite rows → Supabase, then updates the local rows to use the real `userId`.

### Procedural Question Generation
Questions are NOT stored as a static database. `lib/game-engine/questionGenerator.ts` generates `Question` objects from generator functions in `content/[topic]/questions.ts`. Each generator accepts a `difficulty: 1-5` parameter and picks random values within a safe range. This keeps the game fresh on replays.

### Game State Machine
`hooks/useGameSession.ts` is the heart of the game. It is a state machine with these states:
```
idle → countdown → question → feedback → results
```
`GameShell.tsx` reads this hook and renders the correct sub-component for each state. Do not add game logic outside this hook.

---

## Folder Conventions

| Folder | What goes here |
|---|---|
| `app/` | Expo Router screens only — thin wrappers, no business logic |
| `components/` | Presentational React Native components |
| `hooks/` | Custom hooks with business logic |
| `lib/db/` | All SQLite interaction (schema, migrations, queries, sync) |
| `lib/game-engine/` | Pure TypeScript functions (no React, no side effects) |
| `lib/supabase/` | Supabase client setup only |
| `store/` | Zustand stores for ephemeral UI state |
| `content/` | Static data: level definitions and question generators |
| `types/` | Shared TypeScript interfaces and types |

---

## Key Files

| File | Purpose |
|---|---|
| `lib/db/schema.ts` | SQLite table definitions — all DB changes start here |
| `lib/db/queries.ts` | All SQLite read/write helpers — no raw SQL outside this file |
| `lib/db/sync.ts` | Offline → online sync + guest migration |
| `hooks/useGameSession.ts` | Game state machine — core of all gameplay |
| `lib/game-engine/questionGenerator.ts` | Procedural question generation |
| `lib/game-engine/scorer.ts` | XP calculation with multipliers |
| `lib/game-engine/badgeEvaluator.ts` | Pure function: (userState) → newBadgeIds[] |
| `components/game/GameShell.tsx` | Top-level game UI orchestrator |

---

## Coding Conventions

- **TypeScript strict mode** — no `any`, always type component props
- **NativeWind** for all styling — use Tailwind classes via `className`, not `StyleSheet`
- **No inline styles** except for values that must be computed at runtime (e.g., animated widths)
- **Moti** for all declarative animations, **Reanimated** only for imperative/gesture-driven animations
- **No raw SQL** in components or hooks — all DB access goes through `lib/db/queries.ts`
- **Pure functions** in `lib/game-engine/` — no hooks, no side effects, easy to unit test
- Screen files in `app/` should only call hooks and render components — no direct DB or API calls

---

## Environment Variables

All env vars must be prefixed with `EXPO_PUBLIC_` to be accessible in the app bundle.

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
```

Never commit `.env.local`. The `.env.example` file shows required variables.

---

## Testing

Pure functions in `lib/game-engine/` and `lib/db/queries.ts` are unit tested with Jest.
Run tests: `npm test`

When writing tests for question generators, assert that returned `Question` objects have the correct `type`, `correctAnswer` that matches the problem, and that options (for multiple choice) always include the correct answer.

---

## Common Pitfalls

- **expo-sqlite is async** — always `await` database calls, never fire-and-forget
- **Clerk on Expo Web** — some Clerk features behave differently on web vs. native; test on device
- **NativeWind className on custom components** — wrap them with `styled()` or pass `className` as a prop explicitly
- **react-native-svg on Android** — test graph interactions on a real Android device, not just the emulator
