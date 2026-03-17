import { Level } from '@/types/game';
import { buildTier1Questions, buildTier2Questions, buildTier3Questions, buildTier4Questions } from './questions';

const algebraLevels: Level[] = [
  // Tier 1 — Foundations (5 levels)
  { id: 'alg-t1-l1', topicSlug: 'algebra', tier: 1, tierIndex: 1, title: 'Variables & Expressions', description: 'Evaluate simple expressions with one variable.', generateQuestions: buildTier1Questions },
  { id: 'alg-t1-l2', topicSlug: 'algebra', tier: 1, tierIndex: 2, title: 'One-Step Equations',      description: 'Solve ax = b and x + b = c.',               generateQuestions: buildTier1Questions },
  { id: 'alg-t1-l3', topicSlug: 'algebra', tier: 1, tierIndex: 3, title: 'Negative Numbers',        description: 'Work with negative integers in equations.',   generateQuestions: buildTier1Questions },
  { id: 'alg-t1-l4', topicSlug: 'algebra', tier: 1, tierIndex: 4, title: 'Order of Operations',     description: 'Apply PEMDAS to evaluate expressions.',        generateQuestions: buildTier1Questions },
  { id: 'alg-t1-l5', topicSlug: 'algebra', tier: 1, tierIndex: 5, title: 'Combining Like Terms',    description: 'Simplify expressions with like terms.',        generateQuestions: buildTier1Questions },

  // Tier 2 — Application (5 levels)
  { id: 'alg-t2-l1', topicSlug: 'algebra', tier: 2, tierIndex: 1, title: 'Two-Step Equations',      description: 'Solve ax + b = c for x.',                      generateQuestions: buildTier2Questions },
  { id: 'alg-t2-l2', topicSlug: 'algebra', tier: 2, tierIndex: 2, title: 'Word Problems',           description: 'Translate word problems into equations.',      generateQuestions: buildTier2Questions },
  { id: 'alg-t2-l3', topicSlug: 'algebra', tier: 2, tierIndex: 3, title: 'Substitution',            description: 'Evaluate polynomial expressions.',             generateQuestions: buildTier2Questions },
  { id: 'alg-t2-l4', topicSlug: 'algebra', tier: 2, tierIndex: 4, title: 'Proportions',             description: 'Solve proportions and ratios.',                generateQuestions: buildTier2Questions },
  { id: 'alg-t2-l5', topicSlug: 'algebra', tier: 2, tierIndex: 5, title: 'Graphing Lines',          description: 'Identify slope and y-intercept.',              generateQuestions: buildTier2Questions },

  // Tier 3 — Challenge (5 levels)
  { id: 'alg-t3-l1', topicSlug: 'algebra', tier: 3, tierIndex: 1, title: 'Inequalities',            description: 'Solve and graph linear inequalities.',         generateQuestions: buildTier3Questions },
  { id: 'alg-t3-l2', topicSlug: 'algebra', tier: 3, tierIndex: 2, title: 'Quadratic Expressions',   description: 'Expand and factor simple quadratics.',         generateQuestions: buildTier3Questions },
  { id: 'alg-t3-l3', topicSlug: 'algebra', tier: 3, tierIndex: 3, title: 'Absolute Value',          description: 'Solve equations with absolute value.',         generateQuestions: buildTier3Questions },
  { id: 'alg-t3-l4', topicSlug: 'algebra', tier: 3, tierIndex: 4, title: 'Functions',               description: 'Evaluate and interpret functions.',            generateQuestions: buildTier3Questions },
  { id: 'alg-t3-l5', topicSlug: 'algebra', tier: 3, tierIndex: 5, title: 'Speed Round',             description: 'Mixed questions under time pressure.',         generateQuestions: buildTier3Questions },

  // Tier 4 — Mastery (5 levels)
  { id: 'alg-t4-l1', topicSlug: 'algebra', tier: 4, tierIndex: 1, title: 'Systems of Equations',    description: 'Solve two-variable systems.',                  generateQuestions: buildTier4Questions },
  { id: 'alg-t4-l2', topicSlug: 'algebra', tier: 4, tierIndex: 2, title: 'Exponents & Powers',      description: 'Apply exponent rules.',                        generateQuestions: buildTier4Questions },
  { id: 'alg-t4-l3', topicSlug: 'algebra', tier: 4, tierIndex: 3, title: 'Polynomials',             description: 'Add, subtract, and multiply polynomials.',     generateQuestions: buildTier4Questions },
  { id: 'alg-t4-l4', topicSlug: 'algebra', tier: 4, tierIndex: 4, title: 'Factoring',               description: 'Factor quadratic expressions.',                generateQuestions: buildTier4Questions },
  { id: 'alg-t4-l5', topicSlug: 'algebra', tier: 4, tierIndex: 5, title: 'Mastery Challenge',       description: 'The ultimate algebra test.',                   generateQuestions: buildTier4Questions },
];

export default algebraLevels;
