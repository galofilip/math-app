import { Badge } from '@/types/rewards';

export const ALL_BADGES: Badge[] = [
  { id: 'first-step',          name: 'First Step',           emoji: '👶', description: 'Complete any level for the first time.',       xpBonus: 25  },
  { id: 'perfect-10',          name: 'Perfect 10',           emoji: '💯', description: 'Score 10/10 on any level.',                    xpBonus: 50  },
  { id: 'speed-demon',         name: 'Speed Demon',          emoji: '⚡', description: 'Answer 5 questions in a row in under 10s each.', xpBonus: 50  },
  { id: 'algebra-apprentice',  name: 'Algebra Apprentice',   emoji: '📐', description: 'Complete all Tier 1 Algebra levels.',           xpBonus: 75  },
  { id: 'algebra-master',      name: 'Algebra Master',       emoji: '🥇', description: '3-star all Algebra levels.',                    xpBonus: 200 },
  { id: 'geometry-apprentice', name: 'Geometry Apprentice',  emoji: '📏', description: 'Complete all Tier 1 Geometry levels.',          xpBonus: 75  },
  { id: 'geometry-master',     name: 'Geometry Master',      emoji: '🥇', description: '3-star all Geometry levels.',                   xpBonus: 200 },
  { id: 'stats-apprentice',    name: 'Statistics Apprentice',emoji: '📊', description: 'Complete all Tier 1 Statistics levels.',        xpBonus: 75  },
  { id: 'stats-master',        name: 'Statistics Master',    emoji: '🥇', description: '3-star all Statistics levels.',                 xpBonus: 200 },
  { id: 'trig-apprentice',     name: 'Trig Apprentice',      emoji: '🔺', description: 'Complete all Tier 1 Trigonometry levels.',      xpBonus: 75  },
  { id: 'trig-master',         name: 'Trig Master',          emoji: '🥇', description: '3-star all Trigonometry levels.',               xpBonus: 200 },
  { id: 'all-rounder',         name: 'All-Rounder',          emoji: '🌟', description: 'Complete at least Tier 2 in every topic.',      xpBonus: 150 },
  { id: 'on-fire',             name: 'On Fire',              emoji: '🔥', description: 'Maintain a 7-day daily streak.',                xpBonus: 100 },
  { id: 'unstoppable',         name: 'Unstoppable',          emoji: '💪', description: 'Maintain a 30-day daily streak.',               xpBonus: 300 },
  { id: 'centurion',           name: 'Centurion',            emoji: '🏛️', description: 'Earn 100 XP in a single session.',              xpBonus: 50  },
];
