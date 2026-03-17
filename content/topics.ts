import { Level } from '@/types/game';
import algebraLevels from './algebra/levels';
import geometryLevels from './geometry/levels';
import statisticsLevels from './statistics/levels';
import trigonometryLevels from './trigonometry/levels';

export interface TopicMeta {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  color: string;        // Tailwind bg color class
  levels: Level[];
}

export const TOPICS: TopicMeta[] = [
  {
    slug: 'algebra',
    label: 'Algebra',
    emoji: '📐',
    description: 'Equations, variables, and functions',
    color: 'bg-blue-500',
    levels: algebraLevels,
  },
  {
    slug: 'geometry',
    label: 'Geometry',
    emoji: '📏',
    description: 'Shapes, angles, and proofs',
    color: 'bg-green-500',
    levels: geometryLevels,
  },
  {
    slug: 'statistics',
    label: 'Statistics',
    emoji: '📊',
    description: 'Data, probability, and graphs',
    color: 'bg-orange-500',
    levels: statisticsLevels,
  },
  {
    slug: 'trigonometry',
    label: 'Trigonometry',
    emoji: '🔺',
    description: 'Angles, triangles, and the unit circle',
    color: 'bg-purple-500',
    levels: trigonometryLevels,
  },
];
