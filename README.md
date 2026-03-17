# MathQuest — Math Learning App for Teens

An offline-first, gamified math learning mobile app for teens (12+). Works fully without WiFi. Sign in optionally to sync progress across devices.

**Topics:** Algebra · Geometry · Statistics · Trigonometry

**Platforms:** iOS · Android (built with Expo / React Native)

---

## Features

- 80 levels across 4 topics (4 tiers per topic)
- 4 question types: Multiple Choice, Fill in the Blank, Drag & Drop, Interactive Graph
- XP system, daily streaks, and 15 unlockable badges
- Fully offline — all data stored locally in SQLite
- Optional sign-in (Clerk) to sync progress to the cloud (Supabase) and access leaderboards
- Guest-to-account migration preserves all local progress

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Expo (React Native, SDK 55) |
| Routing | Expo Router (file-based) |
| Styling | NativeWind v4 (Tailwind for RN) |
| UI Components | Gluestack UI v2 |
| Animation | React Native Reanimated + Moti |
| Drag & Drop | @mgcrea/react-native-dnd |
| SVG / Graphs | react-native-svg |
| Offline DB | expo-sqlite |
| Auth | Clerk (Expo SDK) |
| Cloud Sync | Supabase (PostgreSQL) |
| State | Zustand |
| Build | EAS Build |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`
- iOS: Xcode (macOS only) or Expo Go app
- Android: Android Studio or Expo Go app

### Installation

```bash
git clone <repo-url>
cd math-app
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

You need:
1. A [Clerk](https://clerk.com) account — create an application and copy the publishable key
2. A [Supabase](https://supabase.com) project — run the migration in `supabase/migrations/001_initial_schema.sql`
3. Configure Clerk JWT in Supabase: Dashboard → Authentication → JWT Settings → add Clerk JWKS URL

### Run Locally

```bash
# Start Expo dev server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in browser (limited native features)
npm run web
```

### Build for Production

```bash
# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

---

## Project Structure

```
math-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout (ClerkProvider, DB init)
│   ├── index.tsx           # Home / landing screen
│   ├── (auth)/             # Sign-in and sign-up screens
│   ├── (tabs)/             # Bottom tab screens (topics, dashboard, etc.)
│   └── play/               # Game screens
├── components/
│   ├── game/               # GameShell, question types, feedback
│   ├── rewards/            # XPBar, badges, streak
│   ├── topics/             # TopicCard, LevelMap
│   └── layout/             # Header, TabBar
├── hooks/                  # useGameSession, useProgress, useStreak, etc.
├── lib/
│   ├── db/                 # SQLite schema, migrations, queries, sync
│   ├── supabase/           # Supabase client
│   └── game-engine/        # Question generator, scorer, badge evaluator
├── store/                  # Zustand store
├── content/                # Level definitions and question generators
├── types/                  # TypeScript types
└── supabase/               # Cloud DB migration SQL
```

---

## Database

All game data is stored locally in SQLite via `expo-sqlite`. Tables:

- `user_progress` — XP, math level, streak
- `level_completions` — per-level stars and scores
- `game_sessions` — full session history
- `earned_badges` — unlocked badges

When the user is online and logged in, unsynced rows are pushed to Supabase automatically.

---

## Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run in browser
npm test           # Run Jest tests
npm run lint       # Run ESLint
```

---

## License

MIT
