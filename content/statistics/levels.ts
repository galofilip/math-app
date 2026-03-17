import { Level } from '@/types/game';
import { buildTier1Questions, buildTier2Questions, buildTier3Questions, buildTier4Questions } from './questions';

const statisticsLevels: Level[] = [
  { id: 'stat-t1-l1', topicSlug: 'statistics', tier: 1, tierIndex: 1, title: 'Mean',               description: 'Calculate the average of a data set.',     generateQuestions: buildTier1Questions },
  { id: 'stat-t1-l2', topicSlug: 'statistics', tier: 1, tierIndex: 2, title: 'Median',             description: 'Find the middle value of a sorted list.',   generateQuestions: buildTier1Questions },
  { id: 'stat-t1-l3', topicSlug: 'statistics', tier: 1, tierIndex: 3, title: 'Mode',               description: 'Identify the most frequent value.',         generateQuestions: buildTier1Questions },
  { id: 'stat-t1-l4', topicSlug: 'statistics', tier: 1, tierIndex: 4, title: 'Range',              description: 'Find the spread of a data set.',            generateQuestions: buildTier1Questions },
  { id: 'stat-t1-l5', topicSlug: 'statistics', tier: 1, tierIndex: 5, title: 'Reading Charts',     description: 'Interpret bar charts and pie charts.',      generateQuestions: buildTier1Questions },
  { id: 'stat-t2-l1', topicSlug: 'statistics', tier: 2, tierIndex: 1, title: 'Probability Basics', description: 'Calculate simple probabilities.',           generateQuestions: buildTier2Questions },
  { id: 'stat-t2-l2', topicSlug: 'statistics', tier: 2, tierIndex: 2, title: 'Frequency Tables',   description: 'Read and complete frequency tables.',       generateQuestions: buildTier2Questions },
  { id: 'stat-t2-l3', topicSlug: 'statistics', tier: 2, tierIndex: 3, title: 'Scatter Plots',      description: 'Identify trends in scatter plots.',         generateQuestions: buildTier2Questions },
  { id: 'stat-t2-l4', topicSlug: 'statistics', tier: 2, tierIndex: 4, title: 'Data Interpretation', description: 'Draw conclusions from data.',              generateQuestions: buildTier2Questions },
  { id: 'stat-t2-l5', topicSlug: 'statistics', tier: 2, tierIndex: 5, title: 'Averages Mixed',     description: 'Choose the right average for context.',     generateQuestions: buildTier2Questions },
  { id: 'stat-t3-l1', topicSlug: 'statistics', tier: 3, tierIndex: 1, title: 'Compound Probability', description: 'AND / OR probability rules.',            generateQuestions: buildTier3Questions },
  { id: 'stat-t3-l2', topicSlug: 'statistics', tier: 3, tierIndex: 2, title: 'Standard Deviation', description: 'Understand spread and variance.',           generateQuestions: buildTier3Questions },
  { id: 'stat-t3-l3', topicSlug: 'statistics', tier: 3, tierIndex: 3, title: 'Normal Distribution', description: 'Bell curve properties and z-scores.',      generateQuestions: buildTier3Questions },
  { id: 'stat-t3-l4', topicSlug: 'statistics', tier: 3, tierIndex: 4, title: 'Sampling',           description: 'Understand sampling methods and bias.',     generateQuestions: buildTier3Questions },
  { id: 'stat-t3-l5', topicSlug: 'statistics', tier: 3, tierIndex: 5, title: 'Speed Round',        description: 'Mixed statistics under time pressure.',     generateQuestions: buildTier3Questions },
  { id: 'stat-t4-l1', topicSlug: 'statistics', tier: 4, tierIndex: 1, title: 'Correlation',        description: 'Correlation coefficients and causation.',   generateQuestions: buildTier4Questions },
  { id: 'stat-t4-l2', topicSlug: 'statistics', tier: 4, tierIndex: 2, title: 'Regression',         description: 'Lines of best fit and predictions.',        generateQuestions: buildTier4Questions },
  { id: 'stat-t4-l3', topicSlug: 'statistics', tier: 4, tierIndex: 3, title: 'Hypothesis Testing', description: 'Null hypothesis and p-values intro.',        generateQuestions: buildTier4Questions },
  { id: 'stat-t4-l4', topicSlug: 'statistics', tier: 4, tierIndex: 4, title: 'Combinatorics',      description: 'Permutations and combinations.',            generateQuestions: buildTier4Questions },
  { id: 'stat-t4-l5', topicSlug: 'statistics', tier: 4, tierIndex: 5, title: 'Mastery Challenge',  description: 'The ultimate statistics test.',             generateQuestions: buildTier4Questions },
];

export default statisticsLevels;
