import { Level } from '@/types/game';
import { buildTier1Questions, buildTier2Questions, buildTier3Questions, buildTier4Questions } from './questions';

const trigonometryLevels: Level[] = [
  { id: 'trig-t1-l1', topicSlug: 'trigonometry', tier: 1, tierIndex: 1, title: 'Right Triangle Basics', description: 'Label sides: opposite, adjacent, hypotenuse.',  generateQuestions: buildTier1Questions },
  { id: 'trig-t1-l2', topicSlug: 'trigonometry', tier: 1, tierIndex: 2, title: 'SOHCAHTOA',             description: 'Learn sin, cos, tan definitions.',              generateQuestions: buildTier1Questions },
  { id: 'trig-t1-l3', topicSlug: 'trigonometry', tier: 1, tierIndex: 3, title: 'sin Values',            description: 'Recall sin at 0°, 30°, 45°, 60°, 90°.',         generateQuestions: buildTier1Questions },
  { id: 'trig-t1-l4', topicSlug: 'trigonometry', tier: 1, tierIndex: 4, title: 'cos Values',            description: 'Recall cos at common angles.',                   generateQuestions: buildTier1Questions },
  { id: 'trig-t1-l5', topicSlug: 'trigonometry', tier: 1, tierIndex: 5, title: 'tan Values',            description: 'Recall tan at common angles.',                   generateQuestions: buildTier1Questions },
  { id: 'trig-t2-l1', topicSlug: 'trigonometry', tier: 2, tierIndex: 1, title: 'Finding Sides',         description: 'Use trig ratios to find missing sides.',         generateQuestions: buildTier2Questions },
  { id: 'trig-t2-l2', topicSlug: 'trigonometry', tier: 2, tierIndex: 2, title: 'Finding Angles',        description: 'Use inverse trig to find missing angles.',       generateQuestions: buildTier2Questions },
  { id: 'trig-t2-l3', topicSlug: 'trigonometry', tier: 2, tierIndex: 3, title: 'Applications',          description: 'Real-world trig word problems.',                 generateQuestions: buildTier2Questions },
  { id: 'trig-t2-l4', topicSlug: 'trigonometry', tier: 2, tierIndex: 4, title: 'Unit Circle Intro',     description: 'Understand the unit circle concept.',            generateQuestions: buildTier2Questions },
  { id: 'trig-t2-l5', topicSlug: 'trigonometry', tier: 2, tierIndex: 5, title: 'Mixed Practice',        description: 'Mix of right triangle problems.',                generateQuestions: buildTier2Questions },
  { id: 'trig-t3-l1', topicSlug: 'trigonometry', tier: 3, tierIndex: 1, title: 'Degrees & Radians',     description: 'Convert between degrees and radians.',           generateQuestions: buildTier3Questions },
  { id: 'trig-t3-l2', topicSlug: 'trigonometry', tier: 3, tierIndex: 2, title: 'Graphs of sin & cos',   description: 'Amplitude, period, and phase shift.',            generateQuestions: buildTier3Questions },
  { id: 'trig-t3-l3', topicSlug: 'trigonometry', tier: 3, tierIndex: 3, title: 'Identities',            description: 'Fundamental trig identities.',                   generateQuestions: buildTier3Questions },
  { id: 'trig-t3-l4', topicSlug: 'trigonometry', tier: 3, tierIndex: 4, title: 'Law of Sines',          description: 'Solve non-right triangles.',                     generateQuestions: buildTier3Questions },
  { id: 'trig-t3-l5', topicSlug: 'trigonometry', tier: 3, tierIndex: 5, title: 'Speed Round',           description: 'Mixed trig under time pressure.',                generateQuestions: buildTier3Questions },
  { id: 'trig-t4-l1', topicSlug: 'trigonometry', tier: 4, tierIndex: 1, title: 'Law of Cosines',        description: 'Apply the law of cosines.',                      generateQuestions: buildTier4Questions },
  { id: 'trig-t4-l2', topicSlug: 'trigonometry', tier: 4, tierIndex: 2, title: 'Inverse Functions',     description: 'arcsin, arccos, arctan.',                        generateQuestions: buildTier4Questions },
  { id: 'trig-t4-l3', topicSlug: 'trigonometry', tier: 4, tierIndex: 3, title: 'Double Angle',          description: 'Double and half angle formulas.',                generateQuestions: buildTier4Questions },
  { id: 'trig-t4-l4', topicSlug: 'trigonometry', tier: 4, tierIndex: 4, title: 'Trig Equations',        description: 'Solve equations with trig functions.',           generateQuestions: buildTier4Questions },
  { id: 'trig-t4-l5', topicSlug: 'trigonometry', tier: 4, tierIndex: 5, title: 'Mastery Challenge',     description: 'The ultimate trigonometry test.',                generateQuestions: buildTier4Questions },
];

export default trigonometryLevels;
